import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

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
		      return (<Button bsClass="confirmStyle btn" onClick={() => this.props.setScale(firstPoint, secondPoint)}>Confirm Scale</Button>);
		    }
		  }
		}
	}

	render() {

		return (
			<div>
				<ButtonGroup justified>
					<Button onClick={() => this.props.togglePrecision()} bsClass="buttonStyle btn">DisplayMode Toggle</Button>
					<Button onClick={() => this.props.eventStart('scale')} bsClass="buttonStyle btn">Scale tool</Button>
					{this.getButtons()}
				</ButtonGroup>
			</div>
		);
	}
}