import { fromJS } from 'immutable';
import Actions from 'src/actions/yasgui';

const initialState = new fromJS({
	prefixes: {},
	query: ''
});

const setPrefixes = (state, {prefixes}) => state.set('prefixes', fromJS(prefixes));
const setQuery  = (state, {query}) => state.set('query', query);

const handlers = {
	[Actions.Types.R_SET_PREFIXES]: setPrefixes,
	[Actions.Types.R_UPDATE_QUERY]: setQuery
};

export default (state = initialState, action) => {
	if (typeof handlers[action.type] === 'function') {
		return handlers[action.type](state, action);
	}

	return state;
};
