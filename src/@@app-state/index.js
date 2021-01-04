import {set, curry} from 'ramda';
import { createStore } from 'redux';
import {middleware as modelMiddleware} from '@@app-state/model/state';

const fn = Symbol('function');

let middleware = null;

if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
	middleware = window.__REDUX_DEVTOOLS_EXTENSION__();
}

export const store = createStore(
	(s, a) => {
		switch (a.type) {
			case fn:
				s = a.fn(s);
				break;
			default:
				break;
		}
		return modelMiddleware(s);
	},
	{
		yasgui: require('./yasgui/state').initial,
		solid: require('./solid/state').initial,
		model: require('./model/state').initial,
		settings: require('./settings/state').initial
	},
	middleware
);

export const dispatch = f => store.dispatch({type: fn, fn: f});
export const dispatchSet = curry((ln, v) => dispatch(set(ln, v)));
export const getState = () => store.getState();
