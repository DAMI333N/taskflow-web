// src/pages/TaskDetailPage.jsx
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskDetailPage() {
  const { id } = useParams();
  const { tasks, updateTask } = useTasks();
  const [draft, setDraft] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const task = tasks.find((item) => String(item.id) === id);

  if (!task) {
    return (
      <section className="task-detail">
        <h2>Task not found</h2>
        <p>No task matches the id {id}.</p>
        <Link to="/tasks">Back to all tasks</Link>
      </section>
    );
  }

  const startEditing = () => {
    setDraft({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (draft.title.trim() === '' || isSaving) {
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      // PUT is a full replace, so every editable field is sent.
      await updateTask(task.id, {
        title: draft.title.trim(),
        description: draft.description.trim(),
        status: draft.status,
        priority: draft.priority,
      });

      setDraft(null);
    } catch (submitError) {
      setSaveError(submitError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEditing = () => {
    setDraft(null);
    setSaveError(null);
  };

  if (draft !== null) {
    return (
      <section className="task-detail">
        <Link to="/tasks">Back to all tasks</Link>

        <form className="add-task-form" onSubmit={handleSubmit}>
          <h2>Edit task</h2>

          <label htmlFor="edit-title">Title</label>
          <input
            id="edit-title"
            name="title"
            type="text"
            value={draft.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="edit-description">Description</label>
          <textarea
            id="edit-description"
            name="description"
            rows="3"
            value={draft.description}
            onChange={handleChange}
          />

          <label htmlFor="edit-status">Status</label>
          <select
            id="edit-status"
            name="status"
            value={draft.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <label htmlFor="edit-priority">Priority</label>
          <select
            id="edit-priority"
            name="priority"
            value={draft.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {saveError && (
            <p className="error-message" role="alert">
              Could not save: {saveError}
            </p>
          )}

          <div className="form-actions">
            <button
              type="submit"
              disabled={draft.title.trim() === '' || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save changes'}
            </button>
            <button
              type="button"
              className="button-secondary"
              onClick={cancelEditing}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section className="task-detail">
      <Link to="/tasks">Back to all tasks</Link>

      <h2>{task.title}</h2>

      <dl className="task-fields">
        <dt>Status</dt>
        <dd>{task.status}</dd>

        <dt>Priority</dt>
        <dd>{task.priority}</dd>

        <dt>Description</dt>
        <dd>{task.description || 'No description provided.'}</dd>

        <dt>ID</dt>
        <dd>{String(task.id)}</dd>
      </dl>

      <button type="button" className="edit-button" onClick={startEditing}>
        Edit task
      </button>
    </section>
  );
}