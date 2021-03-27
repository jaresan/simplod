import { onDataLoaded } from '@@actions/lifecycle';
import { Graph } from '@@graph';
import { fetchDataSchema } from '@@actions/model/fetch-data-schema';
import { dispatch, dispatchSet, getState } from '@@app-state';
import * as YasguiState from '@@app-state/yasgui/state';
import { invertObj, view } from 'ramda';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import { fetchFile, hasPermissions } from '@@actions/solid/files';
import { loadModel } from '@@actions/save-load';
import { withLoadingP, withLoading } from '@@utils/with-loading';
import { loadHumanReadableData } from '@@actions/interactions/load-human-readable';
import { message, Modal } from 'antd';
import {notification} from 'antd';
import LoadingLabelsFeedback from '@@components/controls/loading-labels-feedback';
import { applyCustomPrefixes } from '@@actions/custom-prefix';

const loadGraph = async url => {
  const {prefixes, schemaData} = await withLoadingP('Fetching RDF Schema...')(fetchDataSchema(url));
  dispatchSet(YasguiState.prefixes, invertObj(prefixes));
  Graph.clear();
  withLoading('Initializing graph...')(Graph.initialize(schemaData));
};

export const loadLabels = () => {
  const key = 'loading-labels-notification';
  notification.info({key, message: 'Loading labels', duration: 0, description: LoadingLabelsFeedback()});
  loadHumanReadableData().finally(() => notification.close(key));
};

const loadDataFromFile = async modelURL => {
  try {
    const json = await withLoadingP('Fetching file...')(fetchFile(modelURL).then(data => data.json()));
    const dataSchemaURL = view(ModelState.dataSchemaURL, json);

    const {prefixes} = await withLoadingP('Fetching RDF Schema...')(fetchDataSchema(dataSchemaURL));
    dispatchSet(YasguiState.prefixes, invertObj(prefixes));
    loadModel(json);
    loadLabels();
    Modal.destroyAll();

    return await hasPermissions(modelURL, true);
  } catch (e) {
    console.error(e);
  }
};

const loadNewGraph = async dataSchemaURL => {
  try {
    await loadGraph(dataSchemaURL);
    onDataLoaded();
    loadLabels();
  } catch (e) {
    console.error(e);
    message.error('An error occurred while trying to download the schema.');
  }
}

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

export const loadGraphFromJSON = async json => {
  const dataSchemaURL = view(ModelState.dataSchemaURL, json);
  await loadGraph(dataSchemaURL);
  loadModel(json);
}
