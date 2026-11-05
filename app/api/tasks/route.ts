import { NextRequest, NextResponse } from 'next/server';

const base = () => process.env.BACKEND_URL ?? 'http://localhost:8080';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const res = await fetch(`${base()}/api/tasks`, { cache: 'no-store' });
    return new NextResponse(await res.text(), { status: res.status, headers: { 'content-type': 'application/json' } });
  } catch { return NextResponse.json({ error: 'backend unavailable' }, { status: 502 }); }
}
export async function POST(request: NextRequest) {
  try {
    const res = await fetch(`${base()}/api/tasks`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: await request.text() });
    return new NextResponse(await res.text(), { status: res.status, headers: { 'content-type': 'application/json' } });
  } catch { return NextResponse.json({ error: 'backend unavailable' }, { status: 502 }); }
}
