import React     from 'react';
import { Route } from 'react-router';

import App from './components';
import Edit from './components/edit';
import MyComponent from './components/myComponent'

export default (
	[<Route name="edit" component={Edit} path="/edit" />,
	<Route name="app" component={App} path="/" />,
	<Route name="comp" component={MyComponent} path="/test" />]

);