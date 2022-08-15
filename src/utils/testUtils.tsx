// https://rematchjs.org/docs/recipes/testing/
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import { models, RootModel } from '../models';
import { store, Store } from '../store';

export const renderWithRematchStore = (ui: React.ReactElement, _store?: Store) => {
  if (!_store) {
    _store = init<RootModel>({ models }) || store;
  }
  return render(ui, {
    wrapper: ({ children }) => <Provider store={_store || store}>{children}</Provider>,
  });
}
