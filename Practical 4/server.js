require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

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

app.use('/tasks/:id', validateTaskId);

app.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

app.get('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

app.post('/tasks', async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

app.put('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

app.delete('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully', task });
  } catch (error) {
    next(error);
  }
});

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
