// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import Routes from './routes';
import rootReducer from './reducers/rootReducer';

import './index.css';

const store = createStore(
  combineReducers({
    ...rootReducer,
    routing: routerReducer
  })
)

ReactDOM.render(
  <Provider store={store}>
    {
      <Routes history={browserHistory} />
    }
  </Provider>,
  document.getElementById('root')
);
