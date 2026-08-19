# Practical 2 — State Management and Routing in React

This folder contains the Practical 2 implementation for the Advanced Web Development course.

## Run locally

```bash
cd "Practical 2"
npm install
npm run dev
# open http://localhost:5173
```

## Practical 6 integration

The `/projects` route is now a Task Manager connected to the Practical 4 API.
Run both applications in separate terminals:

```bash
cd "Practical 4"
npm install
npm start
```

```bash
cd "Practical 2"
npm install
npm run dev
```

The React API client uses `http://localhost:5000`. The backend enables CORS for
`http://localhost:5173`, allowing the browser to call the API across ports.

### Verification checklist

- Create a task and confirm it appears immediately, then remains after the API responds.
- Toggle completion and confirm the PUT request updates the task.
- Choose Delete, confirm the dialog, and verify the DELETE request removes the task.
- Refresh the browser and confirm tasks remain, proving MongoDB persistence.
- Stop the backend and retry an action; an error toast should explain that the backend is unavailable.
- Remove the backend CORS middleware temporarily; the browser console should report a CORS policy error.

## Notes
- Uses React + Vite and `react-router-dom` v6
- Dark/light toggle, controlled Contact form, sticky navbar
- Ignore `node_modules/` and `dist/`
