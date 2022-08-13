import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store } from './store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={getPersistor()}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode >
);
