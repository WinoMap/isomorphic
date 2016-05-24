import React from 'react';
import Plan from './plan';
import * as actionCreators from '../actions/MapActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {List, Map, toJSON} from 'immutable';
import { Button, ButtonGroup, Panel } from 'react-bootstrap';
import MenuWinos from './menuWinos';
import Edit from './edit';
import SettingsPanel from './settingsPanel'

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

const headerStyle = {
	height: "115px",
	background: "linear-gradient(to bottom, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%)",
	filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#499bea', endColorstr='#207ce5', GradientType=0 )",
}

const Header = (props) => <div style={headerStyle}>
	<h1>WinoMap</h1>
	<MenuTools {...props}/>
</div>



class MenuTools extends React.Component {
	//Generate the Buttons of the menu
	getButtons(){

		const confirmStyle = {
			width: "100%",
			zIndex: 12,
		}

		if(this.props.event.toJSON() != {}){
		  if(this.props.event.get('type') == 'scale'){
		    //If we are using the Scale tool
		    if(this.props.event.get('data').get('secondPoint') != ''){
		      //If the second point is placed
		      const firstPoint = this.props.event.getIn(['data','firstPoint']);
		      const secondPoint = this.props.event.getIn(['data','secondPoint']);
		      return (<Button style={confirmStyle} onClick={() => this.props.setScale(firstPoint, secondPoint)}>Confirm Scale</Button>);
		    }
		  }
		}
	}

	render() {

		const buttonStyle = {
			width: "50%",
		}

		return (
			<div>
				<ButtonGroup justified>
					<Button onClick={() => this.props.togglePrecision()} style={buttonStyle}>DisplayMode Toggle</Button>
					<Button onClick={() => this.props.eventStart('scale')} style={buttonStyle}>Scale tool</Button>
					{this.getButtons()}
				</ButtonGroup>
			</div>
		);
	}
}

class AppContainer extends React.Component {

	render(){

		const divStyle = {
			position: "relative",
			zIndex: 3,
		};

		const panelAdvancedStyle = {
			position: "absolute",
			right: 0,
			bottom: "20px",
			left: 0,
			boxShadow: "0px 0px 10px black",
		};

		const buttonBottomStyle = {
			position: "absolute",
			left: 0,
			right: 0,
			bottom: 0,
		};

		const buttonStyle = {
			width: "50%",
		};

		const planStyle = {
			position: "absolute",
			top: "115px",
			bottom: "50px",
			left: 0,
			right: 0,
			overflow: "hidden",
		};

		const panelOverflow = {
			height: "70vh",
			width: "96vw",
			overflow: "scroll",
			overflowX: "hidden",
		};

		return (
			<div>
				<Header {...this.props}/>
				<Plan winos={this.props.winos} options={this.props.options}
					event={this.props.event} setEventData={this.props.setEventData}
					style={planStyle}
				/>
				<ButtonGroup style={buttonBottomStyle} justified>
					<Button onClick={this.props.UItoggleAdvanced} style={buttonStyle}
						bsStyle="primary"
						active={this.props.ui.get('advancedMenuOn')}
					>
						Advanced
					</Button>
					<Button onClick={this.props.UItoggleSettings} style={buttonStyle}
						bsStyle="info"
					>
						Settings
					</Button>
				</ButtonGroup>
				<Panel collapsible expanded={this.props.ui.get('advancedMenuOn')}
					style={panelAdvancedStyle}
				>
					<div style={panelOverflow}>
						<MenuWinos {...this.props}/>
		    		</div>
		        </Panel>
			</div>
		);
	}
}