const express = require('express');

const app = express();
app.use(express.json());

let items = [{ id: 1, name: 'Item One' }];

// GET - قراءة بيانات
app.get('/api/items', (req, res) => {
  res.status(200).json(items);
});

// POST - إرسال بيانات
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  if (!newItem.name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  items.push({ id: Date.now(), ...newItem });
  res.status(201).json(newItem);
});

// DELETE - حذف (وهمي)
app.delete('/api/items/:id', (req, res) => {
  res.status(501).json({ error: 'Delete not implemented yet' });
});

// PUT - تعديل (وهمي)
app.put('/api/items/:id', (req, res) => {
  res.status(501).json({ error: 'Update not implemented yet' });
});

// 404 للموارد غير الموجودة
app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});