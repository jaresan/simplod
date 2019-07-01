import { fromJS, Map } from 'immutable';
import Actions from 'src/actions';
import { defaultHighlighter } from 'src/constants/jointjs';
import { unselectCell, selectCell } from './cell';

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
    case Types.r_saveCellViews: {
      return state.set('cellViews', fromJS(action.payload));
    }

		case Types.r_deselectAll: {
			state.getIn(['selected', 'objects']).forEach(cellView => {
				cellView.unhighlight(null, defaultHighlighter)
			});
			return state
				.setIn(['selected', 'objects'], new Map())
				.setIn(['selected', 'properties'], new Map());
		}

		case Types.r_toggleCell: {
			const {cellView} = action.payload;
			const id = cellView.model.id;

			if (state.getIn(['selected', 'objects', id])) {
				return unselectCell(state, cellView);
			} else {
				return selectCell(state, cellView);
			}
		}

		case Types.r_toggleOptional: {
			const {id, optional} = action.payload;
			return state.setIn(['selected', 'properties', id, 'optional'], optional);
		}

		case Types.r_toggleShow: {
			const {id, show} = action.payload;
			return state.setIn(['selected', 'properties', id, 'show'], show);
		}

		case Types.r_toggleDisabled: {
			const {id, disabled} = action.payload;
			return state.setIn(['selected', 'properties', id, 'disabled'], disabled);
		}

		case Types.r_savePropertyName: {
			const {id, name} = action.payload;
			return state.setIn(['selected', 'properties', id, 'name'], name);
		}

		case Types.r_unselectProperty: {
			const id = action.payload.id;
			return state.deleteIn(['selected', 'properties', id]);
		}

    case Types.r_viewLoaded: {
      const { objectIds, properties } = action.payload;

      state.getIn(['selected', 'objects']).forEach(cellView => {
        cellView.unhighlight(null, defaultHighlighter)
      });
      state = state
        .setIn(['selected', 'objects'], new Map())
        .setIn(['selected', 'properties'], new Map());

      for (let objId of objectIds) {
        state = selectCell(state, state.getIn(['cellViews', objId]));
      }

      return state
        .setIn(['selected', 'properties'], fromJS(properties));
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
