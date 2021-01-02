import { createActions } from 'reduxsauce'
import { curry } from 'ramda';

export default {
  ...createActions({
    s_onSolidLogin: null,
    s_onSolidLogout: null,
    s_onViewSave: ['uri'],
    s_loadOwnView: ['uri'],
    s_onSolidStart: null,
    s_saveFolderUri: ['uri'],
    s_deleteFile: ['uri'],
    s_loadFiles: ['url'],
    s_saveOwnView: ['uri']
  }, {prefix: 'Solid.'}),
  set: curry((key, value) => ({
    type: `Solid.set:${key}`,
    __customSetterSolid: true,
    payload: {
      key, value
    }
  }))
};
