import { fromJS } from 'immutable';
import Actions from 'src/actions';
import { parseSPARQLQuery } from 'src/utils';

const initialState = new fromJS({
	query: '',
	prefixes: {}
});

const Types = Actions.Types;
export default (state = initialState, action) => {
	switch (action.type) {
		case Types.r_updateQuery:
			const { classes, prefixes } = action.payload;
			const newQuery = parseSPARQLQuery({ classes, prefixes });
			return state.set('query', newQuery);
		case Types.r_setPrefixes:
			return state.set('prefixes', action.payload);
		default:
			return state;
	}
}