import { Models } from '@rematch/core';
import { todoList } from './todoList';

export interface RootModel extends Models<RootModel> {
  todoList: typeof todoList;
}
export const models: RootModel = { todoList };

export interface ITask {
  id: number,
  description: string,
  isComplete: boolean,
};
