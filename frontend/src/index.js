import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { createStore, applyMiddleware, compose } from 'redux';
import Thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import penderMiddleware from 'redux-pender';
import rootReducer, {rootSaga} from './modules/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { BrowserRouter } from 'react-router-dom';

const middlewares = [penderMiddleware()];

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
)

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);