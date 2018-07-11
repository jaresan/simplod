import { fromJS, Map } from 'immutable';
import Actions from 'src/actions';
import { defaultHighlighter } from 'src/constants/jointjs';
import { unselectCell, selectCell } from './cell';

const initialState = new fromJS({
	objects: {},
	selected: {
		objects: {},
		properties: {}
	}
});

const Types = Actions.Types;
export default (state = initialState, action) => {
	switch (action.type) {
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

		default:
			return state;
	}
};
