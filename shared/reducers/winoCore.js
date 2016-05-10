//State :
/*
var example = Map({
	winos: Map({
		List.of(
			Map({
				id: 5,
				x: 5,
				y: 5,
				main: false
				radius: Map({
					3: 0.2,
					6: 2
				})
			}),
			Map({
				id:3,
				x: 8,
				y: 1,
				main: true
				radius: Map({})
			}),
			Map({
				id: 6,
				x: 1,
				y: 3,
				main: true
				radius: Map({})
			})
		)
	}),
	options: Map({
		scale: Map({
			ratio: List.of(5.4,8.2),
			offset: List.of(100,235)
		}),
		precisionMode: "point"
	}),
	event: Map({
		type: 'scale',
		data: Map({
			firstPoint: '',
			secondPoint: ''
		})
	})
});*/

import {List, Map, toJSON} from 'immutable';

/**
* Return the position in the "winos" list of a wino
* @param: state Map store the state of the application
* @param: idToFind integer id attribute of the wino
*/
function getRealWinoId(state, idToFind){
	var length = state.size;
	for(var i=0;i<state.size;i++){
		if(state.get(i).get("id") == idToFind){
			return i;
		}
	}
}

/**
* Define a list of winos in the state.
* @param: state Map store the state of the application
* @param: winos List the winos
*/
export function setWinos(state, winos, options = Map({
													offset: List(0,0),
													ratio: List(1,1)
})){
	//update each winos coordinates depending on the scale.
	let nextState = winos;
	for(var i=0;i<winos.size;i++){
		nextState = nextState.withMutations(map => {
			map.updateIn([i,'x'], newX => newX = (newX * options.getIn(['ratio', 0])) + options.getIn(['offset', 0]))
				.updateIn([i,'y'], newY => newY = (newY * options.getIn(['ratio', 1])) + options.getIn(['offset', 1]))
		});
		for(var id in nextState.getIn([i,'radius']).toJS()){
			nextState = nextState.updateIn([i,'radius',id], radius => radius = (radius * options.getIn(['ratio', 0])));
		}
		
	}
	/*console.log('--- SETWINOS ---');
	console.log(nextState.toJSON());*/
  	return nextState;
}



/**
* Add a new wino in the state.
* @param: state Map store the state of the application

*/
export function addWino(state, wino) {
	return state.push(wino);
}


/**
* Deletes a wino from the state.
* @param: state Map store the state of the application
* @param: idToDelete integer id of the wino to delete
*/
export function delWino(state, idToDelete){
	return state.delete(getRealWinoId(state, idToDelete));
}

/**
* Change the X and Y values of a wino.
* @param: state Map store the state of the application
* @param: idToMove integer id of the wino to move
* @param: x integer x coordinate
* @param: y integer y coordinate
*/
export function moveWino(state, idToMove, newX, newY, options = Map({
																	ratio: List.of(1,1),
																	offset: List.of(0,0)
																	}))
																{
	let realX = (newX * options.getIn(['ratio', 0])) + options.getIn(['offset', 0]);
	let realY = (newY * options.getIn(['ratio', 1])) + options.getIn(['offset', 1]);

	return state.withMutations(map => {
		map.setIn([getRealWinoId(state, idToMove), "x"], realX)
			.setIn([getRealWinoId(state, idToMove), "y"], realY);
	});
	return state;
}

/**
* Set the state of a wino as main.
* @param: state Map store the state of the application
* @param: id integer of the wino to define.
*/
export function setMainWino(state, id){
	var nextState = state;
	nextState = nextState.setIn([getRealWinoId(state,id), 'main'], true);
	return nextState;
}

/**
* Set the state of a wino as an anchor.
* @param: state Map store the state of the application
* @param: id integer of the wino to define.
*/
export function setAnchorWino(state, id){
	var nextState = state;
	nextState = nextState.setIn([getRealWinoId(state,id), 'main'], false);
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
