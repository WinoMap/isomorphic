// MyComponent.js 
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../res/css/style.scss';
 
function MyComponent(props, context) {
  return (
    <div className={s.buttonStyle}>
      <h1 className={s.buttonStyle}>Hello, world!</h1>
    </div>
  );
}
 
export default withStyles(MyComponent, s); 