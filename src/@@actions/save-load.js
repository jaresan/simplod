/**
 * @file Save and load functionality
 * @module @@actions/save-load
 */
import { dispatch, dispatchSet, getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import * as SolidState from '@@app-state/solid/state';
import * as ControlsState from '@@app-state/controls/state';
import { view, mergeDeepRight, isEmpty, invertObj } from 'ramda';
import {getEndpoint, getDataSchemaURL, getFilename} from '@@selectors';
import { getLastLocalState, saveLocalState } from '@@storage';
import { Graph } from '@@graph';
import { saveFile } from '@@actions/solid/files';
import { message } from 'antd';
import { openSaveOverwritePrompt } from '@@components/controls/save-overwrite-modal';
import { loadCustomPrefixes } from '@@actions/custom-prefix';
import { withLoading, withLoadingP } from '@@components/with-loading';
import { loadLabels } from '@@actions/model/load';
import { fetchDataSchema } from '@@api';
import { translated } from '@@localization';

/**
 * Generates JSON save data.
 * First updates the entities with their respective graph node positions and exports this data.
 * @function
 * @returns {{model: (*|(function(*=): (*)))}}
 */
export const generateSaveData = () => {
  const bBoxesById = Graph.getBBoxesById();
  dispatch(ModelState.setBoundingBoxes(bBoxesById));
  return {model: view(ModelState.rootLens, getState())};
}

/**
 * @function
 */
export const clearLocalSettings = () => saveLocalState({settings: {}});

/**
 * @function
 * @param update
 */
export const updateLocalSettings = update => {
  const {settings} = getLastLocalState();
  saveLocalState({settings: mergeDeepRight(settings, update)});
}

/**
 * @function
 */
export const loadLocalSettings = () => {
  const settings = getLastLocalState().settings;
  if (settings) {
    dispatchSet(SettingsState.rootLens, Object.assign(SettingsState.initial, settings));
  }
}

/**
 * Saves data either remotely or locally, based on whether a remote save location is already established.
 * @function
 * @returns {void|Promise<*>}
 */
export const saveData = () => {
  const state = getState();
  const remoteFileURL = view(SolidState.modelFileLocation, state);

  if (remoteFileURL) {
    return saveFile({uri: remoteFileURL, data: generateSaveData(), webId: view(SolidState.webId, state)});
  } else {
    return saveDataLocally();
  }
};

/**
 * Downloads the model data as .json
 * @function
 */
export const downloadData = () => {
  const data = generateSaveData();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
  const downloadNode = document.createElement('a');
  downloadNode.setAttribute('href', dataStr);
  downloadNode.setAttribute('download', 'application-model.json');
  document.body.appendChild(downloadNode);
  downloadNode.click();
  downloadNode.remove();
};

/**
 * Saves data locally, prompting the user if they want to overwrite their current browser data should it change significantly.
 * @function
 */
export const saveDataLocally = () => {
  const saveData = generateSaveData();
  // endpoint/data schema/filename
  const toCheck = [getDataSchemaURL, getFilename, getEndpoint];

  const oldSave = getLastLocalState();
  const promptOverwrite = !isEmpty(oldSave) && toCheck.some(s => s(oldSave)) && toCheck.some(s => s(saveData)) && toCheck.some(selector => selector(saveData) !== selector(oldSave));
  const onOk = () => {
    saveLocalState(saveData);
    dispatchSet(ModelState.dirty, false);
    dispatchSet(SettingsState.lastSave, Date.now());
    message.success('Data saved locally.');
  };
  if (promptOverwrite) {
    openSaveOverwritePrompt({
      onOk,
      dataSchemaURL: {
        old: getDataSchemaURL(oldSave),
        new: getDataSchemaURL(saveData)
      },
      filename: {
        old: getFilename(oldSave),
        new: getFilename(saveData)
      },
      endpointURL: {
        old: getEndpoint(oldSave),
        new: getEndpoint(saveData)
      },
    })
  } else {
    onOk();
  }
}

/**
 * Loads the model from json and initializes the graph.
 * @function
 * @param json
 */
export const loadModel = json => {
  dispatchSet(ControlsState.loadingModel, true);
  const newData = view(ModelState.rootLens, json);
  Graph.clear();
  withLoading('Initializing graph...')(Graph.initialize(json));
  dispatchSet(ModelState.rootLens, newData);
  dispatch(loadCustomPrefixes(view(ModelState.customPrefixes, getState())));
  Graph.updatePositions(view(ModelState.classes, getState()));
  dispatchSet(ControlsState.loadingModel, false);
}

/**
 * Loads model data from browser storage.
 * @returns {Promise<void>}
 */
export const loadLocalData = async () => {
  const state = getLastLocalState();
  loadModel(state);
  const dataSchemaURL = view(ModelState.dataSchemaURL, getState());
  withLoadingP('Fetching RDF Schema...')(fetchDataSchema(dataSchemaURL))
    .then(({prefixes}) => dispatchSet(ModelState.prefixes, invertObj(prefixes)))
    .catch(() => message.error(translated('There was a problem downloading prefixes for this file.')))
    .finally(() => {
      loadLabels();
      dispatchSet(ModelState.dirty, false);
    });
};
