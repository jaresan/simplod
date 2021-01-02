import * as YasguiState from '@@app-state/yasgui/state';
import * as SolidState from '@@app-state/solid/state';
import {entityTypes} from '@@constants/entityTypes';
import { view } from 'ramda';
const { limit, dirty, limitEnabled, lastSave, labelsLoadingProgress, language, showHumanReadable, classes } = require('@@app-state/model/state');
const { avatar, session, webId, folderUriChanging } = require('@@app-state/solid/state');

export const getModel = state => state.model;

export const getViewSelection = appState => {
  const {entities} = appState.model.toJS();

  return Object.entries(entities).reduce((acc, [key, val]) => {
    const selected = Object.entries(val).reduce((acc2, [key, entity]) => entity.selected ? Object.assign(acc2, {[key]: entity}) : acc2, {});
    return Object.assign(acc, {[key]: selected});
  }, {});
};

export const getSelectedData = appState =>
  appState.model.getIn(['entities', entityTypes.class]).filter(e => e.get('selected')).toJS();

export const getProperties = (appState) => appState.model.getIn(['entities', entityTypes.property]);
export const getProperty = (appState, id) => appState.model.getIn(['entities', entityTypes.property, id]);
export const getEntities = view(classes);
export const getEntityById = (appState, id) => appState.model.getIn(['entities', entityTypes.class, id]);
export const getPropertyIdsByEntityId = (appState, id) => appState.model.getIn(['entities', entityTypes.class, id, 'propertyIds'])
export const getShowHumanReadable = view(showHumanReadable);

export const getSelectedProperties = appState => appState.model.getIn(['entities', entityTypes.property]).filter(e => e.get('selected')).toJS();
export const getSelectedEntities = appState => appState.model.getIn(['entities', entityTypes.class]).filter(e => e.get('selected')).toJS();
export const getInfo = appState => {
  const model = appState.model;
  return {
    selectionOrder: model.get('selectionOrder').toJS(),
    limit: model.get('limit'),
    limitEnabled: model.get('limitEnabled')
  }
}

export const getUser = view(webId);
export const getDirty = view(dirty);
export const getLanguage = view(language);
export const getLoadingHumanReadable = view(labelsLoadingProgress);
export const getLimit = view(limit);
export const getLimitEnabled = view(limitEnabled);
export const getAvatar = view(avatar);
export const getLastSave = view(lastSave);

export const getFolderUri = (appState, original) => {
  const folderUri = view(SolidState.folderUri, appState);
  if (original) {
    return folderUri;
  }
  let uri = folderUri || '/';
  if (uri[uri.length - 1] !== '/') {
    uri = uri + '/';
  }

  return uri;
};

export const getFolderUriChanging = view(folderUriChanging);

export const getFiles = view(SolidState.files);

export const getQuery = view(YasguiState.query);
export const getEndpoint = view(YasguiState.endpoint);
export const getSimpleQuery = view(YasguiState.simpleQuery);
export const getPrefixes = view(YasguiState.prefixes);
