import { fromJS, Map } from 'immutable';
import Actions from 'src/actions/interactions';

const initialState = new fromJS({
	selected: {
		objects: {},
		properties: {}
	},
	dirty: true
});

const Types = Actions.Types;
const getNewState = (state = initialState, action) => {
	switch (action.type) {
    case Types.R_VIEW_LOADED: {
      const { json } = action;

      state = state
        .setIn(['selected', 'objects'], new Map())
        .setIn(['selected', 'properties'], new Map());

      return state
        .setIn(['selected', 'properties'], fromJS(json));
    }

		default:
			return state;
	}
};

export default (state = initialState, action) => {
  const newState = getNewState(state, action);

  if (newState.getIn(['selected', 'objects']).size) {
    return newState.set('dirty', true)
  } else {
    return newState.set('dirty', false)
  }
};
