import {fromJS} from 'immutable';

const json = require('./initialState.json');

export const initialState = Object.entries(json).reduce((acc, [rootKey, val]) => Object.assign(acc, {[rootKey]: fromJS(val)}), {});
