import { createSelector } from 'reselect';

export const getSelectedData = appState =>
	appState.graphModel.getIn(['selected', 'objects']).map(cellView => cellView.model.attributes.classData).toJS();

export const getPrefixes = appState => appState.yasgui.get('prefixes');

export const getSelectedProperties = appState => appState.graphModel.getIn(['selected', 'properties']).toJS();

export const getSelectedDataAndPrefixes = createSelector(
	getSelectedData,
	getPrefixes,
	(classes, prefixes) => ({ classes, prefixes })
);
