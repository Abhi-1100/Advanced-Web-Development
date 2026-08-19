function TaskList({ tasks, onToggle, onDelete, busyTaskId }) {
  if (tasks.length === 0) {
    return <div className="empty-tasks"><strong>No tasks yet.</strong><span>Add one above to get started.</span></div>;
  }

  return (
    <div className="task-list" aria-live="polite">
      {tasks.map((task) => {
        const isBusy = busyTaskId === task._id;
        return (
          <article className={`task-item ${task.completed ? 'is-complete' : ''}`} key={task._id}>
            <button
              className="task-check"
              type="button"
              aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
              onClick={() => onToggle(task)}
              disabled={isBusy || task._id.startsWith('temp-')}
            >
              {task.completed ? '✓' : ''}
            </button>
            <div className="task-copy">
              <strong>{task.title}</strong>
              <span className={`priority priority-${task.priority}`}>{task.priority} priority</span>
            </div>
            <button className="delete-btn" type="button" onClick={() => onDelete(task)} disabled={isBusy}>
              {isBusy ? 'Working...' : 'Delete'}
            </button>
          </article>
        );
      })}
    </div>
  );
}

export default TaskList;