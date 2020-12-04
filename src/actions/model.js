import { createActions } from 'reduxsauce'

export default createActions({
  r_updateEntities: ['items'],
  r_toggleSelections: ['entityType', 'selection'],
  r_deselectAll: null,
  r_registerResources: ['entityType', 'resources'],
  r_togglePropertySelected: ['id', 'selected'],
  r_togglePropertyOptional: ['id', 'optional'],
  r_togglePropertyAsVariable: ['id', 'asVariable'],
  r_toggleEntityHidden: ['id', 'hidden'],
  r_toggleEntitySelected: ['id', 'selected'],
  r_updateEntityName: ['id', 'varName'],
  r_savePropertyName: ['id', 'varName'],
  r_clearData: null,
  r_viewLoaded: ['json'],
  r_dataLoaded: null,
  r_updateSelectionOrder: ['selectionIds'],
  r_updateLimit: ['limit'],
  r_loadState: ['json']
}, {prefix: 'Model.'});

