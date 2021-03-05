import { set, curry, compose, view, pipe } from 'ramda';
import { createStore } from 'redux';
import { middleware as modelMiddleware } from '@@app-state/model/state';
import { middleware as yasguiMiddleware } from '@@app-state/yasgui/state';
import { initial } from '@@app-state/initial';

const fn = Symbol('function');

let middleware = compose;

// if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
// 	middleware = window.__REDUX_DEVTOOLS_EXTENSION__();
// }

export const compare = curry((oldState, newState, lens) => view(lens, oldState) === view(lens, newState));

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

		return pipe(modelMiddleware(oldState), yasguiMiddleware(oldState))(s);
	},
	initial,
	middleware
);

export const dispatch = f => store.dispatch({type: fn, fn: f});
export const dispatchSet = curry((ln, v) => dispatch(set(ln, v)));
export const getState = () => store.getState();
Object.assign(window, {dispatch, getState});
