import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';

import './TodoHeader.css';

function TodoHeader() {
  const [description, setDescription] = useState<string>('');
  const tasks = useSelector((state: RootState) => state.todoList.tasks);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCkick();
    }
  };

  const handleCkick = () => {
    dispatch.todoList.addTask(description);
    setDescription('');
  };

  return (
    <header>
      <h1>{`Todo List (${tasks.length})`}</h1>
      <div className="task-input">
        <input
          name="task"
          type="text"
          autoComplete="off"
          placeholder="Type to add new tasks"
          className="task"
          value={description}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={handleCkick}>
          Add a Task
        </button>
      </div>
    </header>
  )
}

export default TodoHeader;
