import { Map } from 'immutable';
import { defaultHighlighter } from 'src/constants/jointjs';

export const unselectCell = (state, cellView) => {
	const id = cellView.model.id;
	const classData = cellView.model.attributes.classData;
	const cellProperties = classData.methods.concat(classData.properties);

	cellView.unhighlight(null, defaultHighlighter);
	state = state.deleteIn(['selected', 'objects', id]);

	const selectedProperties = state.getIn(['selected', 'properties']);
	cellProperties.forEach(prop => {
		const existingProp = selectedProperties.get(prop.predicate);
		if (existingProp.get('count') - 1 === 0) {
			state = state.deleteIn(['selected', 'properties', prop.predicate]);
		} else {
			state = state.setIn(['selected', 'properties', prop.predicate, 'count'], existingProp.get('count') - 1);
		}
	});

	return state;
};

export const selectCell = (state, cellView) => {
	const id = cellView.model.id;
	const classData = cellView.model.attributes.classData;
	const cellProperties = classData.methods.concat(classData.properties);

	cellView.highlight(null, defaultHighlighter);

	const selectedProperties = state.getIn(['selected', 'properties']);
	cellProperties.forEach(prop => {
		const existingProp = selectedProperties.get(prop.predicate);
		if (!existingProp) {
			const name = prop.predicate.replace(/.*(\/|#)/, '');
			state = state.setIn(['selected', 'properties', prop.predicate], new Map({
				name,
				optional: true,
				show: true,
				count: 1
			}));
		} else {
			state = state.setIn(['selected', 'properties', prop.predicate, 'count'], existingProp.get('count') + 1);
		}
	});

	return state.setIn(['selected', 'objects', id], cellView);
};
