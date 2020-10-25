import entityTypes from 'src/constants/entityTypes';

export const getViewSelection = appState => {
  const {entities} = appState.model.toJS();

  return Object.entries(entities).reduce((acc, [key, val]) => {
    const selected = Object.entries(val).reduce((acc2, [key, entity]) => entity.selected ? Object.assign(acc2, {[key]: entity}) : acc2, {});
    return Object.assign(acc, {[key]: selected});
  }, {});
};

export const getSelectedData = appState =>
  appState.model.getIn(['entities', entityTypes.class]).filter(e => e.get('selected')).toJS();

export const getPrefixes = appState => appState.yasgui.get('prefixes').toJS();

export const getSelectedProperties = appState => appState.model.getIn(['entities', entityTypes.property]).filter(e => e.get('selected')).toJS();

export const getSession = appState => {
  const session = appState.solid.get('session')
  return session ? session.toJS() : null;
};

export const getDirty = appState => appState.model.get('dirty');

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

export const getFiles = appState => appState.solid.get('files').toJS();

export const getQuery = appState => appState.yasgui.get('query');
export const getEndpoint = appState => appState.yasgui.get('endpoint');
