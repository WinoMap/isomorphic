import React                  from 'react';
import { bindActionCreators } from 'redux';
import * as MapActions        from '../actions/MapActions';
import { connect }            from 'react-redux';
import { createD3Chart, updateD3Chart } from './d3Chart';
import * as actionCreators from '../actions/MapActions';

@connect(state => ({
    winos: state.get('winos'),
    options: state.get('options'),
    event: state.get('event') }))

export default class Home extends React.Component {
  componentDidMount() {
    var el = ReactDOM.findDOMNode(this);
    createD3Chart(el, {}, this.getChartState());
  }

  componentDidUpdate() {
    if(this.props.options.getIn(['scale','ratio']) != [1,1]){
      var el = ReactDOM.findDOMNode(this);
      updateD3Chart(el, this.getChartState());
    }
  }

  getWinos() {
    return this.props.winos || []
  }

  getEvents() {
    return this.props.event || {}
  }

  getOptions() {
    return this.props.options || {}
  }

  getMainWinos() {
    let result = [];
    for(var i=0; i<this.getWinos().size; i++){
      if(this.getWinos().get(i).get('main') == true){
        result.push(this.getWinos().get(i));
      }
    }
    return result;
  }

  getAnchorWinos() {
    let result = [];
    for(var i=0; i<this.getWinos().size; i++){
      if(this.getWinos().get(i).get('main') == false){
        result.push(this.getWinos().get(i));
      }
    }
    return result;
  }

  getPrecision() {
    return this.props.options.get('precision') || 1;
  }

  isScaleDefined() {

    //Can't compare this.props.options.getIn(['scale', 'ratio']) == [1,1], why ?
    if(this.props.options.getIn(['scale', 'ratio','0']) == 1
      && this.props.options.getIn(['scale', 'ratio','1']) == 1){
      return false;
    }else{
      return true;
    }
  }

  getChartState() {
    return {
      //Warning, precisionDifference only translate by the X ratio
      mainWinos: this.getMainWinos(),
      onMapClick: this.props.setEventData,
      options: this.getOptions(),
      anchorWinos: this.getAnchorWinos(),
      event: this.getEvents(),
      precision: this.getPrecision(),
      isScaleDefined: this.isScaleDefined(),
      setMainWino: this.props.setMainWino,
      setAnchorWino: this.props.setAnchorWino
    };
  }

  //Generate the buttons of the menu
  getButtons(){
    if(this.getEvents() != {}){
      if(this.getEvents().get('type') == 'scale'){
        //If we are using the Scale tool
        if(this.getEvents().get('data').get('secondPoint') != ''){
          //If the second point is placed
          const firstPoint = this.getEvents().getIn(['data','firstPoint']);
          const secondPoint = this.getEvents().getIn(['data','secondPoint']);
          return (<button onClick={() => this.props.setScale(firstPoint, secondPoint)}>Confirm Scale</button>);
        }
      }
    }
  }

  render() {
    return (
      <div app_container>
        <div buttonContainer>
          <button onClick={() => this.props.togglePrecision()}>DisplayMode Toggle</button>
          <button onClick={() => this.props.eventStart('scale')}>Scale tool</button>
              {this.getButtons()}
        </div>
        <div className="Chart">
        </div>
      </div>
    );
  }
}