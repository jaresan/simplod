import { combineReducers } from 'redux';
import yasgui from './yasgui';
import graphModel from './graphModel';
import solid from './solid';
import model from './model';

export default combineReducers({
	yasgui,
	graphModel,
	solid,
	model
});
