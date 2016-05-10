import React from 'react';
import Home from './home';

export default class AppView extends React.Component {
  render() {
    return (
      <div id="app-view">
        <h1>WinoMap</h1>
        <hr />
        <Home />
      </div>
    );
  }
}