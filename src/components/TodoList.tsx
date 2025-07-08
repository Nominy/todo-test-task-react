import { useTodos } from '../contexts/TodoContext';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const { getFilteredTodos } = useTodos();
  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>No todos yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
} 