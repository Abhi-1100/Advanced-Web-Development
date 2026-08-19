const BASE_URL = 'http://localhost:5000';
const TOKEN_KEY = 'task_manager_token';

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

export const setAuthToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const clearAuthToken = () => localStorage.removeItem(TOKEN_KEY);

async function request(path, options = {}) {
  let response;
  const headers = { ...(options.headers || {}) };
  const token = getAuthToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  } catch {
    throw new Error('Backend is not running. Start the server on port 5000.');
  }

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error || body.errors?.join(', ') || `Request failed (HTTP ${response.status}).`);
  }

  return body;
}

export const getTasks = () => request('/tasks');

export const register = (credentials) => request('/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials)
});

export const login = (credentials) => request('/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials)
});

export const forgotPassword = (email) => request('/forgot-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});

export const resetPassword = (token, password) => request('/reset-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token, password })
});

export const createTask = (task) => request('/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(task)
});

export const updateTask = (id, updates) => request(`/tasks/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updates)
});

export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' });