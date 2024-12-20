const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json()); 

// Example data storage (can be replaced with a database)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// GET /api/items: Retrieve all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// POST /api/items: Create a new item
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1; // Assign an ID based on the current number of items
  items.push(newItem);
  res.status(201).json(newItem); // Return the created item
});

// PUT /api/items/:id: Update an existing item
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;

  // Find the index of the item to update
  const index = items.findIndex(item => item.id === parseInt(id, 10));

  if (index !== -1) {
    items[index] = { id: parseInt(id, 10), ...updatedItem };
    res.json(items[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE /api/items/:id: Delete an item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id === parseInt(id, 10));

  if (index !== -1) {
    items.splice(index, 1); // Remove the item from the array
    res.status(204).send(); // Send no content on successful deletion
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
