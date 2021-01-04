import {mergeRight} from 'ramda';

const localStateSaveKey = 'state';

export const saveLocalState = json => {
  const newState = mergeRight(getLastLocalState(), json);
  localStorage.setItem(localStateSaveKey, JSON.stringify(newState));
}
export const getLastLocalState = () => JSON.parse(localStorage.getItem(localStateSaveKey));
