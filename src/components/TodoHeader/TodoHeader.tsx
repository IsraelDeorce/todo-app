import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';

import './TodoHeader.css';

function TodoHeader() {
  const [description, setDescription] = useState<string>('');
  const { tasks, isHidingTasks } = useSelector((state: RootState) => state.todoList);
  const dispatch = useDispatch();

  const handleHideTasks = () => {
    dispatch.todoList.changeHidingTasks();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleAddTask = () => {
    dispatch.todoList.addTask(description);
    setDescription('');
  };

  return (
    <header>
      <h1>{`Todo List (${tasks.length})`}</h1>
      <input
        id="hide-tasks"
        name="hide-tasks"
        type="checkbox"
        checked={isHidingTasks}
        onClick={handleHideTasks}
      />
      <label htmlFor="hide-tasks">Hide Completed Tasks</label>
      <div className="task-input">
        <input
          id="input-task"
          name="input-task"
          type="text"
          autoComplete="off"
          placeholder="Type to add new tasks"
          className="task"
          value={description}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={handleAddTask}>
          Add a Task
        </button>
      </div>
    </header>
  )
}

export default TodoHeader;
