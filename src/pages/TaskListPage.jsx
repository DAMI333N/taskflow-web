// src/pages/TaskListPage.jsx
import AddTaskForm from '../components/AddTaskForm.jsx';
import FilterBar from '../components/FilterBar.jsx';
import TaskList from '../components/TaskList.jsx';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskListPage() {
  const { tasks, filteredTasks } = useTasks();

  return (
    <section>
      <AddTaskForm />
      <FilterBar />

      <p className="task-count">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>

      <TaskList />
    </section>
  );
}