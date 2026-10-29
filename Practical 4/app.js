require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  if ((req.method === 'POST' || req.method === 'PUT') && !req.is('application/json')) {
    const error = new Error('Content-Type must be application/json');
    error.status = 415;
    return next(error);
  }

  next();
});

app.use('/', authRoutes);
app.use('/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

app.use((err, req, res, _next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((error) => {
      if (error.kind === 'required') {
        return `${error.path} is required`;
      }

      if (error.kind === 'enum') {
        return `${error.path} must be one of: ${error.enumValues.join(', ')}`;
      }

      return error.message;
    });

    return res.status(400).json({ success: false, errors });
  }

  if (err.status === 404) {
    return res.status(404).json({ error: 'Task not found' });
  }

  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: 'Something went wrong'
  });
});

module.exports = app;
