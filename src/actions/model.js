import { createActions } from 'reduxsauce'

export default createActions({
  r_toggleSelect: ['id', 'selected'],
  r_deselectAll: null,
}, {prefix: 'Model.'});

