import { combineReducers } from 'redux';
import solid from './solid';
import model from './model';

export default combineReducers({
	solid,
	yasgui: (s = require('@@app-state/yasgui/state').initial) => s,
	model
});
