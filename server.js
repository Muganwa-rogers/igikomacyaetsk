const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const initDemoData = require('./initDemoData');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/auth');
const sparePartRoutes = require('./routes/sparePart');
const stockInRoutes = require('./routes/stockIn');
const stockOutRoutes = require('./routes/stockOut');
const reportRoutes = require('./routes/reports');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sparepart', sparePartRoutes);
app.use('/api/stockin', stockInRoutes);
app.use('/api/stockout', stockOutRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.send('Stock Inventory Management System Backend is running');
});

// Initialize demo data then start server
// initDemoData().then(() => {
  app.listen(port, () => {
    console.log('Server running on port ' + port);
  });
// }).catch((err) => {
//   console.error('Failed to initialize demo data:', err);
//   process.exit(1);
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Handle uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Optionally exit process or attempt graceful shutdown
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optionally exit process or attempt graceful shutdown
});
