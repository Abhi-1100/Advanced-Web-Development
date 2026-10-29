jest.mock('../models/Task', () => ({
  find: jest.fn(),
  create: jest.fn()
}));

const jwt = require('jsonwebtoken');
const request = require('supertest');
const Task = require('../models/Task');
const app = require('../app');

process.env.JWT_SECRET = 'jest-test-secret';

function authHeader() {
  const token = jwt.sign({ userId: 'test-user' }, process.env.JWT_SECRET);
  return `Bearer ${token}`;
}

beforeEach(() => {
  jest.clearAllMocks();
  Task.find.mockReturnValue({
    sort: jest.fn().mockResolvedValue([])
  });
});

test('GET /tasks returns an empty task list', async () => {
  const res = await request(app)
    .get('/tasks')
    .set('Authorization', authHeader());

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([]);
});

test('POST /tasks rejects a task without a title', async () => {
  const res = await request(app)
    .post('/tasks')
    .set('Authorization', authHeader())
    .send({});

  expect(res.statusCode).toBe(400);
  expect(res.body).toEqual({ error: 'Task title is required' });
});
