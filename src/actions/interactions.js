import { createActions } from 'reduxsauce'

export default createActions({
  s_dataChanged: null,
  s_saveData: null,
  s_loadData: null
}, {prefix: 'Interactions.'});
