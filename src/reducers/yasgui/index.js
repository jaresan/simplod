import { fromJS } from 'immutable';
import Actions from 'src/actions';

const initialState = new fromJS({
	prefixes: {}
});

const Types = Actions.Types;
export default (state = initialState, action) => {
	switch (action.type) {
		case Types.r_setPrefixes:
			return state.set('prefixes', action.payload);
		default:
			return state;
	}
}