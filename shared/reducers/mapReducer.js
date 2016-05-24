import { Map, List, fromJS } from 'immutable';
import { setWinos, addWino, delWino, editWino, toggleTypeWino,
togglePrecision, setScale, setOptions, apiRequest,
setEvent, setEventData, eventStart,
UItoggleAdvanced, UIcolorChange, UIeditWino, UIvalidateEditWino } from './winoCore';

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
    case 'VALIDATE_EDIT_WINO':
      return editWino(state, action.newValues);
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

function ui(state = Map(), action, winoState){
  switch(action.type){
    case 'UI_TOGGLE_ADVANCED':
      return UItoggleAdvanced(state);
    case 'UI_EDIT_WINO':
      return UIeditWino(state, action, winoState);
    case 'UI_COLOR_CHANGE':
      return UIcolorChange(state, action);
    case 'VALIDATE_EDIT_WINO':
      return UIvalidateEditWino(state);
  }
  return state;
}

export default function reducer(state = Map(), action) {
  var nextState = Map({
    options: options(state.get('options'), action),
    event: event(state.get('event'), action),
    winos: winos(state.get('winos'), action, state.get('options')),
    ui: ui(state.get('ui'), action, state.get('winos')),
  });
  //console.log(nextState.toJSON());
  return nextState;
}