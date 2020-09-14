import { createActions } from 'reduxsauce'

export default createActions({
  r_toggleSelect: ['entityType', 'id', 'selected'],
  r_deselectAll: null,
  r_registerResource: ['entityType', 'data', 'id'],
  r_togglePropertyOptional: ['id', 'optional'],
  r_togglePropertyShow: ['id', 'show'],
  r_savePropertyName: ['id', 'name'],
  r_clearData: null,
  r_viewLoaded: ['json']
}, {prefix: 'Model.'});

