import { createActions } from 'reduxsauce'

export default createActions({
  r_updateEntities: ['items'],
  r_deselectAll: null,
  r_registerResources: ['entityType', 'resources'],
  r_togglePropertyOptional: ['id', 'optional'],
  r_togglePropertyAsVariable: ['id', 'asVariable'],
  r_savePropertyName: ['id', 'name'],
  r_clearData: null,
  r_viewLoaded: ['json']
}, {prefix: 'Model.'});

