import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from '@@sagas/index';
import {set, curry, identity, equals, map, is, fromPairs, toPairs} from 'ramda';
import {stream} from 'kefir';
import {middleware as modelMiddleware} from '@@app-state/model/state';

const fn = Symbol('function');

const sagaMiddleware = createSagaMiddleware();
let middleware = applyMiddleware(sagaMiddleware);

if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
	middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

export const store = createStore(
	(s, a) => {
		switch (a.type) {
			case fn:
				Object.assign(window, {fn: a.fn, s});
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
		model: require('./model/state').initial
	},
	middleware
);

sagaMiddleware.run(sagas);

export const dispatch = f => store.dispatch({type: fn, fn: f});
export const dispatchSet = curry((ln, v) => dispatch(set(ln, v)));
export const getState = () => store.getState();

export const extract = curry((spec, obj) => fromPairs(
	toPairs(spec).map(([key, f]) => [key, is(Function, f) ? f(obj) : extract(f, obj)])
));

const state$ = stream(emit => store.subscribe(() => {
	emit.value(store.getState());
}));

const extractStreamDedupe = (dedupe, extractor) => state$
	.map(extractor || identity)
	.skipDuplicates(dedupe);

export const connect = curry((extractor, setter, Component) => {
	const dispatchBindings = map(f => (...args) => dispatch(f(...args)), setter);
	const initialState = extract(extractor)(store.getState());

	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = initialState;
		}
		componentDidMount() {
			this.subscription = extractStreamDedupe(equals, extract(extractor))
				.observe(s => {
					this.setState(s);
				});
		}

		componentWillUnmount() {
			this.subscription.unsubscribe();
		}

		render() {
			return <Component {...Object.assign({}, this.state, dispatchBindings, this.props)} />;
		}
	}
});
