import { TodoProvider } from './contexts/TodoContext';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { FilterControls } from './components/FilterControls';
import { TodoStats } from './components/TodoStats';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className="app">
        <header className="app-header">
          <h1>todos</h1>
        </header>
        
        <main className="app-main">
          <AddTodo />
          <TodoList />
          
          <footer className="app-footer">
            <TodoStats />
            <FilterControls />
          </footer>
        </main>
      </div>
    </TodoProvider>
  );
}

export default App;
