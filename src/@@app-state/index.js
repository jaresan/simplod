/**
 * @file Definition of the application state and its root reducer
 * @module @@app-state/index
 */
import { set, curry, compose, pipe } from 'ramda';
import { createStore } from 'redux';
import { middleware as modelMiddleware } from '@@app-state/model/middleware';
import { middleware as yasguiMiddleware } from '@@app-state/yasgui/state';
import { initial } from '@@app-state/initial';

const fn = Symbol('function');

let middleware = compose;

// if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
// 	middleware = window.__REDUX_DEVTOOLS_EXTENSION__();
// }

/**
 * Definition of the store with the root reducer.
 * @type {Store<*, Action>}
 */
export const store = createStore(
	(s, a) => {
		const oldState = s;
		switch (a.type) {
			case fn:
				s = a.fn(s);
				break;
			default:
				break;
		}

		// Pass through middlewares with old and new states
		return pipe(modelMiddleware(oldState), yasguiMiddleware(oldState))(s);
	},
	initial,
	middleware
);

/**
 * Dispatches a state-altering function
 * @function
 * @param f
 * @returns {{fn, type: symbol}}
 */
export const dispatch = f => store.dispatch({type: fn, fn: f});

/**
 * Dispatches a direct set for given lens and value
 * @function
 * @type {*}
 */
export const dispatchSet = curry((ln, v) => dispatch(set(ln, v)));
export const getState = () => store.getState();
