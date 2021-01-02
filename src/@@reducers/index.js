import { combineReducers } from 'redux';
import model from './model';

export default combineReducers({
	solid: (s = require('@@app-state/solid/state').initial) => s,
	yasgui: (s = require('@@app-state/yasgui/state').initial) => s,
	model
});
