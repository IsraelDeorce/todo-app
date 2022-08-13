import { useState } from 'react';

import './Task.css';

interface TaskProps {
  description: string,
  isComplete: boolean,
}

function Task({ description, isComplete }: TaskProps) {
  const [checked, setChecked] = useState<boolean>(isComplete);

  const handleDelete = () => {
    console.log('Delete button clicked!');
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
