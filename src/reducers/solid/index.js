import { fromJS } from 'immutable';
import Actions from 'src/actions';

const initialState = new fromJS({
  session: '',
  folderUri: '',
});

const Types = Actions.Types;
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.r_setSolidSession:
      return state.set('session', action.payload);
    case Types.r_solidLoggedOut:
      return initialState;
    case Types.r_setFolderUri:
      return state.set('folderUri', action.payload);
    default:
      return state;
  }
}
