import { onDataLoaded } from '@@actions/lifecycle';
import { Graph } from '@@graph';
import { fetchDataSchema } from '@@actions/model/fetch-data-schema';
import { dispatchSet } from '@@app-state';
import * as YasguiState from '@@app-state/yasgui/state';
import { invertObj } from 'ramda';
import * as ModelState from '@@app-state/model/state';

export const loadGraph = ({modelURL, dataSchemaURL, endpointURL}) => {
  let model = {};
  if (modelURL) {
    const data = await
    dataSchemaURL = mode
  }
  const data = fetchDataSchema(url);
  dispatchSet(YasguiState.prefixes, invertObj(data.__prefixes__));

  dispatchSet(ModelState.dataSchemaURL, url);
  dispatchSet(ModelState.endpoint, this.endpointURL);
  onDataLoaded();
  Graph.reset();
};
