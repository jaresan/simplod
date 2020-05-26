import { createActions } from 'reduxsauce'

export default createActions({
  r_setSolidSession: ['session'],
  r_solidLoggedOut: null,
  s_onSolidLogin: null,
  s_onSolidLogout: null,
  r_viewLoaded: ['json'],
  s_onViewSave: ['uri'],
  s_onViewLoad: ['uri'],
  r_setFolderUri: ['uri'],
  s_onSolidStart: null,
  s_saveFolderUri: ['uri'],
  r_toggleFolderUriChanging: ['changing'],
  r_setExistingViews: ['uris'],
  r_viewDeleted: ['uri'],
  s_deleteView: ['uri'],
  r_resetFolderUri: null
}, {prefix: 'Solid.'});
