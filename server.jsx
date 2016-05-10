import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from './shared/routes';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducer from './shared/reducers/mapReducer';
import {Map, List} from 'immutable';


const app = express();
app.use((req, res) => {
  const location = createLocation(req.url);
  const store = createStore(reducer);

  var winos = List.of(
  Map({
    id: 1,
    x:0,
    y:1,
    radius: Map({2: 5}),
    main: false
  }),
  Map({
    id: 2,
    x:4,
    y:0,
    radius: Map({1: 5}),
    main: true
  }));
  
  store.dispatch({
    type: 'SET_WINOS',
    winos: winos
  });

  console.log('test');

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) { 
      console.error(err);
      return res.status(500).end('Internal server error');
    }
    if (!renderProps) return res.status(404).end('Not found.');
    
    const InitialComponent = (
      <Provider store={store}>
          <RoutingContext {...renderProps} />
      </Provider>
    );

    const initialState = store.getState();

    const componentHTML = renderToString(InitialComponent);
    const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Redux Demo</title>
        <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
  </html>    
`
    res.end(HTML);
  });
});
export default app;