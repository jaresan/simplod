/**
 * File containing logic for saving/loading application data.
 */
import { dispatchSet, getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import { view } from 'ramda';
import { getLastLocalState, saveLocalState } from '@@storage';

// export const getSaveData = () => view()
//
//
// export const loadData = data

export const saveSettingsLocally = state => {
  const settings = view(SettingsState.rootLens, state);

  saveLocalState({settings});
};

export const saveDataLocally = () => {
  dispatchSet(SettingsState.lastSave, Date.now());
  const model = view(ModelState.rootLens, getState());

  saveLocalState({model});
}

export const loadLocalData = () => {
  const loadedState = getLastLocalState();

  // Don't overwrite current lastSave
  const newState = Object.assign(loadedState.model);
  dispatchSet(ModelState.rootLens, newState);
}
