/**
 * @file Handles loading of the model
 * @module @@actions/model/load.js
 */

import { onDataLoaded } from '@@actions/lifecycle';
import { Graph } from '@@graph';
import { fetchDataSchema } from '@@api';
import { dispatch, dispatchSet, getState } from '@@app-state';
import { invertObj, view } from 'ramda';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import { fetchFile, hasPermissions } from '@@actions/solid/files';
import { loadModel } from '@@actions/save-load';
import { withLoadingP, withLoading } from '@@components/with-loading';
import { loadHumanReadableData } from '@@actions/interactions/load-human-readable';
import { message, Modal } from 'antd';
import {notification} from 'antd';
import LoadingLabelsFeedback from '@@components/controls/loading-labels-feedback';
import { applyCustomPrefixes } from '@@actions/custom-prefix';
import { translated } from '@@localization';

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
  dispatchSet(SettingsState.loaded, false);
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
  dispatchSet(SettingsState.loaded, true);
  dispatch(applyCustomPrefixes(view(ModelState.customPrefixes, getState())));
  dispatchSet(ModelState.dirty, false);

  return {modelURL, hasPermissions};
};
