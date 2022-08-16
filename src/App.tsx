import TodoHeader from './components/TodoHeader/TodoHeader';
import TasksList from './components/TasksList/TasksList';

import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app-todo">
        <TodoHeader />
        <TasksList />
      </div>
    </div>
  );
}

export default App;
