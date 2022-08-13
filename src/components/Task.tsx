import { useState } from 'react';
import { useDispatch } from 'react-redux';

import './Task.css';

interface TaskProps {
  id: number;
  description: string,
  isComplete: boolean,
}

function Task({ id, description, isComplete }: TaskProps) {
  const [checked, setChecked] = useState<boolean>(isComplete);
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log('Delete button clicked!');
    dispatch.todoList.removeTask(id);
  }

  return (
    <div className="task">
      <input
        name="citizen"
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      {checked
        ? <strong>{description}</strong>
        : <div>{description}</div>
      }
      <span onClick={handleDelete}>X</span>
    </div>
  )
}

export default Task;
