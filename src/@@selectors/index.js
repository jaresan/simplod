import * as YasguiState from '@@app-state/yasgui/state';
import * as SolidState from '@@app-state/solid/state';
import * as ModelState from '@@app-state/model/state';
import {view} from 'ramda';
export const getPropertyById = (id, s) => view(ModelState.propertyById(id), s);
export const getClassById = (id, s) => view(ModelState.classById(id), s);

export const getSelectedClasses = ModelState.getSelectedClasses;
export const getViewSelection = ModelState.getSelectedEntities;

export const getProperties = view(ModelState.properties);
export const getEntities = view(ModelState.entities);
export const getClasses = view(ModelState.classes);
export const getShowHumanReadable = view(ModelState.showHumanReadable);
export const getSelectionOrder = view(ModelState.selectionOrder);
export const getDirty = view(ModelState.dirty);
export const getLanguage = view(ModelState.language);
export const getLoadingHumanReadable = view(ModelState.labelsLoadingProgress);
export const getLimit = view(ModelState.limit);
export const getLimitEnabled = view(ModelState.limitEnabled);
export const getLastSave = view(ModelState.lastSave);

export const getFolderUriChanging = view(SolidState.folderUriChanging);
export const getFiles = view(SolidState.files);
export const getUser = view(SolidState.webId);
export const getAvatar = view(SolidState.avatar);
export const getFolderUri = view(SolidState.folderUri);

export const getQuery = view(YasguiState.query);
export const getEndpoint = view(YasguiState.endpoint);
export const getSimpleQuery = view(YasguiState.simpleQuery);
export const getPrefixes = view(YasguiState.prefixes);