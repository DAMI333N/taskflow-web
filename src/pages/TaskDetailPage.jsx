// src/pages/TaskDetailPage.jsx
import { Link, useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskDetailPage() {
  const { id } = useParams();
  const { tasks } = useTasks();

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
    </section>
  );
}