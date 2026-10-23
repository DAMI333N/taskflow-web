// src/components/FilterBar.jsx
import { useTasks } from '../context/TaskContext.jsx';

const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const PRIORITY_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export default function FilterBar() {
  const { filter, setFilter, priorityFilter, setPriorityFilter } = useTasks();

  return (
    <div className="filter-bar">
      <div
        className="filter-group"
        role="group"
        aria-labelledby="status-filter-label"
      >
        <span id="status-filter-label" className="filter-group-label">
          Status
        </span>

        {STATUS_FILTERS.map((option) => (
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

      <div
        className="filter-group"
        role="group"
        aria-labelledby="priority-filter-label"
      >
        <span id="priority-filter-label" className="filter-group-label">
          Priority
        </span>

        {PRIORITY_FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={
              option.value === priorityFilter
                ? 'filter-button is-active'
                : 'filter-button'
            }
            aria-pressed={option.value === priorityFilter}
            onClick={() => setPriorityFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}