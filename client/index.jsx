import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from '../shared/routes';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../shared/reducers/mapReducer';
import { fromJS, toJS } from 'immutable';

const history = createBrowserHistory();
let initialState = window.__INITIAL_STATE__;

const immutableState = fromJS(initialState);

const store = createStore(reducer, immutableState);

render(
  <Provider store={store}>
      <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);