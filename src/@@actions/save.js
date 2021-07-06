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
 * @param update
 */
export const updateLocalSettings = update => {
  const {settings} = getLastLocalState();
  saveLocalState({settings: mergeDeepRight(settings, update)});
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
