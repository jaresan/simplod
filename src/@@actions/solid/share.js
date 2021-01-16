import { getState } from '@@app-state';
import * as SolidState from '@@app-state/solid/state';
import * as ModelState from '@@app-state/model/state';
import {view} from 'ramda';

export const getShareableURL = file => {
  const state = getState();
  const webId = view(SolidState.webId, state);
  const fileURL = new URL(webId);
  const endpoint = view(ModelState.endpoint, state);
  const dataSchemaURL = view(ModelState.dataSchemaURL, state);
  fileURL.pathname = file;
  const url = new URL(window.location);
  url.searchParams.set('modelURL', `${fileURL}`);
  url.searchParams.set('schemaURL', dataSchemaURL);
  url.searchParams.set('endpoint', endpoint);
  return `${url}`;
};
