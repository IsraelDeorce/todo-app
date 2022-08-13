import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './store';
import Task from './components/Task';

import './App.css';

function App() {
  const [taskDesc, setTaskDesc] = useState<string>('');
  const tasks = useSelector((state: RootState) => state.todoList.tasks);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDesc(event.target.value);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCkick();
    }
  };

  const handleCkick = () => {
    dispatch.todoList.addTask({ taskDesc });
  };

  return (
    <div className="app">
      <header>
        <h1>{`Todo List (${tasks.length})`}</h1>
        <div className="task-input">
          <input
            name="task"
            type="text"
            autoComplete="off"
            placeholder="Type to add new tasks"
            className="task"
            value={taskDesc}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={handleCkick}
          >
            Add a Task
          </button>
        </div>
      </header>
      {tasks.map(({ id, description, isComplete }) =>
        <Task key={id} description={description} isComplete={isComplete} />)}
    </div>
  );
}

export default App;
