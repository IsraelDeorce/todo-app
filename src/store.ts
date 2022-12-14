import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import persistPlugin from '@rematch/persist';
import storage from 'redux-persist/lib/storage';
import { models, RootModel } from './models';

const persistConfig = {
  key: 'todo-app-storage',
  storage,
};

export const store = init<RootModel>({
  plugins: [persistPlugin(persistConfig)],
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
