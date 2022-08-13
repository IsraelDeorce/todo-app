import TodoHeader from './components/TodoHeader/TodoHeader';
import TasksList from './components/TasksList/TasksList';

import './App.css';

function App() {
  return (
    <div className="app">
      <TodoHeader />
      <TasksList />
    </div>
  );
}

export default App;
