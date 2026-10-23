// src/components/TaskList.jsx
import { useTasks } from '../context/TaskContext.jsx';
import TaskItem from './TaskItem.jsx';

export default function TaskList() {
  const { tasks, filteredTasks } = useTasks();

  if (tasks.length === 0) {
    return <p>No tasks yet. Add one above.</p>;
  }

  if (filteredTasks.length === 0) {
    return <p>No tasks match this filter.</p>;
  }

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}