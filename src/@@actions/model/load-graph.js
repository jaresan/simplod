import { onDataLoaded } from '@@actions/lifecycle';
import { Graph } from '@@graph';
import { fetchDataSchema } from '@@actions/model/fetch-data-schema';
import { dispatchSet } from '@@app-state';
import * as YasguiState from '@@app-state/yasgui/state';
import { invertObj, view } from 'ramda';
import * as ModelState from '@@app-state/model/state';
import * as SolidState from '@@app-state/solid/state';
import { fetchFile, hasPermissions } from '@@actions/solid/files';
import { loadModel } from '@@actions/save-load';
import { withLoadingP, withLoading } from '@@utils/with-loading';
import { loadHumanReadableData } from '@@actions/interactions/load-human-readable';
import { Modal } from 'antd';
import { isLoggedIn } from '@@actions/solid/auth';
import {notification} from 'antd';
import LoadingLabelsFeedback from '@@components/controls/loading-labels-feedback';

const loadGraph = async url => {
  const {prefixes, schemaData} = await withLoadingP('Fetching RDF Schema...')(fetchDataSchema(url));
  dispatchSet(YasguiState.prefixes, invertObj(prefixes));
  Graph.clear();
  withLoading('Initializing graph...')(Graph.initialize(schemaData));
};

const loadLabels = () => {
  const key = 'loading-labels-notification';
  notification.info({key, message: 'Loading labels', duration: 0, description: LoadingLabelsFeedback()});
  loadHumanReadableData().finally(() => notification.close(key));
}

const loadDataFromFile = async modelURL => {
  try {
    const json = await withLoadingP('Fetching file...')(fetchFile(modelURL).then(data => data.json()));
    const dataSchemaURL = view(ModelState.dataSchemaURL, json);

    await loadGraph(dataSchemaURL);
    loadModel(json);
    loadLabels();
    Modal.destroyAll();

    if (await hasPermissions(modelURL, true) && await isLoggedIn()) {
      setTimeout(() => {
        Modal.confirm({title: `Do you want to set ${modelURL} as your current working file?`, onOk: () => {
            dispatchSet(SolidState.modelFileLocation, modelURL)
          }})
      }, 500);
    }
  } catch (e) {
    console.error(e);
  }
};

const loadNewGraph = async dataSchemaURL => {
  await loadGraph(dataSchemaURL);
  onDataLoaded();
  loadLabels();
}

export const loadGraphFromURL = async ({modelURL, dataSchemaURL, endpointURL}) => {
  if (modelURL) {
    await loadDataFromFile(modelURL);
  } else {
    await loadNewGraph(dataSchemaURL);
    dispatchSet(ModelState.dataSchemaURL, dataSchemaURL);
    dispatchSet(ModelState.endpoint, endpointURL);
  }
};

export const loadGraphFromJSON = async json => {
  const dataSchemaURL = view(ModelState.dataSchemaURL, json);
  await loadGraph(dataSchemaURL);
  loadModel(json);
}
