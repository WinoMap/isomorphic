import React from 'react';
import { FormGroup, ControlLabel, FormControl, Grid, Col, Row, InputGroup,
Button } from 'react-bootstrap';
import { SliderPicker } from 'react-color';
import * as actionCreators from '../actions/MapActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {List, Map, toJSON} from 'immutable';
import { getRealWinoId } from '../reducers/winoCore';
import ReactDOM from 'react-dom';

export default class Edit extends React.Component {

	validateForm() {
		let newValues = {
			id: ReactDOM.findDOMNode(this.refs.id).value,
			x: ReactDOM.findDOMNode(this.refs.x).value,
			y: ReactDOM.findDOMNode(this.refs.y).value,
			color: this.props.ui.getIn(['editedWino','color']),
		};
		console.log(newValues);
		this.props.validateEditWino(newValues);
	}

	render() {
		var wino = this.props.ui.get('editedWino');

		var newWinoType;
		var currentWinoType;
		if(wino.get('main') == true){
			newWinoType = "anchor";
			currentWinoType = "mobile";
		} else {
			newWinoType = "mobile";
			currentWinoType = "anchor";
		}

		var popupStyle = {
			borderRadius: "5px",
			padding: "15px",
			position: "absolute",
			top: "3%",
			left: "3%",
			bottom: "3%",
			right: "3%",
			backgroundColor: "white",
			zIndex: 10,
			boxShadow: "0px 0px 8px black",
		};

		var backgroundScreen = {
			backgroundColor: "black",
			opacity: 0.5,
			position: "absolute",
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			zIndex: 9,
		};

		return (
			<div>
				<div style={backgroundScreen}>
					&nbsp;
				</div>
				<div style={popupStyle}>
					<h1>Edit a wino</h1> 
					<hr />
					<form>
						<FormGroup>
						    <ControlLabel ref={(ref) => this.test = ref}>ID</ControlLabel>
						    <FormControl
						    	type="number"
						    	placeholder="Enter ID"
						    	ref="id"
						    	defaultValue={wino.get('id')}
						    />
					    </FormGroup>
					    <Grid>
					    	<Row>
					    		<Col xs={6} md={6}>
									<FormGroup>
										<InputGroup>
											<InputGroup.Addon>X</InputGroup.Addon>
											<FormControl
												type="number"
						    					ref="x"
						    					defaultValue={wino.get('x')}
											/>
										</InputGroup>
									</FormGroup>
								</Col>
					    		<Col xs={6} md={6}>
									<FormGroup>
										<InputGroup>
											<InputGroup.Addon>Y</InputGroup.Addon>
											<FormControl
												type="number"
						    					ref="y"
						    					defaultValue={wino.get('y')}
											/>
										</InputGroup>
									</FormGroup>
								</Col>
							</Row>
						</Grid>
						<hr/>
						<SliderPicker
							onChangeComplete={ this.props.UIcolorChange }
							color={ wino.get('color') }
						/>
						<hr/>
						To convert this Wino to an {newWinoType}, click here &nbsp;
						<Button>
							Convert Wino to {newWinoType}
						</Button>
						<hr/>
						<Button onClick={this.validateForm.bind(this)}>
							Confirm changes
						</Button>
					</form>
				</div>
			</div>
		);
	}
}