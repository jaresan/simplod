import * as YasguiState from '@@app-state/yasgui/state';
import * as SolidState from '@@app-state/solid/state';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import * as ControlState from '@@app-state/controls/state';
import { path, view, pipe } from 'ramda';

export const getPropertyById = (id, s) => view(ModelState.propertyById(id), s);
export const getClassById = (id, s) => view(ModelState.classById(id), s);

export const getSelectedClasses = ModelState.getSelectedClasses;
export const getViewSelection = ModelState.getSelectedEntities;

export const getProperties = view(ModelState.properties);
export const getEntities = view(ModelState.entities);
export const getClasses = view(ModelState.classes);
export const getShowHumanReadable = view(SettingsState.showHumanReadable);
export const getSelectionOrder = view(ModelState.selectionOrder);
export const getDirty = view(ModelState.dirty);
export const getFilename = view(ModelState.filename);
export const getEndpoint = view(ModelState.endpoint);
export const getDataSchemaURL = view(ModelState.dataSchemaURL);
export const getDescription = view(ModelState.description);
export const getCustomPrefixes = view(ModelState.customPrefixes);
export const getCartesianProduct = view(ModelState.cartesianProduct);
export const getPropertyLanguages = view(ModelState.propertyLanguages);
export const getPrefixes = view(ModelState.prefixes);
export const getModelQuery = view(ModelState.query);

export const getLanguage = view(SettingsState.language);
export const getLabelLanguage = view(SettingsState.labelLanguage);
export const getLoadingHumanReadable = view(ControlState.labelsLoadingProgress);
export const getLimit = view(SettingsState.limit);
export const getLimitEnabled = view(SettingsState.limitEnabled);
export const getLastSave = view(SettingsState.lastSave);
export const getHorizontalLayout = view(SettingsState.horizontalLayout);
export const getAppLoaded = view(ControlState.loaded);

export const getFiles = view(SolidState.files);
export const getCurrentFileLocation = view(SolidState.modelFileLocation);
export const getUser = view(SolidState.webId);
export const getSessionValid = pipe(view(SolidState.session), path(['idClaims', 'exp']), exp => exp * 1000 > Date.now());
export const getAvatar = view(SolidState.avatar);
export const getModelFileLocation = view(SolidState.modelFileLocation);

export const getQuery = s => view(ModelState.query, s) || view(YasguiState.query, s);
export const getInstance = view(YasguiState.instance);

export const getSelectedEdgePropertyIds = view(ControlState.selectedEdgePropertyIds);
