import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk';
import { keysInit, keysReducer, config } from 'react-keys';
import carparkReducer from './reducers';
import App from './components/app'

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore);
const store = createStoreWithMiddleware(combineReducers({'@@keys': keysReducer, 'carpark': carparkReducer}));
keysInit({store: store, config: config()});

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};
render();
