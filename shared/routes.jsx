import React     from 'react';
import { Route } from 'react-router';

import App from './components';
import Edit from './components/edit';

export default (
	[<Route name="edit" component={Edit} path="/edit" />,
	<Route name="app" component={App} path="/" />]

);