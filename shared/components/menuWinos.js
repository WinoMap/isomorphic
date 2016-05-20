import React from 'react';
import { getRealWinoId } from '../reducers/winoCore';
import { Button, Panel, Accordion, Tabs, Tab, ListGroup, ListGroupItem } from 'react-bootstrap';
// import style from '../res/css/style';

export default class MenuWinos extends React.Component {

	/**
	* generate the panels with the list of Winos and Anchors
	*
	*/
	getPanels() {
		var anchorPanels = [];
		var mobilePanels = [];
		for(let i=0; i<this.props.winos.size;i++){
			let wino = this.props.winos.get(i);
			var winoColor = {
				backgroundColor: wino.get('color'),
				height: "2px",
				width: "100%",
			}

			if(wino.get('main') == true){
				// Title of the panel
				let header = "Mobile n°"+ wino.get('id') +" - " + wino.get('x') + " , "+wino.get('y');

				mobilePanels.push(
					<Panel header={header} eventKey={i}>

					</Panel>
				);
			} else {
				//We are generating the Anchor Panel

				// Title of the panel
				let header = "Anchor - " + wino.get('x') + " , "+wino.get('y');

				// Content of the panel, wich consist of the Mobiles at range
				var panelContent= [];
				let mobilesAtRange = this.getMobilesAtRange(wino);
				for(var j=0; j<mobilesAtRange.length;j++){


					var mobileColor = {
						backgroundColor: mobile.get('color'),
						height: "2px",
						width: "100%",
					}

					var mobile = this.props.winos.get(getRealWinoId(this.props.winos, mobilesAtRange[j]));

					console.log(mobilesAtRange[j]);
					// console.log(mobile);
					// console.log(mobile.toJSON());
					// Title of the inner panel
					let innerHeader = "Mobile n°"+ mobile.get('id') +" - " + wino.get('radius').get(mobilesAtRange[j]);
					// let innerHeader = ""
					// Content of the inner panel
					let innerContent = mobile.get('x') + " , " + mobile.get('y');

					panelContent.push(
						<Panel header={innerHeader} eventKey={mobile.get('id')}>
							{innerContent}
						</Panel>
					);
				}

				anchorPanels.push(
					<br/>,
					<div style={winoColor}>&nbsp;</div>,
					<Panel header={header} eventKey={i}>
						<ListGroup fill>
							<ListGroupItem>
							</ListGroupItem>
							<ListGroupItem>
								<Button>Edit Wino</Button>
								<Button>Delete Wino</Button>
							</ListGroupItem>
							<ListGroupItem>
								<Accordion>
									{panelContent}
								</Accordion>
							</ListGroupItem>
					    </ListGroup>
					</Panel>
				);
			}
		}

		return [mobilePanels, anchorPanels];
	}

	getMobilesAtRange(wino) {
		var keys = [];
		for(var key in wino.get('radius').toJSON()){
			keys.push(key);
		}
		return keys;
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