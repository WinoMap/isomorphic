import React from 'react';
import { Button, ButtonGroup, Panel } from 'react-bootstrap';

import Header from './header';
import MenuWinos from './menuWinos';
import Plan from './plan';

export default class AppContainer extends React.Component {

	render(){

		return (
			<div>
				<Header {...this.props}/>
				<Plan winos={this.props.winos} options={this.props.options}
					event={this.props.event} setEventData={this.props.setEventData}
					className="planStyle"
				/>
				<ButtonGroup bsClass="buttonBottomStyle btn-group" justified>
					<Button onClick={this.props.UItoggleAdvanced} bsClass="buttonStyle btn"
						bsStyle="primary"
						active={this.props.ui.get('advancedMenuOn')}
					>
						Advanced
					</Button>
					<Button onClick={this.props.UItoggleSettings} bsClass="buttonStyle btn"
						bsStyle="info"
					>
						Settings
					</Button>
				</ButtonGroup>
				<Panel collapsible expanded={this.props.ui.get('advancedMenuOn')}
					bsClass="panelAdvancedStyle panel"
				>
					<div className="panelOverflow">
						<MenuWinos {...this.props}/>
		    		</div>
		        </Panel>
			</div>
		);
	}
}