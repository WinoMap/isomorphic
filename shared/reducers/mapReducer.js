import {Map, List, fromJS} from 'immutable';
import {setWinos, addWino, delWino, editWino, toggleTypeWino,
togglePrecision, setScale, setOptions, apiRequest,
setEvent, setEventData, eventStart } from './winoCore';

function winos(state = List(), action, optionState){
  switch(action.type){
    case 'GET_WINOS':
      return setWinos(state, fromJS(action.res.data), optionState.get('scale'));
    case 'ADD_WINO':
      return addWino(state, action.wino);
    case 'DEL_WINO':
      return delWino(state, action.id);
    case 'TOGGLE_TYPE_WINO':
      return toggleTypeWino(state, action.id);
    case 'EDIT_WINO':
      return editWino(state, action.id, action.params);
  }
  return state;
}

function options(state = Map(), action){
  switch(action.type){
    case 'SET_OPTIONS':
      return setOptions(state, action.options);
    case 'TOGGLE_PRECISION':
      return togglePrecision(state);
    case 'SET_SCALE':
      return setScale(state, action.firstPoint, action.secondPoint);
  }
  return state;
}

function event(state = Map(), action){
  switch(action.type){
    case 'SET_EVENT_DATA':
      return setEventData(state, action.action);
    case 'EVENT_START':
      return eventStart(state, action.eventType);

    //
    case 'SET_SCALE':
      return setEventData(state, {type: 'NONE'});
  }
  return state;
}

export default function reducer(state = Map(), action) {
  return Map({
    options: options(state.get('options'), action),
    event: event(state.get('event'), action),
    winos: winos(state.get('winos'), action, state.get('options'))
  });
}