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
    if (description) {
      dispatch.todoList.addTask(description);
      setDescription('');
    }
  };

  return (
    <header className="todo-header">
      <div className="todo-menu">
        <h2>{`Todo List (${tasks.filter((t) => !t.isComplete).length})`}</h2>
        <label>
          <input
            id="hide-tasks"
            name="hide-tasks"
            type="checkbox"
            checked={isHidingTasks}
            onChange={handleHideTasks}
          />
          Hide Completed Tasks
        </label>
      </div>
      <div className="task-input-container">
        <input
          id="task-input"
          name="task-input"
          type="text"
          autoComplete="off"
          placeholder="Type to add new tasks"
          className="task-input"
          value={description}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          id="task-add-button"
          type="button"
          className="task-add-button"
          onClick={handleAddTask}>
          Add task
        </button>
      </div>
    </header>
  );
}

export default TodoHeader;
