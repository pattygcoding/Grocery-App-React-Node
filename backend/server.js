const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key-change-in-production';
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions
const readData = () => {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Admin middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = readData();
    const user = data.users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all items or filter by category
app.get('/api/items', (req, res) => {
  try {
    const data = readData();
    const { category } = req.query;
    
    let items = data.items;
    if (category) {
      items = items.filter(item => item.category === category);
    }
    
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single item
app.get('/api/items/:id', (req, res) => {
  try {
    const data = readData();
    const item = data.items.find(i => i.id === parseInt(req.params.id));
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new item (admin only)
app.post('/api/items', authenticateToken, isAdmin, (req, res) => {
  try {
    const data = readData();
    const newItem = {
      id: Math.max(...data.items.map(i => i.id), 0) + 1,
      ...req.body
    };
    
    data.items.push(newItem);
    writeData(data);
    
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update item (admin only)
app.put('/api/items/:id', authenticateToken, isAdmin, (req, res) => {
  try {
    const data = readData();
    const itemIndex = data.items.findIndex(i => i.id === parseInt(req.params.id));
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    data.items[itemIndex] = {
      ...data.items[itemIndex],
      ...req.body,
      id: parseInt(req.params.id)
    };
    
    writeData(data);
    res.json(data.items[itemIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete item (admin only)
app.delete('/api/items/:id', authenticateToken, isAdmin, (req, res) => {
  try {
    const data = readData();
    const itemIndex = data.items.findIndex(i => i.id === parseInt(req.params.id));
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    data.items.splice(itemIndex, 1);
    writeData(data);
    
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get categories
app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥕' },
    { id: 'meats', name: 'Meats', icon: '🍗' },
    { id: 'snacks', name: 'Snacks', icon: '🍿' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' }
  ];
  res.json(categories);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
