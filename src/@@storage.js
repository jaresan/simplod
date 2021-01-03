const localStateSaveKey = 'state';

export const saveLocalState = json => localStorage.setItem(localStateSaveKey, JSON.stringify(json));
export const getLastLocalState = () => JSON.parse(localStorage.getItem(localStateSaveKey));
