// src/components/TaskItem.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskItem({ task }) {
  const { deleteTask } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      // On success the row unmounts, so there is no state to reset.
      await deleteTask(task.id);
    } catch (deleteError) {
      setError(deleteError.message);
      setIsDeleting(false);
    }
  };

  return (
    <li className="task-item">
      <Link className="task-title" to={`/tasks/${task.id}`}>
        {task.title}
      </Link>

      <span className={`badge badge-${task.status}`}>{task.status}</span>
      <span className="priority">{task.priority}</span>

      <button
        type="button"
        className="delete-button"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>

      {error && (
        <p className="error-message" role="alert">
          Could not delete: {error}
        </p>
      )}
    </li>
  );
}
