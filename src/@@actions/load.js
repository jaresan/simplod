/**
 * @file Handles loading of the model
 * @module @@actions/load.js
 */

import { onDataLoaded } from '@@actions/lifecycle';
import { Graph } from '@@graph';
import { fetchDataSchema } from '@@api';
import { dispatch, dispatchSet, getState } from '@@app-state';
import { invertObj, view } from 'ramda';
import * as ModelState from '@@app-state/model/state';
import { fetchFile, hasPermissions } from '@@actions/solid/files';
import { withLoadingP, withLoading } from '@@components/with-loading';
import { loadHumanReadableData } from '@@actions/load-human-readable';
import { message, Modal } from 'antd';
import {notification} from 'antd';
import LoadingLabelsFeedback from '@@components/controls/loading-labels-feedback';
import { applyCustomPrefixes, loadCustomPrefixes } from '@@actions/custom-prefix';
import { translated } from '@@localization';
import * as ControlState from '@@app-state/controls/state';
import { getLastLocalState } from '@@storage';
import * as SettingsState from '@@app-state/settings/state';
import * as ControlsState from '@@app-state/controls/state';

/**
 * Loads the graph for the provided URL.
 * Downloads it and initializes it while displaying notification in the process.
 * @function
 * @param url
 * @returns {Promise<void>}
 */
const loadGraph = async url => {
  const {prefixes, schemaData} = await withLoadingP(translated('Fetching RDF Schema...'))(fetchDataSchema(url));
  dispatchSet(ModelState.prefixes, invertObj(prefixes));
  Graph.clear();
  withLoading(translated('Initializing graph...'))(Graph.initialize(schemaData));
};

/**
 * Loads human readable labels.
 * @function
 */
export const loadLabels = () => {
  const key = 'loading-labels-notification';
  notification.info({key, message: translated('Loading labels'), duration: 0, description: LoadingLabelsFeedback()});
  loadHumanReadableData().finally(() => notification.close(key));
};

/**
 * Loads the application model from a remote URL.
 * @function
 * @param modelURL URL of the model file to load.
 * @returns {Promise<boolean|*|undefined>}
 */
const loadDataFromFile = async modelURL => {
  try {
    const json = await withLoadingP(translated('Fetching file...'))(fetchFile(modelURL).then(data => data.json()));

    loadModel(json);
    loadLabels();
    Modal.destroyAll();

    return await hasPermissions(modelURL, true);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Loads new graph from provided URL.
 * @function
 * @param dataSchemaURL
 * @returns {Promise<void>}
 */
const loadNewGraph = async dataSchemaURL => {
  try {
    await loadGraph(dataSchemaURL);
    onDataLoaded();
    loadLabels();
  } catch (e) {
    console.error(e);
    message.error(translated('An error occurred while trying to download the schema.'));
  }
}

/**
 * Polymorphic function.
 * Loads the graph based on whether it receives data schema URL or a model file URL.
 * @param modelURL
 * @param dataSchemaURL
 * @param endpointURL
 * @returns {Promise<{hasPermissions: boolean, modelURL}>}
 */
export const loadGraphFromURL = async ({modelURL, dataSchemaURL, endpointURL}) => {
  dispatchSet(ControlState.loaded, false);
  let hasPermissions = false;
  if (modelURL) {
    hasPermissions = await loadDataFromFile(modelURL);
  } else {
    await loadNewGraph(dataSchemaURL);
    dispatchSet(ModelState.dataSchemaURL, dataSchemaURL);
    if (endpointURL) {
      dispatchSet(ModelState.endpoint, endpointURL);
    }
  }
  dispatchSet(ControlState.loaded, true);
  dispatch(applyCustomPrefixes(view(ModelState.customPrefixes, getState())));
  dispatchSet(ModelState.dirty, false);

  return {modelURL, hasPermissions};
};


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
 * Loads the model from json and initializes the graph.
 * @function
 * @param json
 */
export const loadModel = json => {
  dispatchSet(ControlsState.importingModelFile, true);
  const newData = view(ModelState.rootLens, json);
  Graph.clear();
  withLoading('Initializing graph...')(Graph.initialize(json));
  dispatchSet(ModelState.rootLens, newData);
  dispatch(loadCustomPrefixes(view(ModelState.customPrefixes, getState())));
  Graph.updatePositions(view(ModelState.classes, getState()));
  dispatchSet(ControlsState.importingModelFile, false);
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
