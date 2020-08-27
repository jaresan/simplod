import { createActions } from 'reduxsauce'

export default createActions({
  r_toggleSelect: ['entityType', 'id', 'selected'],
  r_deselectAll: null,
  r_registerResource: ['entityType', 'data', 'id'],
  r_togglePropertyOptional: ['id', 'optional'],
  r_togglePropertyShow: ['id', 'show'],
  r_togglePropertyDisabled: ['id', 'disabled'],
  r_savePropertyName: ['id', 'name'],
  r_clearData: null
}, {prefix: 'Model.'});

