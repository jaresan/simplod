import { fromJS, Map } from 'immutable';
import Actions from 'src/actions/interactions';

const initialState = new fromJS({
	cellViews: {},
	selected: {
		objects: {},
		properties: {}
	},
	dirty: true
});

const Types = Actions.Types;
const getNewState = (state = initialState, action) => {
	switch (action.type) {
		case Types.R_TOGGLE_OPTIONAL: {
			const {id, optional} = action;
			return state.setIn(['selected', 'properties', id, 'optional'], optional);
		}

		case Types.R_TOGGLE_SHOW: {
			const {id, show} = action;
			return state.setIn(['selected', 'properties', id, 'show'], show);
		}

		case Types.R_TOGGLE_DISABLED: {
			const {id, disabled} = action;
			return state.setIn(['selected', 'properties', id, 'disabled'], disabled);
		}

		case Types.R_SAVE_PROPERTY_NAME: {
			const {id, name} = action;
			return state.setIn(['selected', 'properties', id, 'name'], name);
		}

		case Types.R_UNSELECT_PROPERTY: {
			const {id} = action;
			return state.deleteIn(['selected', 'properties', id]);
		}

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
