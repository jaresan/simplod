import { createActions } from 'reduxsauce'
import {curry} from 'ramda';

export default {
  ...createActions({
    r_togglePropertySelected: ['id', 'selected'],
    r_togglePropertyOptional: ['id', 'optional'],
    r_togglePropertyAsVariable: ['id', 'asVariable'],
    r_toggleEntityHidden: ['id', 'hidden'],
    r_toggleEntitySelected: ['id', 'selected'],
    r_updateEntityName: ['id', 'varName'],
    r_savePropertyName: ['id', 'varName'],
    r_dataLoaded: null,
  }, {prefix: 'Model.'}),
  set: curry((key, value) => ({
    type: `Model.set:${key}`,
    __customSetterModel: true,
    payload: {
      key, value
    }
  }))
};

