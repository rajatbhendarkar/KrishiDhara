const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const errorHandler = require('./middlewares/errorHandler');

// Import Route Handlers
const authRoutes = require('./routes/authRoutes');
const diagnosisRoutes = require('./routes/diagnosisRoutes');
const aiRoutes = require('./routes/aiRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const schemesRoutes = require('./routes/schemesRoutes');
const shopsRoutes = require('./routes/shopsRoutes');
const expertRoutes = require('./routes/expertRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Utility Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));

// API Health Check & Info Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'KrishiMitra AI API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/schemes', schemesRoutes);
app.use('/api/shops', shopsRoutes);
app.use('/api/expert', expertRoutes);
app.use('/api/admin', adminRoutes);

// Global 404 Route Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found.`
  });
});

// Global Central Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 KrishiMitra AI Backend API Server running on port ${PORT}`);
  console.log(`📡 Health Check endpoint: http://localhost:${PORT}/api/health`);
});

module.exports = app;
