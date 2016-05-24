import React from 'react';
import { FormGroup, ControlLabel, FormControl, Grid, Col, Row, InputGroup,
Button, ButtonGroup } from 'react-bootstrap';
import { SliderPicker } from 'react-color';
import {List, Map, toJSON} from 'immutable';
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

	cancelForm() {
		this.props.cancelEditWino();
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

		const popupStyle = {
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

		const backgroundScreen = {
			backgroundColor: "black",
			opacity: 0.5,
			position: "absolute",
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			zIndex: 9,
		};

		const buttonStyle = {
			width: "32%",
		};

		const buttonBottomStyle = {
			position: "absolute",
			bottom: "15px",
		};

		const popupOverflow = {
			height: "100%",
			overflow: "scroll",
			overflowX: "hidden",
		};

		return (
			<div>
				<div style={backgroundScreen}>
					&nbsp;
				</div>
				<div style={popupStyle}>
					<div style={popupOverflow}>
						<h3>Edit a wino</h3> 
						<hr />
						<form>
							<FormGroup>
							    <ControlLabel>ID</ControlLabel>
							    <FormControl
							    	disabled
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
							<SliderPicker
								onChangeComplete={ this.props.UIcolorChange }
								color={ wino.get('color') }
							/>
						</form>
					</div>
					<ButtonGroup justified style={buttonBottomStyle}>
						<Button bsStyle="primary"
							onClick={this.validateForm.bind(this)}
							style={buttonStyle}
						>
							Confirm
						</Button>
						<Button onClick={() => this.props.toggleTypeWino(wino.get('id'))}
							style={buttonStyle}
						>
							Convert to {newWinoType}
						</Button>
						<Button onClick={this.cancelForm.bind(this)}
							style={buttonStyle}
						>
							Cancel
						</Button>
					</ButtonGroup>
				</div>
			</div>
		);
	}
}