/**
 * @file Returns shareable strings based on the Solid data.
 * @module @@actions/solid/share
 */
import { getState } from '@@app-state';
import * as SolidState from '@@app-state/solid/state';
import {view} from 'ramda';

/**
 * Returns shareable url for the Solid Pod file, opening the application directly with the model file being loaded.
 * @function
 * @param relativePath
 * @returns {string}
 */
export const getShareableURL = relativePath => {
  const state = getState();
  const webId = view(SolidState.webId, state);
  const fileURL = new URL(webId);
  fileURL.pathname = relativePath;
  const url = new URL(window.location);
  url.searchParams.set('modelURL', `${fileURL}`);
  return `${url}`;
};

/**
 * Returns the saved Solid Pod file URL.
 * @function
 * @returns {string}
 */
export const getCurrentFileShareableUrl = () => {
  const path = view(SolidState.modelFileLocation, getState());
  const url = new URL(window.location);
  url.searchParams.set('modelURL', `${path}`);
  return `${url}`;
};
