// https://rematchjs.org/docs/recipes/testing/
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import { models, RootModel } from '../models';
import { store, Store } from '../store';

interface IrenderWithRematchStore {
  ui: React.ReactElement;
  mockStates?: any;
  mockStore?: Store;
};

export const renderWithRematchStore = ({ ui, mockStates, mockStore }: IrenderWithRematchStore) => {
  if (!mockStore) {
    if (mockStates && Object.keys(mockStates).length) {
      for (const key in mockStates) {
        models[key].state = mockStates[key];
      }
    }
    mockStore = init<RootModel>({ models });
  }
  return render(ui, {
    wrapper: ({ children }) => <Provider store={mockStore || store}>{children}</Provider>,
  });
}
