import React from 'react';
import { FormGroup, ControlLabel, FormControl, Grid, Col, Row, InputGroup,
Button, ButtonGroup } from 'react-bootstrap';
import ReactDOM from 'react-dom';

export default class SettingsPanel extends React.Component {
	
	validateForm() {
		let newValues = {
			ip: ReactDOM.findDOMNode(this.refs.ip).value,
		};
		this.props.validateSettings(newValues);
	}

	cancelForm() {
		this.props.cancelSettings();
	}

	render() {

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

		const popupOverflow = {
			height: "100%",
			overflow: "scroll",
			overflowX: "hidden",
		};

		const buttonBottomStyle = {
			position: "absolute",
			bottom: "15px",
		};

		const buttonStyle = {
			width: "48%",
		};

		return (
			<div>
				<div style={backgroundScreen}>
					&nbsp;
				</div>
				<div style={popupStyle}>
					<div style={popupOverflow}>
						<h3>Settings</h3> 
						<hr />
						<form>
							<FormGroup>
							    <ControlLabel>IP adress</ControlLabel>
							    <FormControl
							    	type="text"
							    	placeholder="Enter Raspberry Pi adress"
							    	ref="ip"
							    	defaultValue={this.props.options.get('ip')}
							    />
						    </FormGroup>
						</form>
					</div>
					<ButtonGroup justified style={buttonBottomStyle}>
						<Button bsStyle="primary" onClick={this.validateForm.bind(this)} style={buttonStyle}>
							Confirm changes
						</Button>
						<Button onClick={this.cancelForm.bind(this)} style={buttonStyle}>
							Cancel
						</Button>
					</ButtonGroup>
				</div>
			</div>
		)
	}
}