const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

let tasks = [
  { id: 1, title: 'Learn Express', description: 'Build a REST API', completed: false },
  { id: 2, title: 'Write README', description: 'Document the API endpoints', completed: true }
];

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

  if (!/^\d+$/.test(id)) {
    const error = new Error('Task ID must be a numeric value');
    error.status = 400;
    return next(error);
  }

  next();
}

app.use('/tasks/:id', validateTaskId);

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res, next) => {
  try {
    const { title, description = '', completed = false } = req.body || {};

    if (!title || typeof title !== 'string' || title.trim() === '') {
      const error = new Error('Task title is required');
      error.status = 400;
      return next(error);
    }

    const task = {
      id: Date.now(),
      title: title.trim(),
      description,
      completed
    };

    tasks.push(task);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

app.put('/tasks/:id', (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      const error = new Error('Task not found');
      error.status = 404;
      return next(error);
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...req.body,
      id: taskId
    };

    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
});

app.delete('/tasks/:id', (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      const error = new Error('Task not found');
      error.status = 404;
      return next(error);
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.json({ message: 'Task deleted successfully', task: deletedTask });
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
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
