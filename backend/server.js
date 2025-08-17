require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('./config/cloudinary');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Import routes
const clothesRoutes = require('./routes/clothes');
const adminRoutes = require('./routes/admin');

// Use routes
app.use('/api/clothes', clothesRoutes);
app.use('/api/admin', adminRoutes);

// Health route to warm the service and (optionally) MongoDB
app.get('/api/health', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      await mongoose.connection.db.admin().ping();
    }
  } catch (e) {
    // swallow errors to keep this endpoint lightweight
  }
  res.json({ ok: true, ts: Date.now() });
});

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});