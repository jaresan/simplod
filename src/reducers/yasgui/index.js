import { fromJS } from 'immutable';
import Actions from 'src/actions/yasgui';

const initialState = new fromJS({
	prefixes: {},
	endpoint: '',
	query: '',
	simpleQuery: ''
});

const setPrefixes = (state, {prefixes}) => state.set('prefixes', fromJS(prefixes));
const setQuery  = (state, {query}) => state.set('query', query);
const setEndpoint = (state, {endpoint}) => state.set('endpoint', endpoint);
const setSimpleQuery = (state, {query}) => state.set('simpleQuery', query);

const handlers = {
	[Actions.Types.R_SET_PREFIXES]: setPrefixes,
	[Actions.Types.R_UPDATE_QUERY]: setQuery,
	[Actions.Types.R_SET_ENDPOINT]: setEndpoint,
	[Actions.Types.R_SET_SIMPLE_QUERY]: setSimpleQuery
};

export default (state = initialState, action) => {
	if (typeof handlers[action.type] === 'function') {
		return handlers[action.type](state, action);
	}

	return state;
};
