import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunk)),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);