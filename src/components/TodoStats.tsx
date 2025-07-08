import { useTodos } from '../contexts/TodoContext';

export function TodoStats() {
  const { getActiveCount, clearCompleted, state } = useTodos();
  const activeCount = getActiveCount();
  const hasCompleted = state.todos.some(todo => todo.completed);

  return (
    <div className="todo-stats">
      <span className="todo-count">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>
      
      <button
        onClick={clearCompleted}
        className="clear-completed"
        style={{ visibility: hasCompleted ? 'visible' : 'hidden' }}
      >
        {hasCompleted ? 'Clear completed' : ''}
      </button>
    </div>
  );
} 