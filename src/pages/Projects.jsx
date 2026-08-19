import { useEffect, useState } from 'react';
import { clearAuthToken, createTask, deleteTask, getAuthToken, getTasks, updateTask } from '../api';
import AuthForm from '../components/AuthForm';
import ConfirmDialog from '../components/ConfirmDialog';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Toast from '../components/Toast';

function Projects() {
  const [tasks, setTasks] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [initialError, setInitialError] = useState(null);
  const [writeState, setWriteState] = useState({ action: null, id: null });
  const [toast, setToast] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAuthToken()));

  const notify = (message, type = 'success') => {
    setToast({ message, type });
  };

  const fetchTasks = async () => {
    setInitialLoading(true);
    setInitialError(null);
    try {
      setTasks(await getTasks());
    } catch (err) {
      setInitialError(err.message);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setInitialLoading(false);
    }
  }, [isAuthenticated]);

  const handleCreate = async (taskInput) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticTask = { _id: tempId, ...taskInput, completed: false };
    setTasks((current) => [...current, optimisticTask]);
    setWriteState({ action: 'create', id: tempId });

    try {
      const savedTask = await createTask(taskInput);
      setTasks((current) => current.map((task) => (
        task._id === tempId ? savedTask : task
      )));
      notify('Task created successfully.');
    } catch (err) {
      setTasks((current) => current.filter((task) => task._id !== tempId));
      notify(err.message, 'error');
    } finally {
      setWriteState({ action: null, id: null });
    }
  };

  const handleToggle = async (task) => {
    const previousTasks = tasks;
    const nextCompleted = !task.completed;
    setTasks((current) => current.map((item) => (
      item._id === task._id ? { ...item, completed: nextCompleted } : item
    )));
    setWriteState({ action: 'update', id: task._id });

    try {
      const savedTask = await updateTask(task._id, { completed: nextCompleted });
      setTasks((current) => current.map((item) => (
        item._id === task._id ? savedTask : item
      )));
      notify('Task updated successfully.');
    } catch (err) {
      setTasks(previousTasks);
      notify(err.message, 'error');
    } finally {
      setWriteState({ action: null, id: null });
    }
  };

  const handleDelete = async () => {
    const taskId = taskToDelete._id;
    setWriteState({ action: 'delete', id: taskId });

    try {
      await deleteTask(taskId);
      setTasks((current) => current.filter((task) => task._id !== taskId));
      notify('Task deleted successfully.');
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setWriteState({ action: null, id: null });
      setTaskToDelete(null);
    }
  };

  return (
    <section className="projects-page task-manager">
      <div className="section-header">
        <div>
          <p className="section-label">Practical 7</p>
          <h1>{isAuthenticated ? 'Task Manager' : 'Secure Task Manager'}</h1>
        </div>
        <p className="section-description">
          Create, complete, and clear tasks backed by Express, MongoDB, and Mongoose.
        </p>
      </div>

      {!isAuthenticated && <AuthForm onAuthenticated={() => setIsAuthenticated(true)} />}

      {isAuthenticated && (
        <>
          <div className="task-toolbar">
            <span>Signed in securely</span>
            <button type="button" onClick={() => { clearAuthToken(); setTasks([]); setIsAuthenticated(false); }}>Log out</button>
          </div>
          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
          <TaskForm onCreate={handleCreate} isSubmitting={writeState.action === 'create'} />

          {initialLoading && <p className="task-status">Loading tasks...</p>}
          {initialError && (
            <div className="task-error" role="alert">
              <strong>Could not load tasks.</strong>
              <span>{initialError}</span>
              <button type="button" onClick={fetchTasks}>Retry</button>
            </div>
          )}
          {!initialLoading && !initialError && (
            <TaskList
              tasks={tasks}
              onToggle={handleToggle}
              onDelete={setTaskToDelete}
              busyTaskId={writeState.id}
            />
          )}

          {taskToDelete && (
            <ConfirmDialog
              task={taskToDelete}
              isDeleting={writeState.action === 'delete'}
              onConfirm={handleDelete}
              onCancel={() => setTaskToDelete(null)}
            />
          )}
        </>
      )}
    </section>
  );
}

export default Projects;
