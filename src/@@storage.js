/**
 * @file Helper function for local storage
 * @module @@storage
 */

import {mergeRight} from 'ramda';

const localStateSaveKey = 'state';

/**
 * Saves application state to browser storage
 * @function
 * @param json
 */
export const saveLocalState = json => {
  const newState = mergeRight(getLastLocalState(), json);
  localStorage.setItem(localStateSaveKey, JSON.stringify(newState));
}

/**
 * Returns last saved state from browser storage
 * @function
 * @returns {any|{}}
 */
export const getLastLocalState = () => JSON.parse(localStorage.getItem(localStateSaveKey)) || {};
