import { createActions } from 'reduxsauce'
import {curry} from 'ramda';

export default {
  ...createActions({
    r_togglePropertySelected: ['id', 'selected'],
    r_toggleEntitySelected: ['id', 'selected'],
  }, {prefix: 'Model.'}),
  set: curry((key, value) => ({
    type: `Model.set:${key}`,
    __customSetterModel: true,
    payload: {
      key, value
    }
  }))
};

