import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import Task from '../Task/Task';

import './TasksList.css';

function TasksList() {
  const { tasks, isHidingTasks } = useSelector((state: RootState) => state.todoList);

  return (
    <div data-testid="task-list">
      {tasks.map(({ id, description, isComplete }) => {
        if (isHidingTasks && isComplete) return null;
        return <Task key={id} id={id} description={description} isComplete={isComplete} />;
      })}
    </div>
  );
}

export default TasksList;
