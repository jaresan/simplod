import { createActions } from 'reduxsauce'

export default createActions({
  r_toggleSelect: {entityType: null, id: null, selected: null},
  r_deselectAll: null,
  r_registerResources: ['entityType', 'resources'],
  r_togglePropertyOptional: ['id', 'optional'],
  r_togglePropertyAsVariable: ['id', 'asVariable'],
  r_savePropertyName: ['id', 'name'],
  r_clearData: null,
  r_viewLoaded: ['json']
}, {prefix: 'Model.'});

