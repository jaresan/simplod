/**
 * File containing logic for saving/loading application data.
 */
import { dispatchSet, getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import { view } from 'ramda';
import { getLastLocalState, saveLocalState } from '@@storage';

export const saveData = () => {
  dispatchSet(ModelState.lastSave, Date.now());
  const model = getState().model;

  saveLocalState({model});
}

export const loadData = () => {
  const state = getState();

  const loadedState = getLastLocalState();

  // Don't overwrite current lastSave
  const newState = Object.assign(loadedState.model, {lastSave: view(ModelState.lastSave, state)});
  dispatchSet(ModelState.rootLens, newState);
}
