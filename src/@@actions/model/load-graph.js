import { onDataLoaded } from '@@actions/lifecycle';
import { Graph } from '@@graph';
import { fetchDataSchema } from '@@actions/model/fetch-data-schema';
import { dispatchSet } from '@@app-state';
import * as YasguiState from '@@app-state/yasgui/state';
import { invertObj, view } from 'ramda';
import * as ModelState from '@@app-state/model/state';
import { fetchFile } from '@@actions/solid/files';
import { loadModel } from '@@actions/save-load';
import { withLoadingP, withLoading } from '@@utils/with-loading';
import { loadHumanReadableData } from '@@actions/interactions/load-human-readable';

const loadGraph = async url => {
  const {prefixes, schemaData} = await withLoadingP('Fetching RDF Schema...')(fetchDataSchema(url));
  dispatchSet(YasguiState.prefixes, invertObj(prefixes));
  Graph.clear();
  withLoading('Initializing graph...')(Graph.initialize(schemaData));
};

const loadDataFromFile = async modelURL => {
  try {
    const json = await withLoadingP('Fetching file...')(fetchFile(modelURL).then(data => data.json()));
    const dataSchemaURL = view(ModelState.dataSchemaURL, json);

    await loadGraph(dataSchemaURL);
    loadModel(json);
    loadHumanReadableData();
  } catch (e) {
    console.error(e);
  }
};

const loadNewGraph = async dataSchemaURL => {
  await loadGraph(dataSchemaURL);
  onDataLoaded();
  loadHumanReadableData();
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

export const loadGraphFromJSON = json => loadGraphFromURL({dataSchemaURL: view(ModelState.dataSchemaURL, json)})
