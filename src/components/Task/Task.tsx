import { useDispatch } from 'react-redux';

import './Task.css';

interface TaskProps {
  id: number;
  description: string,
  isComplete: boolean,
}

function Task({ id, description, isComplete }: TaskProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log('Delete button clicked!');
    dispatch.todoList.removeTask(id);
  }
  const handleCheck = () => {
    if (isComplete) {
      dispatch.todoList.undoTask(id);
    } else {
      dispatch.todoList.completeTask(id);
    }
  }

  return (
    <div className="task">
      <input
        name="citizen"
        type="checkbox"
        checked={isComplete}
        onChange={handleCheck}
      />
      {isComplete
        ? <strong>{description}</strong>
        : <div>{description}</div>
      }
      <span onClick={handleDelete}>X</span>
    </div>
  )
}

export default Task;
