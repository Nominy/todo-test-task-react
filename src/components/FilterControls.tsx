import type { FilterType } from '../types/todo';
import { useTodos } from '../contexts/TodoContext';

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export function FilterControls() {
  const { state, setFilter } = useTodos();

  return (
    <div className="filter-controls">
      {FILTERS.map(filter => (
        <button
          key={filter.key}
          onClick={() => setFilter(filter.key)}
          className={`filter-button ${state.filter === filter.key ? 'active' : ''}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
} 