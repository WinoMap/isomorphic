import React from 'react';
import * as actionCreators from '../actions/MapActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {List, Map, toJSON} from 'immutable';
import { Button, ButtonGroup, Panel } from 'react-bootstrap';

import Edit from './edit';
import SettingsPanel from './settingsPanel';
import AppContainer from './appContainer';


function mapStateToProps(state) {
	return {
	    winos: state.get('winos'),
	    options: state.get('options'),
	    event: state.get('event'),
	    ui: state.get('ui'),
	};
}
function mapDispatchToProps(dispatch) {
  	return bindActionCreators(actionCreators, dispatch);
}

//Default component
@connect(mapStateToProps, mapDispatchToProps)
export default class AppView extends React.Component {
  render() {
    return (
	    <div id="app-view" style={{position: "absolute", top: "-20px", bottom:0, left:0, right: 0}}>
	        <AppContainer {...this.props}/>
	        {this.props.ui.get('editedWino') != undefined
	        	? <Edit {...this.props}/>
	        	: false}
	        {this.props.ui.get('settingsPanel') == true
	        	? <SettingsPanel options={this.props.options}
	        		validateSettings={this.props.validateSettings}
	        		cancelSettings={this.props.cancelSettings}/>
	        	: false}
	    </div>
    );
  }
}