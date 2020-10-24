import { fromJS } from 'immutable';
import Actions from 'src/actions/solid';

const initialState = new fromJS({
  session: {},
  files: {}
});

const Types = Actions.Types;

const setSolidSession = (state, {session}) => state.set('session', fromJS(session));
const solidLogOut = () => initialState;
const setFiles = (state, {files}) => {
  const oldFiles = state.get('files');
  return state.set('files', oldFiles.mergeDeep(fromJS(files)));
}

const handlers = {
  [Types.R_SET_SOLID_SESSION]: setSolidSession,
  [Types.R_SOLID_LOGGED_OUT]: solidLogOut,
  [Types.R_FILES_LOADED]: setFiles
};

export default (state = initialState, action) => {
  if (typeof handlers[action.type] === 'function') {
    return handlers[action.type](state, action);
  }

  return state;
};

