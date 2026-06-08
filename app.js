/**
 * TechFlow Solutions — Inventory Management API
 * Node.js / Express application
 *
 * Note: Source code should NOT be modified.
 * Fork this repo and build your CI/CD pipeline around it.
 */

const express = require('express');
const app = express();

app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────

/**
 * GET /
 * Primary route — health check.
 * The CI pipeline's Jest test validates this returns 200.
 */
app.get('/', (req, res) => {
  res.status(200).json({
    status:  'ok',
    message: 'TechFlow Solutions Inventory API is running',
    version: '1.0.0',
  });
});

/**
 * GET /health
 * Explicit health check endpoint.
 * Used by the rollback health check script (scripts/healthcheck.sh).
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status:    'healthy',
    timestamp: new Date().toISOString(),
    uptime:    process.uptime(),
  });
});

/**
 * GET /api/inventory
 * Returns a mock inventory list.
 * Demonstrates a real API route with data.
 */
app.get('/api/inventory', (req, res) => {
  const inventory = [
    { id: 1, sku: 'TF-001', name: 'Boutique Dress Hanger',   qty: 142, location: 'Aisle-A1' },
    { id: 2, sku: 'TF-002', name: 'Retail Display Fixture',   qty: 38,  location: 'Aisle-B3' },
    { id: 3, sku: 'TF-003', name: 'Point-of-Sale Label Roll', qty: 500, location: 'Stockroom' },
    { id: 4, sku: 'TF-004', name: 'Price Tag Gun Refill',     qty: 75,  location: 'Stockroom' },
    { id: 5, sku: 'TF-005', name: 'Garment Steamer',          qty: 12,  location: 'Aisle-C2' },
  ];
  res.status(200).json({ count: inventory.length, items: inventory });
});

/**
 * GET /api/inventory/:id
 * Returns a single inventory item by ID.
 */
app.get('/api/inventory/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 1 || id > 5) {
    return res.status(404).json({ error: 'Item not found', id: req.params.id });
  }
  const items = {
    1: { id: 1, sku: 'TF-001', name: 'Boutique Dress Hanger',   qty: 142 },
    2: { id: 2, sku: 'TF-002', name: 'Retail Display Fixture',   qty: 38  },
    3: { id: 3, sku: 'TF-003', name: 'Point-of-Sale Label Roll', qty: 500 },
    4: { id: 4, sku: 'TF-004', name: 'Price Tag Gun Refill',     qty: 75  },
    5: { id: 5, sku: 'TF-005', name: 'Garment Steamer',          qty: 12  },
  };
  res.status(200).json(items[id]);
});

/**
 * POST /api/inventory
 * Adds a new inventory item (mock — no persistence).
 */
app.post('/api/inventory', (req, res) => {
  const { sku, name, qty, location } = req.body;
  if (!sku || !name || qty === undefined) {
    return res.status(400).json({ error: 'sku, name, and qty are required' });
  }
  const newItem = { id: Date.now(), sku, name, qty: parseInt(qty), location: location || 'Unassigned' };
  res.status(201).json(newItem);
});

// ── Server start ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

// Only start listening when run directly (not when required by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`TechFlow API listening on port ${PORT}`);
  });
}

module.exports = app;
