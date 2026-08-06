// src/components/TaskItem.jsx
export default function TaskItem({ task }) {
  return (
    <li className="task-item">
      <span className="task-title">{task.title}</span>
      <span className={`badge badge-${task.status}`}>{task.status}</span>
      <span className="priority">{task.priority}</span>
    </li>
  );
}