import { onDataLoaded } from '@@actions/lifecycle';
import { Graph } from '@@graph';
import { fetchDataSchema } from '@@actions/model/fetch-data-schema';
import { dispatch, dispatchSet, getState } from '@@app-state';
import * as YasguiState from '@@app-state/yasgui/state';
import { invertObj, view } from 'ramda';
import * as ModelState from '@@app-state/model/state';
import * as SolidState from '@@app-state/solid/state';
import * as SettingsState from '@@app-state/settings/state';
import { fetchFile, hasPermissions } from '@@actions/solid/files';
import { loadModel } from '@@actions/save-load';
import { withLoadingP, withLoading } from '@@utils/with-loading';
import { loadHumanReadableData } from '@@actions/interactions/load-human-readable';
import { message, Modal } from 'antd';
import { isLoggedIn } from '@@actions/solid/auth';
import {notification} from 'antd';
import LoadingLabelsFeedback from '@@components/controls/loading-labels-feedback';
import { applyCustomPrefixes } from '@@actions/custom-prefix';
import { translated } from '@@localization';

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

    if (await hasPermissions(modelURL, true) && await isLoggedIn()) {
      setTimeout(() => {
        Modal.confirm({maskClosable: true, title: translated(`Do you want to set ${modelURL} as your current working file?`), onOk: () => {
            dispatchSet(SolidState.modelFileLocation, modelURL)
          }})
      }, 500);
    }
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
  if (modelURL) {
    await loadDataFromFile(modelURL);
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
};

export const loadGraphFromJSON = async json => {
  const dataSchemaURL = view(ModelState.dataSchemaURL, json);
  await loadGraph(dataSchemaURL);
  loadModel(json);
}
