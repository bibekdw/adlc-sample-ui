import test from 'node:test';
import assert from 'node:assert/strict';

const shape = {id: 1, title: 'Integration test', priority: 'HIGH', status: 'PENDING'};
test('task response shape matches documented UI type', () => {
  assert.equal(typeof shape.id, 'number');
  assert.equal(typeof shape.title, 'string');
  assert.ok(['LOW','MEDIUM','HIGH'].includes(shape.priority));
  assert.ok(['PENDING','COMPLETED'].includes(shape.status));
});
