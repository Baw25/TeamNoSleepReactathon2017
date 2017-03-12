// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxApp from './reduxApp';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import App from './components/App';
import promise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

import Homepage from './components/Homepage';

import rootReducer from './reducers/rootReducer';

import './index.css';

const defaultState = {
  userLocation: {what:'lol'},
  // openTableList: {}
}

const store = createStore(
  rootReducer,
  defaultState,
  applyMiddleware(
    thunkMiddleware, promise
  )
)

const rootRoute = {
  childRoutes: [{
    path: '/',
    components: reduxApp,
    childRoutes: [
      {
        path: '/homepage',
        component: Homepage
      },
    ]
  }]
}

ReactDOM.render(
  <Provider store={store}>
    {
      <Router routes={rootRoute}>
      </Router>
    }
  </Provider>,
  document.getElementById('root')
);
