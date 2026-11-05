"use client";

import { FormEvent, useEffect, useState } from 'react';
type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
type Task = { id: number; title: string; priority: Priority; status: 'PENDING' | 'COMPLETED' };

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const [error, setError] = useState('');

  async function refresh() {
    try {
      const res = await fetch('/api/tasks', { cache: 'no-store' });
      if (!res.ok) throw Error(`Task fetch failed: ${res.status}`);
      setTasks(await res.json()); setError('');
    } catch (e) { setError(String(e)); }
  }
  useEffect(() => { void refresh(); const id = window.setInterval(() => void refresh(), 3000); return () => window.clearInterval(id); }, []);

  async function create(e: FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/tasks', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ title, priority }) });
    if (!res.ok) { setError(`Task creation failed: ${res.status}`); return; }
    setTitle(''); await refresh();
  }

  return <main>
    <h1>ADLC sample task tracker</h1>
    <p>Public test fixture: Next.js UI → Java API → Java worker</p>
    <form onSubmit={create} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <input aria-label="Task title" required value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" />
      <select aria-label="Priority" value={priority} onChange={e => setPriority(e.target.value as Priority)}>
        <option>LOW</option><option>MEDIUM</option><option>HIGH</option>
      </select>
      <button type="submit">Add task</button>
    </form>
    {error && <p role="alert">{error}</p>}
    <ul>{tasks.map(task => <li key={task.id}>{task.title} — {task.priority} — {task.status}</li>)}</ul>
  </main>;
}
