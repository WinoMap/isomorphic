import React from 'react';
import MenuTools from './menuTools';

// import style from '../res/css/style.scss';

// import * as styles from '../res/css/style.scss';
import style from '../res/css/style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// @withStyles(style)
class Header extends React.Component {
	render() {
		console.log(styles);
		console.log(style);

		return (
			<div className={style.headerStyle}>
				<h1>WinoMap</h1>
			</div>
		);
	}
}

export default withStyles(Header, style);