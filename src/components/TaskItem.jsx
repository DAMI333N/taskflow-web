// src/components/TaskItem.jsx
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskItem({ task }) {
  const { deleteTask } = useTasks();

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
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </li>
  );
}