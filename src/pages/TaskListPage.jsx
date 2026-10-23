// src/pages/TaskListPage.jsx
import AddTaskForm from '../components/AddTaskForm.jsx';
import FilterBar from '../components/FilterBar.jsx';
import SummaryPanel from '../components/SummaryPanel.jsx';
import TaskList from '../components/TaskList.jsx';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskListPage() {
  const { tasks, filteredTasks, isLoading, error, reload } = useTasks();

  let content;

  if (isLoading) {
    content = <p className="status-message">Loading tasks...</p>;
  } else if (error) {
    content = (
      <div className="error-panel">
        <p className="error-message" role="alert">
          Could not load tasks: {error}
        </p>
        <button type="button" className="retry-button" onClick={reload}>
          Retry
        </button>
      </div>
    );
  } else {
    content = (
      <>
        <p className="task-count">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </p>

        <TaskList />
      </>
    );
  }

  return (
    <section>
      <AddTaskForm />
      <SummaryPanel />
      <FilterBar />
      {content}
    </section>
  );
}
