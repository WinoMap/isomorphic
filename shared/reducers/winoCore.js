import {List, Map, toJSON} from 'immutable';
import axios from 'axios';

const PUSHWINO_URL = 'http://localhost:8079/pushWinos';

/**
* Return the position in the "winos" list of a wino
* @param: state Map store the state of the application
* @param: idToFind integer id attribute of the wino
*/
export function getRealWinoId(state, idToFind){
	var length = state.size;
	for(var i=0;i<state.size;i++){
		if(state.get(i).get("id") == idToFind){
			return i;
		}
	}
}

/**
* Allows to push the wino state to the back-end server
* @param state Map state to send
*/
function pushDataToBackEnd(state){

	axios.post(PUSHWINO_URL,
    	JSON.stringify(state.toJSON()), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response) {
        console.log(response);
    });
}

/**
* Define a list of winos in the state.
* @param: state Map store the state of the application
* @param: winos List the winos
*/
export function setWinos(state, winos, options = Map({
													offset: List.of(0,0),
													ratio: List.of(1,1)
})){
	//update each winos coordinates depending on the scale.
	let nextState = winos;
	for(var i=0;i<winos.size;i++){
		nextState = nextState.withMutations(map => {
			map.setIn([i,'scaledX'], map.getIn([i,'x']))
				.setIn([i,'scaledY'], map.getIn([i,'y']))
				.updateIn([i,'scaledX'], newX => newX = (newX * options.getIn(['ratio', 0])) + options.getIn(['offset', 0]))
				.updateIn([i,'scaledY'], newY => newY = (newY * options.getIn(['ratio', 1])) + options.getIn(['offset', 1]))
		});
		
		for(var id in nextState.getIn([i,'radius']).toJS()){
			nextState = nextState.setIn([i,'scaledRadius',id], state.getIn([i,'radius',id]));
			nextState = nextState.updateIn([i,'scaledRadius',id], radius => radius = (radius * options.getIn(['ratio', 0])));
		}
		
	}
  	return nextState;
}



/**
* Add a new wino in the state.
* @param: state Map store the state of the application

*/
export function addWino(state, wino) {
	let nextState = state.push(wino);

	pushDataToBackEnd(nextState);
	return nextState;
}


/**
* Deletes a wino from the state.
* @param: state Map store the state of the application
* @param: idToDelete integer id of the wino to delete
*/
export function delWino(state, idToDelete){
	let nextState = state.delete(getRealWinoId(state, idToDelete));

	pushDataToBackEnd(nextState);
	return nextState;
}

/**
* Set the state of a wino as mobile or anchor.
* @param: state Map store the state of the application
* @param: id integer of the wino to define.
*/
export function toggleTypeWino(state, id){
	let nextState = state;
	if(state.getIn([getRealWinoId(state,id),'main']) == false){
		nextState = nextState.setIn([getRealWinoId(state,id), 'main'], true);
	} else {
		nextState = nextState.setIn([getRealWinoId(state,id), 'main'], false);
	}

	pushDataToBackEnd(nextState);
	return nextState;
}

/**
* Set the new values of a wino, by merging with old ones
* @param: state Map store the state of the application
* @param: id integer Wino to modify
* @param: newValues Map the new values
*/
export function editWino(state, newValues){
	//Merge the winos with corresponding id
	let nextWino = state.get(getRealWinoId(state, newValues.id)).merge(newValues);
	//Insert it in the state
	let nextState = state.set(getRealWinoId(state, newValues.id), nextWino);

	pushDataToBackEnd(nextState);
	return nextState;
}

//=== OPTIONS


/**
* Define a list of options in the state.
* @param: state Map store the state of the application
* @param: options Map the options
*/
export function setOptions(state, options) {
  	return options;
}

/**
* Change the precision mode, "circle" or "point"
* @param: state Map store the state of the application
*/
export function togglePrecision(state){
	if(state.get('precisionMode') == 'point'){
		return state.set('precisionMode', 'circle');
	}else{
		return state.set('precisionMode', 'point');
	}
}

/**
* Change the scale of the plan from two points, the first one placed at [0,0]
* and the second one at [1,1]
* @param: state Map store the state of the application
* @param: firstPoint List first point
* @param: secondPoint List second point
*/
export function setScale(state, firstPoint, secondPoint){
	return state.set('scale', generateScaleMap(firstPoint, secondPoint));
}

/**
* Generate a map with offset and ratio
* @param: firstPoint List first point
* @param: secondPoint List second point
*/
function generateScaleMap(firstPoint, secondPoint){
	let offsetX = firstPoint.get(0);
	let offsetY = firstPoint.get(1);
	let ratioX = secondPoint.get(0)-firstPoint.get(0);
	let ratioy = secondPoint.get(1)-firstPoint.get(1);
	return Map({
		offset: List.of(offsetX, offsetY),
		ratio: List.of(ratioX, ratioy)
	});
}


//=== EVENTS


/**
* Manage what to do on the Event depending of the action
* @param: state Map store the state of the application
* @param: data string the action to handle
*/
export function setEventData(state, action) {
    let nextState
	switch(action.type){
		//If the map is clicked
	    case 'MAP_CLICK':
	    	//if the event scale is ongoing
	    	if(state.get('type') == 'scale'){
	    		//Test if we are defining the first or second point
	    		if(state.getIn(['data','firstPoint']) == ''){
	    			nextState = state.setIn(['data','firstPoint'], 
	    				List.of(action.x, action.y)
	    			);
					return nextState
	    		}else{
	    			nextState = state.setIn(['data','secondPoint'], 
	    				List.of(action.x, action.y)
	    			);
					return nextState
	    		}
	    	}
	    case 'NONE':
	    	return Map({
	    		type: 'none',
	    		data: Map()
	    	})
	}
	return state;
}

/**
* Start an event with the right parameters
* @param: state Map store the state of the application
* @param: type string type of event
*/
export function eventStart(state, eventType){
	let nextState = state;
	switch(eventType){
	    case 'scale':
	    	nextState = Map({
	    		type: 'scale',
	    		data: Map({
	    			firstPoint: '',
	    			secondPoint: ''
	    		})
	    	});
	}
	return nextState
}

//UI events

/**
* Display or hide the advanced menu elements
* @param: state Map store the state of the application
*/
export function UItoggleAdvanced(state) {
	if(state.get('advancedMenuOn') == true) {
		return state.set('advancedMenuOn', false);
	} else {
		return state.set('advancedMenuOn', true);
	}
}

export function UIeditWino(state, action, winos) {
	let wino = winos.get(getRealWinoId(winos, action.id));
	let nextState = state.set('editedWino', wino);
	return nextState;
}

export function UIvalidateEditWino(state) {
	let nextState = state.set('editedWino', undefined);
	return nextState;
}

export function UIcolorChange(state, action) {
	let nextState = state.setIn(['editedWino','color'], action.color.hex);
	return nextState
}