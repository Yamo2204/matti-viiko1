const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: 'Item 1', description: 'First item' },
  { id: 2, name: 'Item 2', description: 'Second item' }
];

// GET /api/items - Read data
app.get('/api/items', (req, res) => {
  res.status(200).json(items);
});

// POST /api/items - Send data
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  if (!newItem.name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  newItem.id = items.length + 1;
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /api/items/:id - Modify data
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  const updatedItem = { ...items[itemIndex], ...req.body };
  items[itemIndex] = updatedItem;
  res.status(200).json(updatedItem);
});

// DELETE /api/items/:id - Delete data
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  items.splice(itemIndex, 1);
  res.status(204).send();
});

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});