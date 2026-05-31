/**
 * TechFlow Solutions — Jest Test Suite
 *
 * Interns must add at least two new tests (Week 1 Tuesday).
 * All tests must pass before Job 2 (Build & Push) can run.
 *
 * Run locally: npm test
 */

const request = require('supertest');
const app     = require('../app');

// ── Existing tests (provided) ─────────────────────────────────────────────

describe('Primary Route', () => {
  test('GET / returns 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('GET / returns JSON with status ok', async () => {
    const res = await request(app).get('/');
    expect(res.body.status).toBe('ok');
  });

  test('GET / includes a message field', async () => {
    const res = await request(app).get('/');
    expect(res.body).toHaveProperty('message');
    expect(typeof res.body.message).toBe('string');
  });
});

describe('Health Check Route', () => {
  test('GET /health returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
  });

  test('GET /health returns status healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.body.status).toBe('healthy');
  });
});

// ── Inventory routes (existing) ───────────────────────────────────────────

describe('Inventory List Route', () => {
  test('GET /api/inventory returns 200', async () => {
    const res = await request(app).get('/api/inventory');
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/inventory returns an array of items', async () => {
    const res = await request(app).get('/api/inventory');
    expect(res.body).toHaveProperty('items');
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  test('GET /api/inventory items have required fields', async () => {
    const res = await request(app).get('/api/inventory');
    const item = res.body.items[0];
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('sku');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('qty');
  });
});

// ── NEW TESTS — Added by intern (Week 1 Tuesday) ──────────────────────────
// The brief requires at least two new tests. The examples below satisfy this.
// Interns may replace or extend these with their own test cases.

describe('Single Inventory Item Route', () => {
  test('GET /api/inventory/1 returns 200 for valid item', async () => {
    const res = await request(app).get('/api/inventory/1');
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/inventory/1 returns the correct SKU', async () => {
    const res = await request(app).get('/api/inventory/1');
    expect(res.body.sku).toBe('TF-001');
  });

  test('GET /api/inventory/999 returns 404 for unknown item', async () => {
    const res = await request(app).get('/api/inventory/999');
    expect(res.statusCode).toBe(404);
  });

  test('GET /api/inventory/999 returns an error field', async () => {
    const res = await request(app).get('/api/inventory/999');
    expect(res.body).toHaveProperty('error');
  });
});

describe('Create Inventory Item Route', () => {
  test('POST /api/inventory returns 201 with valid body', async () => {
    const res = await request(app)
      .post('/api/inventory')
      .send({ sku: 'TF-TEST', name: 'Test Item', qty: 10, location: 'TestZone' });
    expect(res.statusCode).toBe(201);
  });

  test('POST /api/inventory returns the created item', async () => {
    const res = await request(app)
      .post('/api/inventory')
      .send({ sku: 'TF-006', name: 'New Fixture', qty: 25 });
    expect(res.body.sku).toBe('TF-006');
    expect(res.body.qty).toBe(25);
  });

  test('POST /api/inventory returns 400 when sku is missing', async () => {
    const res = await request(app)
      .post('/api/inventory')
      .send({ name: 'No SKU Item', qty: 5 });
    expect(res.statusCode).toBe(400);
  });

  test('POST /api/inventory returns 400 when name is missing', async () => {
    const res = await request(app)
      .post('/api/inventory')
      .send({ sku: 'TF-007', qty: 5 });
    expect(res.statusCode).toBe(400);
  });
});
