import { fromJS } from 'immutable';
import Actions from 'src/actions/solid';

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
    case Types.R_SET_SOLID_SESSION:
      return state.set('session', action.session);
    case Types.R_SOLID_LOGGED_OUT:
      return initialState;
    case Types.R_SET_FOLDER_URI:
      return state.set('folderUri', action.uri);
    case Types.R_RESET_FOLDER_URI:
      return state.set('folderUri', state.get('lastFolderUri'));
    case Types.R_TOGGLE_FOLDER_URI_CHANGING:
      if (action.changing) {
        state = state.set('lastFolderUri', state.get('folderUri'));
      }
      return state.set('folderUriChanging', action.changing);
    case Types.R_SET_EXISTING_VIEWS:
      return state.set('views', action.uris);
    case Types.R_VIEW_DELETED:
      const uri = action.uri;
      const newViews = state.get('views').filter(v => v !== uri);
      return state.set('views', newViews);
    default:
      return state;
  }
}
