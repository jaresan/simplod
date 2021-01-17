/**
 * File containing logic for saving/loading application data.
 */
import { dispatch, dispatchSet, getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import * as SolidState from '@@app-state/solid/state';
import { view, mergeDeepRight, prop } from 'ramda';
import { getLastLocalState, saveLocalState } from '@@storage';
import { Graph } from '@@graph';
import { saveFile } from '@@actions/solid/files';
import { message } from 'antd';
import { loadGraphFromURL } from '@@actions/model/load-graph';

export const generateSaveData = () => {
  const bBoxesById = Graph.getBBoxesById();
  dispatch(ModelState.setBoundingBoxes(bBoxesById));
  return {model: view(ModelState.rootLens, getState())};
}

export const getModelData = prop('model');

export const clearLocalSettings = () => saveLocalState({settings: {}});

export const updateLocalSettings = update => {
  const {settings} = getLastLocalState();
  saveLocalState({settings: mergeDeepRight(settings, update)});
}

export const loadLocalSettings = () => {
  const settings = getLastLocalState().settings;
  if (settings) {
    dispatchSet(SettingsState.rootLens, settings);
  }
}

export const saveData = () => {
  const state = getState();
  const remoteFileURL = view(SolidState.modelFileLocation, state);

  if (remoteFileURL) {
    return saveFile({uri: remoteFileURL, data: generateSaveData(), webId: view(SolidState.webId, state)});
  } else {
    return saveDataLocally();
  }
};

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

export const saveDataLocally = () => {
  dispatchSet(SettingsState.lastSave, Date.now());
  saveLocalState(generateSaveData());
  message.success('Data saved locally.');
}

export const loadModel = json => {
  const newData = getModelData(json);
  dispatchSet(ModelState.rootLens, newData);
  Graph.updatePositions(view(ModelState.classes, getState()));
}

export const loadLocalData = async () => {
  const state = getLastLocalState();
  await loadGraphFromURL({dataSchemaURL: view(ModelState.dataSchemaURL, state)})
  loadModel(state);
};
