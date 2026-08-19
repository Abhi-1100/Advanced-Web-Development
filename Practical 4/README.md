# Task Manager API

A simple RESTful API built with Node.js and Express for managing tasks.

The API enables CORS for the React dev server at `http://localhost:5173`.

## Endpoints

- POST /register (public)
- POST /login (public)
- GET /me (Bearer token required)
- GET /tasks (Bearer token required)
- POST /tasks (Bearer token required)
- PUT /tasks/:id (Bearer token required)
- DELETE /tasks/:id (Bearer token required)

## Run locally

```bash
npm install
npm start
```

The server runs on port 5000 by default.

## Practical 7 authentication

`JWT_SECRET` is loaded from `.env`; `.env` is excluded by `.gitignore` and must
never be committed. Use `.env.example` as a template for another machine.

Passwords are hashed with bcrypt using 10 salt rounds. Login uses
`bcrypt.compare`, then returns a JWT that expires after one hour. The auth
middleware verifies the Bearer token before any task handler runs, while task
validation rejects malformed input before it reaches MongoDB.

### Postman flow

1. `POST http://localhost:5000/register` with JSON `{ "email": "test@example.com", "password": "secret123" }` and confirm `201`.
2. `POST http://localhost:5000/login` with the same JSON and copy the returned `token`.
3. Call `GET http://localhost:5000/tasks` without an Authorization header and confirm `401`.
4. Call the same endpoint with `Authorization: Bearer <token>` and confirm `200`.
5. Call `GET http://localhost:5000/me` with the token and confirm the user is returned without a password.
6. Call `POST /tasks` with the token but without `title` and confirm `400`.
7. Change one character in the token and retry; confirm `401 Invalid or expired token`.
8. To test expiry without waiting, create a short-lived JWT only in a local test script or use a token whose `exp` value has passed; confirm `401` and that the server stays running.
