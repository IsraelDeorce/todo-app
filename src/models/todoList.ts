import { createModel } from '@rematch/core';
import { ITask, RootModel } from '.';

type TodoListState = {
  idCount: number,
  tasks: ITask[],
};

export const todoList = createModel<RootModel>()({
  state: {
    idCount: 0,
    tasks: [],
  } as TodoListState, // initial state
  reducers: {
    // handle state changes with pure functions
    update(state: TodoListState, payload: TodoListState) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    addTask(description: string, rootState) {
      const idCount: number = rootState.todoList.idCount + 1;
      const task = {
        id: idCount,
        description,
        isComplete: false,
      };
      dispatch.todoList.update({
        idCount,
        tasks: [...rootState.todoList.tasks, task],
      });
    },
    removeTask(id: number, rootState) {
      const allTasks: ITask[] = rootState.todoList.tasks;
      const tasks: ITask[] = allTasks.filter((t: ITask) => t.id !== id);
      if (tasks.length !== allTasks.length) {
        dispatch.todoList.update({
          ...rootState.todoList,
          tasks,
        });
      }
    },
    doTask(id: number, rootState) {
      const tasks: ITask[] = rootState.todoList.tasks.map((t: ITask) => {
        if (t.id === id) {
          t.isComplete = true;
        }
        return t;
      });
      dispatch.todoList.update({
        ...rootState.todoList,
        tasks,
      });
    },
    undoTask(id, rootState) {
      const tasks: ITask[] = rootState.todoList.tasks.map((t: ITask) => {
        if (t.id === id) {
          t.isComplete = false;
        }
        return t;
      });
      dispatch.todoList.update({
        ...rootState.todoList,
        tasks,
      });
    },
  }),
});
