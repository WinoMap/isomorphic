import request from 'axios';

const GETWINO_URL = 'http://localhost:8079/getWinos';

//Winos actions
export function getWinos() {
	return {
		type: 'GET_WINOS',
		promise: request.get(GETWINO_URL)
	};
}

export function editWino(id, params) {
	return {
		type: 'EDIT_WINO',
		id,
		params
	}
}

export function addWino(wino) {
	return {
		type: 'ADD_WINO',
		wino
	};
}

export function delWino(id) {
	return {
		type: 'DEL_WINO',
		id
	};
}

export function toggleTypeWino(id){
	return {
		type: 'TOGGLE_TYPE_WINO',
		id
	}
}

//Options actions
export function setOptions(options) {
	return {
		type: 'SET_OPTIONS',
		options
	};
}

export function togglePrecision() {
	return {
		type: 'TOGGLE_PRECISION'
	};
}

export function setScale(firstPoint, secondPoint) {
	return {
		type: 'SET_SCALE',
		firstPoint,
		secondPoint
	};
}

export function setEventData(action) {
	return {
		type: 'SET_EVENT_DATA',
		action
	};
}

export function eventStart(eventType) {
	return {
		type: 'EVENT_START',
		eventType
	};
}