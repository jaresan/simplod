import { onDataLoaded } from '@@actions/lifecycle';
import { Graph } from '@@graph';
import { fetchDataSchema } from '@@actions/model/fetch-data-schema';
import { dispatchSet } from '@@app-state';
import * as YasguiState from '@@app-state/yasgui/state';
import { invertObj, view } from 'ramda';
import * as ModelState from '@@app-state/model/state';
import { fetchFile } from '@@actions/solid/files';
import { loadModel } from '@@actions/save-load';
import { withLoading, withLoadingP } from '@@utils/with-loading';
import { loadHumanReadableData } from '@@actions/interactions/load-human-readable';

const initializeGraph = data => {
  Graph.clear();
  Graph.initialize(data);
};

const loadDataFromFile = async modelURL => {
  try {
    const json = await withLoadingP('Fetching file...')(fetchFile(modelURL).then(data => data.json()));
    const dataSchemaURL = view(ModelState.dataSchemaURL, json);

    const {schemaData, prefixes} = await withLoadingP('Fetching RDF Schema...')(fetchDataSchema(dataSchemaURL));
    dispatchSet(YasguiState.prefixes, invertObj(prefixes));
    withLoading('Initializing graph...')(initializeGraph(schemaData));
    loadModel(json);
    loadHumanReadableData();
  } catch (e) {
    console.error(e);
  }
};

const loadNewGraph = async dataSchemaURL => {
  const {prefixes, schemaData} = await withLoadingP('Fetching RDF Schema...')(fetchDataSchema(dataSchemaURL));
  dispatchSet(YasguiState.prefixes, invertObj(prefixes));
  initializeGraph(schemaData);
  onDataLoaded();
  loadHumanReadableData();
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
