import { combineReducers } from 'redux';
import yasgui from './yasgui';
import solid from './solid';
import model from './model';

export default combineReducers({
	yasgui,
	solid,
	model
});
