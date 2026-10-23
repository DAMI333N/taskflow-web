// src/components/TaskItem.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskItem({ task }) {
  const { deleteTask, reorderTasks } = useTasks();
  const [isDragging, setIsDragging] = useState(false);
  const [dropPosition, setDropPosition] = useState(null);
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

  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', String(task.id));
    event.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDropPosition(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    if (isDragging) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const isBelowMidpoint = event.clientY > rect.top + rect.height / 2;

    setDropPosition(isBelowMidpoint ? 'after' : 'before');
  };

  const handleDragLeave = () => {
    setDropPosition(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const draggedId = event.dataTransfer.getData('text/plain');
    const position = dropPosition ?? 'before';

    setDropPosition(null);

    if (draggedId) {
      reorderTasks(draggedId, task.id, position);
    }
  };

  const classNames = ['task-item'];

  if (isDragging) {
    classNames.push('is-dragging');
  }

  if (dropPosition === 'before') {
    classNames.push('drop-before');
  }

  if (dropPosition === 'after') {
    classNames.push('drop-after');
  }

  return (
    <li
      className={classNames.join(' ')}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <span className="drag-handle" aria-hidden="true">
        ⠿
      </span>

      <Link className="task-title" to={`/tasks/${task.id}`} draggable={false}>
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