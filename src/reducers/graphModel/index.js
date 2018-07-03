import { fromJS, Map } from 'immutable';
import Actions from 'src/actions';
import { defaultHighlighter } from 'src/constants/jointjs';

const initialState = new fromJS({
	objects: {},
	selectedObjects: {}
});

const Types = Actions.Types;
export default (state = initialState, action) => {
	switch (action.type) {
		case Types.r_deselectAll:
			state.get('selectedObjects').forEach(cellView => {
				cellView.unhighlight(null, defaultHighlighter)
			});
			return state.set('selectedObjects', new Map());
		case Types.r_selectCell:
			const { cellView } = action.payload;
			cellView.highlight(null, defaultHighlighter);
			console.log(cellView);
			return state.setIn(['selectedObjects', cellView.model.id], cellView);
		default:
			return state;
	}
};
