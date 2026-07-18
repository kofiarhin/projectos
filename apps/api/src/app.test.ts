import request from 'supertest';

import { createApp } from './app';

describe('API health endpoint', () => {
  const app = createApp();

  it('responds to GET /health with the success envelope', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: { status: 'ok', service: 'projectos-api' },
      meta: {},
    });
  });

  it('exposes the versioned health path', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('ok');
  });
});
