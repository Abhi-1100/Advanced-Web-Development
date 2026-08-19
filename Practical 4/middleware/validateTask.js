const allowedPriorities = new Set(['low', 'medium', 'high']);

function validateTask(req, res, next) {
  const { title, description, completed, priority } = req.body;

  if (req.method === 'POST' && (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ error: 'Task title is required' });
  }

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ error: 'Task title must be a non-empty string' });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ error: 'Task description must be a string' });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Task completed must be a boolean' });
  }

  if (priority !== undefined && !allowedPriorities.has(priority)) {
    return res.status(400).json({ error: 'Task priority must be low, medium, or high' });
  }

  next();
}

module.exports = validateTask;