import {fromJS} from 'immutable';
import { entityTypes } from '@@constants/entityTypes';

const initialState = fromJS({
  entities: {
    ...Object.keys(entityTypes).reduce((acc, type) => Object.assign(acc, {[type]: {}}), {})
  },
  dirty: false,
  selectionOrder: [],
  language: navigator.language,
  showHumanReadable: false,
  limitEnabled: false,
  limit: 100,
  lastSave: 0
});

export default (state = initialState) => state;
