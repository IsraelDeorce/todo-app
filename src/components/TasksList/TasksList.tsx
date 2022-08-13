import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import Task from '../Task/Task';

import './TasksList.css';

function TasksList() {
  const tasks = useSelector((state: RootState) => state.todoList.tasks);

  return (
    <>
      {tasks.map(({ id, description, isComplete }) =>
        <Task key={id} id={id} description={description} isComplete={isComplete} />)}
    </>
  )
}

export default TasksList;
