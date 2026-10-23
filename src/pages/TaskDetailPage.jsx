// src/pages/TaskDetailPage.jsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';
import { getTask } from '../api/tasksApi.js';

// Keyed by id so every field below starts fresh when the route id changes.
export default function TaskDetailPage() {
  const { id } = useParams();
  return <TaskDetail key={id} id={id} />;
}

function TaskDetail({ id }) {
  const { updateTask, completeTask } = useTasks();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);
  const [draft, setDraft] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completeError, setCompleteError] = useState(null);

  // The task is fetched by id rather than read from the list, so a deep link
  // or a refresh works and an unknown id gets the server's 404 message.
  useEffect(() => {
    let ignore = false;

    getTask(id)
      .then((serverTask) => {
        if (!ignore) {
          setTask(serverTask);
          setIsLoading(false);
        }
      })
      .catch((fetchError) => {
        if (!ignore) {
          setLoadError({ status: fetchError.status, message: fetchError.message });
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [id, reloadCount]);

  const retry = () => {
    setIsLoading(true);
    setLoadError(null);
    setReloadCount((count) => count + 1);
  };

  if (isLoading) {
    return (
      <section className="task-detail">
        <p className="status-message">Loading task...</p>
      </section>
    );
  }

  if (loadError) {
    // 404 is an unknown id; 400 is an id the API cannot parse, such as "abc".
    const isNotFound = loadError.status === 404 || loadError.status === 400;

    return (
      <section className="task-detail">
        <Link to="/tasks">Back to all tasks</Link>
        <h2>{isNotFound ? 'Task not found' : 'Could not load this task'}</h2>
        <p className="error-message" role="alert">
          {loadError.message}
        </p>
        {!isNotFound && (
          <button type="button" className="retry-button" onClick={retry}>
            Retry
          </button>
        )}
      </section>
    );
  }

  const startEditing = () => {
    setDraft({
      title: task.title,
      description: task.description ?? '',
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
      const updated = await updateTask(task.id, {
        title: draft.title.trim(),
        description: draft.description.trim(),
        status: draft.status,
        priority: draft.priority,
      });

      setTask(updated);
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

  const handleComplete = async () => {
    setIsCompleting(true);
    setCompleteError(null);

    try {
      setTask(await completeTask(task.id));
    } catch (completeFailure) {
      setCompleteError(completeFailure.message);
    } finally {
      setIsCompleting(false);
    }
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

        <dt>Completed</dt>
        <dd>{task.completed ? 'Yes' : 'No'}</dd>

        <dt>ID</dt>
        <dd>{String(task.id)}</dd>
      </dl>

      <button type="button" className="edit-button" onClick={startEditing}>
        Edit task
      </button>

      {!task.completed && (
        <button
          type="button"
          className="complete-button"
          onClick={handleComplete}
          disabled={isCompleting}
        >
          {isCompleting ? 'Completing...' : 'Mark complete'}
        </button>
      )}

      {completeError && (
        <p className="error-message" role="alert">
          Could not complete: {completeError}
        </p>
      )}
    </section>
  );
}