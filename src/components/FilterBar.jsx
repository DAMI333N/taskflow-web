// src/components/FilterBar.jsx
import { useTasks } from '../context/TaskContext.jsx';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

export default function FilterBar() {
  const { filter, setFilter } = useTasks();

  return (
    <div className="filter-bar">
      {FILTERS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={
            option.value === filter ? 'filter-button is-active' : 'filter-button'
          }
          aria-pressed={option.value === filter}
          onClick={() => setFilter(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}