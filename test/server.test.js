import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/server.js';

test('health endpoint returns ok', async (t) => {
  const server = createApp();
  t.after(() => server.close());

  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  const response = await fetch(`http://localhost:${port}/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});