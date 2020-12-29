import { fromJS } from 'immutable';
import Actions from '@@actions/solid';

const initialState = new fromJS({
  session: {},
  files: {},
  avatar: ''
});

const Types = Actions.Types;

const setSolidSession = (state, {session}) => state.set('session', fromJS(session));
const solidLogOut = () => initialState;
const setFiles = (state, {files}) => {
  const oldFiles = state.get('files');
  return state.set('files', oldFiles.mergeDeep(fromJS(files)));
}

const fileDeleted = (state, {filePath}) => state.deleteIn(['files', ...filePath]);

const handlers = {
  [Types.R_SET_SOLID_SESSION]: setSolidSession,
  [Types.R_SOLID_LOGGED_OUT]: solidLogOut,
  [Types.R_FILES_LOADED]: setFiles,
  [Types.R_FILE_DELETED]: fileDeleted
};

export default (state = initialState, action) => {
  if (typeof handlers[action.type] === 'function') {
    return handlers[action.type](state, action);
  } else if (action.__customSetterSolid) {
    const {key, value} = action.payload;
    state = state.set(key, value);
  }

  return state;
};

