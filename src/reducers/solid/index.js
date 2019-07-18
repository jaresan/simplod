import { fromJS } from 'immutable';
import Actions from 'src/actions';

const initialState = new fromJS({
  session: '',
  lastFolderUri: '',
  folderUri: '',
  folderUriChanging: false,
  views: []
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
    case Types.r_resetFolderUri:
      return state.set('folderUri', state.get('lastFolderUri'));
    case Types.r_toggleFolderUriChanging:
      if (action.payload) {
        state = state.set('lastFolderUri', state.get('folderUri'));
      }
      return state.set('folderUriChanging', action.payload);
    case Types.r_setExistingViews:
      return state.set('views', action.payload);
    case Types.r_viewDeleted:
      const uri = action.payload;
      const newViews = state.get('views').filter(v => v !== uri);
      return state.set('views', newViews);
    default:
      return state;
  }
}
