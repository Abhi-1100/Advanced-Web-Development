import { useState } from 'react';

function TaskForm({ onCreate, isSubmitting }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');

  const submit = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle || isSubmitting) return;

    onCreate({ title: trimmedTitle, priority });
    setTitle('');
    setPriority('low');
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <label htmlFor="task-title">New task</label>
      <div className="task-form-fields">
        <input
          id="task-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What needs doing?"
          disabled={isSubmitting}
          required
        />
        <select value={priority} onChange={(event) => setPriority(event.target.value)} disabled={isSubmitting}>
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>
        <button className="submit-btn" type="submit" disabled={isSubmitting || !title.trim()}>
          {isSubmitting ? 'Adding...' : 'Add task'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;