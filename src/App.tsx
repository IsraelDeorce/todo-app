import { useState } from 'react';

import { ITask } from './models';
import Task from './components/Task';

import './App.css';

function App() {
  const [taskDesc, setTaskDesc] = useState<string>('');
  const [countId, setCountId] = useState<number>(1);
  const [taskList, setTasksList] = useState<ITask[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDesc(event.target.value);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCkick();
    }
  };

  const handleCkick = () => {
    const newTask = {
      id: countId,
      description: taskDesc,
      isComplete: false,
    };
    setCountId(countId + 1);
    setTasksList([...taskList, newTask]);
  };

  return (
    <div className="app">
      <header>
        <h1>{`Todo List (${taskList.length})`}</h1>
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
      {taskList.map(({ id, description, isComplete }) =>
        <Task key={id} description={description} isComplete={isComplete} />)}
    </div>
  );
}

export default App;
