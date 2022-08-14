import { useDispatch } from 'react-redux';

import './Task.css';

interface TaskProps {
  id: number;
  description: string,
  isComplete: boolean,
};

function Task({ id, description, isComplete }: TaskProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch.todoList.removeTask(id);
  };

  const handleCheck = () => {
    if (isComplete) {
      dispatch.todoList.undoTask(id);
    } else {
      dispatch.todoList.completeTask(id);
    }
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        className="task-checkbox"
        checked={isComplete}
        onChange={handleCheck}
      />
      {isComplete
        ? <p className="task-desc task-complete">{description}</p>
        : <p className="task-desc task-incomplete">{description}</p>
      }
      <svg
        onClick={handleDelete}
        className="task-remove"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <line x1="1" y1="11" x2="11" y2="1" stroke="black" stroke-width="2" />
        <line x1="1" y1="1" x2="11" y2="11" stroke="black" stroke-width="2" />
      </svg>
    </div>
  );
}

export default Task;
