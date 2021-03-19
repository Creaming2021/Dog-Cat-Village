import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import penderMiddleware from 'redux-pender';
import rootReducer from './modules/index';
import { composeWithDevTools } from 'redux-devtools-extension';

import { BrowserRouter } from 'react-router-dom';

const middlewares = [penderMiddleware()];

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(...middlewares)),
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);