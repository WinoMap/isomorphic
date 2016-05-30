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
import { applyMiddleware } from 'redux';
import promiseMiddleware from './shared/lib/promiseMiddleware'

import * as styles from './shared/res/css/style.scss';
import style from './shared/res/css/style.scss';


const app = express();
app.use((req, res) => {
  // const css = []; // CSS for all rendered React components
  // const context = { insertCss: (styles) => css.push(styles._getCss()) };
  // const css = style._getCss();
  // console.log(css);


  const location = createLocation(req.url);
  const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

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
        <meta name="mobile-web-app-capable" content="yes">
        <meta charset="utf-8">
        <title>OpenWino Map</title>
        <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
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