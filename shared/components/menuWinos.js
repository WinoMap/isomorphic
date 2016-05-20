import React from 'react';
import { getRealWinoId } from '../reducers/winoCore';
import { Button, Panel, Accordion, Tabs, Tab, ListGroup, ListGroupItem, Grid, Col, Row } from 'react-bootstrap';
import {List, Map, toJSON} from 'immutable';
// import style from '../res/css/style';

export default class MenuWinos extends React.Component {

	/**
	* Gives the IDs of the Mobiles at range of an Anchor.
	*	@param anchor Wino the anchor to test
	*	@return list of IDs
	*/
	getMobilesAtRange(anchor) {
		var keys = [];
		for(var key in anchor.get('radius').toJSON()){
			keys.push(key);
		}
		return keys;
	}

	/**
	* Gives the IDs of the anchors localizing the Mobile.
	*	@param state State State of the winos
	*	@param mobile Wino the mobile to test
	*	@return list of IDs
	*/
	getAnchorsAtRange(state, mobile) {
		var keys = []
		for(var key in state.toJSON()){
			let wino = state.get(key);
			if(typeof wino.get('radius').get(''+mobile.get('id')) !== "undefined"){
				keys.push(wino.get('id'));
			}
		}
		return keys;
	}


	/**
	* generate the panels with the list of Winos and Anchors
	*
	*/
	getPanels() {
		var anchorPanels = [];
		var mobilePanels = [];
		for(let i=0; i<this.props.winos.size;i++){
			var wino = this.props.winos.get(i);
			var winoColor = {
				backgroundColor: wino.get('color'),
				height: "2px",
				width: "100%",
			}

			if(wino.get('main') == true){
				// We are generating the Mobile Panel

				//Content of the panels inside each Mobile Panel
				var panelContent = [];
				let anchorsAtRange = this.getAnchorsAtRange(this.props.winos, wino);
				for(var j in anchorsAtRange){
					var anchor = this.props.winos.get(getRealWinoId(this.props.winos, anchorsAtRange[j]));

					var anchorColor = {
						backgroundColor: anchor.get('color'),
						height: "2px",
						width: "33%",
					}

					panelContent.push(
						<br/>,
						<div style={anchorColor}>&nbsp;</div>,
						<ListGroupItem>
							<Grid>
								<Row className="show-grid">
									<Col xs={4} md={4}>
										<strong>Anchor n°</strong>{anchor.get('id')}
									</Col>
									<Col xs={4} md={4}>
										<strong>Distance: </strong>{wino.get('radius').get(anchorsAtRange[j])}
									</Col>
									<Col xs={4} md={4}>
										<strong>x,y: </strong>{anchor.get('x')}, {anchor.get('y')}
									</Col>
								</Row>
							</Grid>
						</ListGroupItem>
					);
				}


				// Title of the panel
				let header = "Mobile n°"+ wino.get('id') +" - " + wino.get('x') + " , "+wino.get('y');
				mobilePanels.push(
					<br/>,
					<div style={winoColor}>&nbsp;</div>,
					<Panel header={header} eventKey={i}>
						<ListGroup fill>
							<ListGroupItem>
								<Button>Focus</Button>
								<Button>Edit</Button>
								<Button>Delete</Button>
							</ListGroupItem>
							<ListGroupItem>
								<ListGroup fill>
									{panelContent}
					    		</ListGroup>
							</ListGroupItem>
					    </ListGroup>
					</Panel>
				);
			} else {
				// We are generating the Anchor Panel

				// Content of the panels inside each Anchor panel, wich consist of the Mobiles at range
				var panelContent = [];
				let mobilesAtRange = this.getMobilesAtRange(wino);

				for(j in mobilesAtRange){

					var mobile = this.props.winos.get(getRealWinoId(this.props.winos, mobilesAtRange[j]));
					
					var mobileColor = {
						backgroundColor: mobile.get('color'),
						height: "2px",
						width: "33%",
					}

					panelContent.push(
						<br/>,
						<div style={mobileColor}>&nbsp;</div>,
						<ListGroupItem>
							<Grid>
								<Row className="show-grid">
									<Col xs={4} md={4}>
										<strong>Mobile n°</strong>{mobile.get('id')}
									</Col>
									<Col xs={4} md={4}>
										<strong>Distance: </strong>{wino.get('radius').get(mobilesAtRange[j])}
									</Col>
									<Col xs={4} md={4}>
										<strong>x,y: </strong>{mobile.get('x')}, {mobile.get('y')}
									</Col>
								</Row>
							</Grid>
						</ListGroupItem>
					);
				}

				let header = "Anchor - " + wino.get('x') + " , "+wino.get('y');
				anchorPanels.push(
					<br/>,
					<div style={winoColor}>&nbsp;</div>,
					<Panel header={header} eventKey={i}>
						<ListGroup fill>
							<ListGroupItem>
								<Button>Focus</Button>
								<Button>Edit</Button>
								<Button>Delete</Button>
							</ListGroupItem>
							<ListGroupItem>
								<ListGroup fill>
									{panelContent}
					    		</ListGroup>
							</ListGroupItem>
					    </ListGroup>
					</Panel>
				);
			}
		}

		return [mobilePanels, anchorPanels];
	}

	render() {

		var panels = this.getPanels();

		return (
			<Tabs defaultActiveKey={1}>
				<Tab eventKey={1} title="Mobiles">
					<Accordion>
						{panels[0]}
					</Accordion>
				</Tab>
				<Tab eventKey={2} title="Anchor">
					<Accordion>
						{panels[1]}
					</Accordion>
				</Tab>
			</Tabs>
		);
	}
}