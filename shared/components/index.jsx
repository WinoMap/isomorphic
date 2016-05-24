import React from 'react';
import Plan from './plan';
import * as actionCreators from '../actions/MapActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {List, Map, toJSON} from 'immutable';
import { Button, ButtonGroup, Panel } from 'react-bootstrap';
import MenuWinos from './menuWinos';
import Edit from './edit';

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
	    <div id="app-view" style={{position: "absolute", top: 0, bottom:0, left:0, right: 0}}>
	        <AppContainer {...this.props}/>
	        {this.props.ui.get('editedWino') != undefined
	        	? <Edit {...this.props}/>
	        	: false}
	    </div>
    );
  }
}



const Header = (props) => <div style={{height: "115px"}}>
	<h1>WinoMap</h1>
	<MenuTools {...props}/>
</div>

class MenuTools extends React.Component {
	//Generate the Buttons of the menu
	getButtons(){
		if(this.props.event.toJSON() != {}){
		  if(this.props.event.get('type') == 'scale'){
		    //If we are using the Scale tool
		    if(this.props.event.get('data').get('secondPoint') != ''){
		      //If the second point is placed
		      const firstPoint = this.props.event.getIn(['data','firstPoint']);
		      const secondPoint = this.props.event.getIn(['data','secondPoint']);
		      return (<Button onClick={() => this.props.setScale(firstPoint, secondPoint)}>Confirm Scale</Button>);
		    }
		  }
		}
	}

	render() {

		const buttonGroupStyle = {
			width: "100%",
		}

		return (
			<div>
				<ButtonGroup style={buttonGroupStyle}>
					<Button onClick={() => this.props.togglePrecision()}>DisplayMode Toggle</Button>
					<Button onClick={() => this.props.eventStart('scale')}>Scale tool</Button>
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
			bottom: "30px",
			left: 0,
		};

		const buttonAdvancedStyle = {
			position: "absolute",
			left: 0,
			right: 0,
			bottom: 0,
			height: "50px",
		}

		const planStyle = {
			position: "absolute",
			top: "115px",
			bottom: "50px",
			left: 0,
			right: 0,
			overflow: "hidden",
		}

		const panelOverflow = {
			height: "70vh",
			width: "100vw",
			overflow: "scroll",
			overflowX: "hidden",
		}

		return (
			<div>
				<Header {...this.props}/>
				<Plan winos={this.props.winos} options={this.props.options}
					event={this.props.event} setEventData={this.props.setEventData}
					style={planStyle}
				/>
				<Button onClick={this.props.UItoggleAdvanced} style={buttonAdvancedStyle}>
					display Advanced
				</Button>
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