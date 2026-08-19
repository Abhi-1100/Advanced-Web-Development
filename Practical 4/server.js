require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

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

function validateTaskId(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Task not found');
    error.status = 404;
    return next(error);
  }

  next();
}

app.use('/', authRoutes);
app.use('/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

app.use((err, req, res, next) => {
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

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connection status: connected');
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server port: ${PORT}`);
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection status: failed');
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
