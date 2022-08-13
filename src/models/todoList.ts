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
    addTask({ taskDesc }, rootState) {
      const idCount = rootState.todoList.idCount + 1;
      const task = {
        id: idCount,
        description: taskDesc,
        isComplete: false,
      };
      dispatch.todoList.update({
        idCount,
        tasks: [...rootState.todoList.tasks, task],
      });
    }
  }),
});
