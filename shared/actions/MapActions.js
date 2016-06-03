import request from 'axios';

// Change this to the BackEnd URL when Hosting
const GETWINO_URL = 'http://192.168.77.210:8079/getWinos';

//Winos actions
export function getWinos() {
	return {
		type: 'GET_WINOS',
		promise: request.get(GETWINO_URL),
	};
}

export function editWino(id, params) {
	return {
		type: 'EDIT_WINO',
		id,
		params,
	}
}

export function addWino(wino) {
	return {
		type: 'ADD_WINO',
		wino,
	};
}

export function delWino(id) {
	return {
		type: 'DEL_WINO',
		id,
	};
}

export function toggleTypeWino(id){
	return {
		type: 'TOGGLE_TYPE_WINO',
		id,
	}
}

export function toggleDisplayWino(id){
	return {
		type: 'TOGGLE_DISPLAY_WINO',
		id,
	}
}

//Options actions
export function setOptions(options) {
	return {
		type: 'SET_OPTIONS',
		options,
	};
}

export function togglePrecision() {
	return {
		type: 'TOGGLE_PRECISION',
	};
}

export function setScale(firstPoint, secondPoint) {
	return {
		type: 'SET_SCALE',
		firstPoint,
		secondPoint,
	};
}

export function setEventData(action) {
	return {
		type: 'SET_EVENT_DATA',
		action,
	};
}

export function eventStart(eventType) {
	return {
		type: 'EVENT_START',
		eventType,
	};
}

//UI events

export function UItoggleAdvanced() {
	return {
		type: 'UI_TOGGLE_ADVANCED',
	};
}

export function UItoggleSettings() {
	return {
		type: 'UI_TOGGLE_SETTINGS',
	};
}

export function UIeditWino(id) {
	console.log(id);
	return {
		type: 'UI_EDIT_WINO',
		id,
	};
}

export function UIcolorChange(color) {
	return {
		type: 'UI_COLOR_CHANGE',
		color,
	};
}

export function validateEditWino(newValues = {}) {
	return {
		type: 'VALIDATE_EDIT_WINO',
		newValues,
	}
}

export function validateSettings(newValues = {}) {
	return {
		type: 'VALIDATE_SETTINGS',
		newValues,
	}
}

export function cancelSettings(newValues = {}) {
	return {
		type: 'UI_TOGGLE_SETTINGS',
	}
}

export function cancelEditWino(newValues = {}) {
	return {
		type: 'UI_CANCEL_EDIT_WINO',
	}
}
