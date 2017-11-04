import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const reducers = {
  val: (val = '1 000.1', action) => {
    switch (action.type) {
      case 'INPUT': return action.payload
      default: return val
    }
  }
}

const reducer = combineReducers(reducers)
const logger = createLogger({
  duration: true,
  diff: true,
  collapsed: true
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware, logger)))

const loadApp = () => {
  ReactDOM.render(
    <Provider store={ store }>
      <App />
    </Provider>,
    // <App />,
    document.getElementById('root')
  )
}

loadApp()
// registerServiceWorker();
