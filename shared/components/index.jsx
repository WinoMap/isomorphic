import React from 'react';
import Plan from './plan';
import * as actionCreators from '../actions/MapActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {List, Map, toJSON} from 'immutable';

function mapStateToProps(state) {
  return {
    winos: state.get('winos'),
    options: state.get('options'),
    event: state.get('event') };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

//Default component
@connect(mapStateToProps, mapDispatchToProps)
export default class AppView extends React.Component {
  render() {
    return (
      <div id="app-view">
        <Header {...this.props}/>
        <MenuContainer {...this.props}/>
      </div>
    );
  }
}



const Header = (props) => <div>
	<h1>WinoMap </h1> 
	<hr />
	<MenuTools {...props}/>
</div>

class MenuTools extends React.Component {
	//Generate the buttons of the menu
	getButtons(){
		if(this.props.event.toJSON() != {}){
		  if(this.props.event.get('type') == 'scale'){
		    //If we are using the Scale tool
		    if(this.props.event.get('data').get('secondPoint') != ''){
		      //If the second point is placed
		      const firstPoint = this.props.event.getIn(['data','firstPoint']);
		      const secondPoint = this.props.event.getIn(['data','secondPoint']);
		      return (<button onClick={() => this.props.setScale(firstPoint, secondPoint)}>Confirm Scale</button>);
		    }
		  }
		}
	}

	render() {
		return (
			<div>
				<button>Tools</button>
				<button>Advanced</button>
				<button onClick={() => this.props.editWino(1,{x: 4})}>Edit Wino</button>
				<button onClick={() => this.props.togglePrecision()}>DisplayMode Toggle</button>
				<button onClick={() => this.props.eventStart('scale')}>Scale tool</button>
				{this.getButtons()}
			</div>
		);
	}
}

class MenuContainer extends React.Component {

	render(){
		return (
			<div>
				<Plan winos={this.props.winos} options={this.props.options}
					event={this.props.event} setEventData={this.props.setEventData}/>
				<MenuAdvanced />
			</div>
		);
	}
}

class MenuAdvanced extends React.Component {
	render() {
		return (
			<div>
			</div>
		);
	}
}