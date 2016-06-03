import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from '../shared/routes';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../shared/reducers/mapReducer';
import { fromJS, toJS } from 'immutable';
import { applyMiddleware } from 'redux';
import promiseMiddleware from '../shared/lib/promiseMiddleware'
import { getWinos } from '../shared/actions/MapActions';


const history = createBrowserHistory();
let initialState = window.__INITIAL_STATE__;

const immutableState = fromJS(initialState);

//const store = createStore(reducer, immutableState);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, immutableState);

setInterval(() => {
	store.dispatch(getWinos());
}, 10000);

render(
  <Provider store={store}>
      <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);
