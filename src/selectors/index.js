import { createSelector } from 'reselect';

export const getViewSelection = appState => {
  const { selected: { objects, properties } } = appState.graphModel.toJS();

  return {
    objectIds: Object.keys(objects),
    properties: properties
  }
};

export const getSelectedData = appState =>
	appState.graphModel.getIn(['selected', 'objects']).map(cellView => cellView.model.attributes.classData).toJS();

export const getPrefixes = appState => appState.yasgui.get('prefixes');

export const getSelectedProperties = appState => appState.graphModel.getIn(['selected', 'properties']).toJS();

export const getSession = appState => appState.solid.get('session');

export const getDirty = appState => appState.graphModel.get('dirty');

export const getFolderUri = appState => appState.solid.get('folderUri');

export const getFolderUriChanging = appState => appState.solid.get('folderUriChanging');

export const getViews = appState => appState.solid.get('views');

export const getSelectedDataAndPrefixes = createSelector(
	getSelectedData,
	getPrefixes,
	(classes, prefixes) => ({ classes, prefixes })
);
