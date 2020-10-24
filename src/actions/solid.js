import { createActions } from 'reduxsauce'

export default createActions({
  r_setSolidSession: ['session'],
  r_solidLoggedOut: null,
  s_onSolidLogin: null,
  s_onSolidLogout: null,
  s_onViewSave: ['uri'],
  s_loadOwnView: ['uri'],
  r_setFolderUri: ['uri'],
  s_onSolidStart: null,
  s_saveFolderUri: ['uri'],
  r_toggleFolderUriChanging: ['changing'],
  r_setExistingViews: ['uris'],
  r_viewDeleted: ['uri'],
  s_deleteFile: ['uri'],
  r_fileDeleted: ['filePath'],
  r_resetFolderUri: null,
  s_loadFiles: ['url'],
  r_filesLoaded: ['files'],
  s_saveOwnView: ['uri']
}, {prefix: 'Solid.'});
