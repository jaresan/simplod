import { onDataLoaded } from '@@actions/lifecycle';
import { Graph } from '@@graph';
import { fetchDataSchema } from '@@actions/model/fetch-data-schema';
import { dispatchSet } from '@@app-state';
import * as YasguiState from '@@app-state/yasgui/state';
import { invertObj } from 'ramda';
import * as ModelState from '@@app-state/model/state';
import { fetchFile } from '@@actions/solid/files';
import { getModelData, loadModel } from '@@actions/save-load';
import { withLoading, withLoadingP } from '@@utils/with-loading';

const initializeGraph = data => {
  Graph.clear();
  Graph.initialize(data);
};

const loadDataFromFile = async modelURL => {
  const json = await withLoadingP('Fetching file...')(fetchFile(modelURL));
  const data = getModelData(json);
  const {dataSchemaURL} = data;

  const schemaData = await withLoadingP('Fetching RDF Schema...')(fetchDataSchema(dataSchemaURL));
  dispatchSet(YasguiState.prefixes, invertObj(data.__prefixes__));
  withLoading('Initializing graph...')(initializeGraph(schemaData));
  loadModel(json);
};

const loadNewGraph = async dataSchemaURL => {
  const data = await withLoadingP('Fetching RDF Schema...')(fetchDataSchema(dataSchemaURL));
  dispatchSet(YasguiState.prefixes, invertObj(data.__prefixes__));
  initializeGraph(data);
  onDataLoaded();
}

export const loadGraph = async ({modelURL, dataSchemaURL, endpointURL}) => {
  if (modelURL) {
    await loadDataFromFile(modelURL);
  } else {
    await loadNewGraph(dataSchemaURL);
    dispatchSet(ModelState.dataSchemaURL, dataSchemaURL);
    dispatchSet(ModelState.endpoint, endpointURL);
  }
};
