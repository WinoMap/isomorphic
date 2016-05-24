import React from 'react';
import ReactDOM from 'react-dom';
import { createD3Chart, updateD3Chart } from './d3Chart';


export default class Plan extends React.Component {
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
      mainWinos: this.getMainWinos(),
      onMapClick: this.props.setEventData,
      options: this.getOptions(),
      anchorWinos: this.getAnchorWinos(),
      event: this.props.event,
      precision: this.getPrecision(),
      isScaleDefined: this.isScaleDefined(),
      setMainWino: this.props.setMainWino,
      setAnchorWino: this.props.setAnchorWino
    };
  }

  render() {
    return (
      <div app_container style={this.props.style}>
        <div className="Chart" >
        </div>
      </div>
    );
  }
}