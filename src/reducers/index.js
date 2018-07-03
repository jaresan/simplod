import { combineReducers } from 'redux';
import yasgui from './yasgui';
import graphModel from './graphModel';

export default combineReducers({
	yasgui,
	graphModel
});
