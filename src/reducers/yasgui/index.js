import { fromJS } from 'immutable';
import Actions from 'src/actions/yasgui';

const initialState = new fromJS({
	prefixes: {}
});

const setPrefixes = (state, {prefixes}) => state.set('prefixes', fromJS(prefixes));

const handlers = {
	[Actions.Types.R_SET_PREFIXES]: setPrefixes
};

export default (state = initialState, action) => {
	if (typeof handlers[action.type] === 'function') {
		return handlers[action.type](state, action);
	}

	return state;
};
