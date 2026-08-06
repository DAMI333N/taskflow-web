// src/pages/TaskListPage.jsx
import AddTaskForm from '../components/AddTaskForm.jsx';
import FilterBar from '../components/FilterBar.jsx';
import TaskList from '../components/TaskList.jsx';

export default function TaskListPage() {
  return (
    <section>
      <AddTaskForm />
      <FilterBar />
      <TaskList />
    </section>
  );
}