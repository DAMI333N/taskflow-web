// src/components/TaskItem.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskItem({ task }) {
  const { completeTask, deleteTask } = useTasks();
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const isBusy = isCompleting || isDeleting;

  const handleComplete = async () => {
    setIsCompleting(true);
    setError(null);

    try {
      await completeTask(task.id);
    } catch (completeError) {
      setError(`Could not complete: ${completeError.message}`);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      // On success the row unmounts, so there is no state to reset.
      await deleteTask(task.id);
    } catch (deleteError) {
      setError(`Could not delete: ${deleteError.message}`);
      setIsDeleting(false);
    }
  };

  return (
    <li className={task.completed ? 'task-item is-completed' : 'task-item'}>
      <Link className="task-title" to={`/tasks/${task.id}`}>
        {task.title}
      </Link>

      <span className={`badge badge-${task.status}`}>{task.status}</span>
      <span className="priority">{task.priority}</span>

      <div className="task-actions">
        {!task.completed && (
          <button
            type="button"
            className="complete-button"
            onClick={handleComplete}
            disabled={isBusy}
          >
            {isCompleting ? 'Completing...' : 'Complete'}
          </button>
        )}

        <button
          type="button"
          className="delete-button"
          onClick={handleDelete}
          disabled={isBusy}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
    </li>
  );
}
