import { getState } from '@@app-state';
import * as SolidState from '@@app-state/solid/state';
import {view} from 'ramda';

export const getShareableURL = relativePath => {
  const state = getState();
  const webId = view(SolidState.webId, state);
  const fileURL = new URL(webId);
  fileURL.pathname = relativePath;
  const url = new URL(window.location);
  url.searchParams.set('modelURL', `${fileURL}`);
  return `${url}`;
};

export const getCurrentFileShareableUrl = () => {
  const path = view(SolidState.modelFileLocation, getState());
  const url = new URL(window.location);
  url.searchParams.set('modelURL', `${path}`);
  return `${url}`;
};

export const getCurrentFileUrl = () => view(SolidState.modelFileLocation, getState());
