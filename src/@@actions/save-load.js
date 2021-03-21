/**
 * File containing logic for saving/loading application data.
 */
import { dispatch, dispatchSet, getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import * as SolidState from '@@app-state/solid/state';
import { view, mergeDeepRight, isEmpty, invertObj } from 'ramda';
import {getEndpoint, getDataSchemaURL, getFilename} from '@@selectors';
import { getLastLocalState, saveLocalState } from '@@storage';
import { Graph } from '@@graph';
import { saveFile } from '@@actions/solid/files';
import { message } from 'antd';
import { openSaveOverwritePrompt } from '@@components/controls/save-overwrite-modal';
import { loadCustomPrefixes } from '@@actions/custom-prefix';
import { withLoading, withLoadingP } from '@@utils/with-loading';
import { loadLabels } from '@@actions/model/load-graph';
import { fetchDataSchema } from '@@actions/model/fetch-data-schema';
import * as YasguiState from '@@app-state/yasgui/state';
import { translated } from '@@localization';

export const generateSaveData = () => {
  const bBoxesById = Graph.getBBoxesById();
  dispatch(ModelState.setBoundingBoxes(bBoxesById));
  return {model: view(ModelState.rootLens, getState())};
}

export const clearLocalSettings = () => saveLocalState({settings: {}});

export const updateLocalSettings = update => {
  const {settings} = getLastLocalState();
  saveLocalState({settings: mergeDeepRight(settings, update)});
}

export const loadLocalSettings = () => {
  const settings = getLastLocalState().settings;
  if (settings) {
    dispatchSet(SettingsState.rootLens, Object.assign(SettingsState.initial, settings));
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
  const saveData = generateSaveData();
  // endpoint/data schema/filename
  const toCheck = [getDataSchemaURL, getFilename, getEndpoint];

  const oldSave = getLastLocalState();
  const promptOverwrite = !isEmpty(oldSave) && toCheck.some(s => s(saveData)) && toCheck.some(selector => selector(saveData) !== selector(oldSave));
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

export const loadModel = json => {
  const newData = view(ModelState.rootLens, json);
  Graph.clear();
  withLoading('Initializing graph...')(Graph.initialize(json));
  dispatchSet(ModelState.rootLens, newData);
  dispatch(loadCustomPrefixes(view(ModelState.customPrefixes, getState())));
  Graph.updatePositions(view(ModelState.classes, getState()));
}

export const loadLocalData = async () => {
  const state = getLastLocalState();
  loadModel(state);
  const dataSchemaURL = view(ModelState.dataSchemaURL, getState());
  withLoadingP('Fetching RDF Schema...')(fetchDataSchema(dataSchemaURL))
    .then(({prefixes}) => dispatchSet(YasguiState.prefixes, invertObj(prefixes)))
    .catch(() => message.error(translated('There was a problem downloading prefixes for this file.')));
  loadLabels();
};
