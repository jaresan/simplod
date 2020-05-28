import {createSelector} from 'reselect';
import entityTypes from 'src/constants/entityTypes';

export const getViewSelection = appState => {
  const { selected: { objects, properties } } = appState.graphModel.toJS();

  return {
    objectIds: Object.keys(objects),
    properties: properties
  }
};

export const getSelectedData = appState =>
  appState.model.getIn(['entities', entityTypes.class]).filter(e => e.get('selected')).toJS();

export const getPrefixes = appState => appState.yasgui.get('prefixes');

export const getSelectedProperties = appState => appState.model.getIn(['entities', entityTypes.property]).filter(e => e.get('selected')).toJS();

export const getSession = appState => appState.solid.get('session');

export const getDirty = appState => appState.graphModel.get('dirty');

export const getFolderUri = (appState, original) => {
  if (original) {
    return appState.solid.get('folderUri');
  }
  let uri = appState.solid.get('folderUri') || '/';
  if (uri[uri.length - 1] !== '/') {
    uri = uri + '/';
  }

  return uri;
};

export const getFolderUriChanging = appState => appState.solid.get('folderUriChanging');

export const getViews = appState => appState.solid.get('views');

export const getSelectedDataAndPrefixes = createSelector(
	getSelectedData,
	getPrefixes,
	(classes, prefixes) => ({ classes, prefixes })
);
