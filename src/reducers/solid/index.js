import { fromJS } from 'immutable';
import Actions from 'src/actions';

const initialState = new fromJS({
  bin: {
    url: '',
    title: '',
    body: ''
  },
  session: '',
  folderUri: 'https://jaresan.solid.community/misc/',
});

const Types = Actions.Types;
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.r_solidLoggedIn:
      return state.set('session', action.payload);
    case Types.r_solidLoggedOut:
      return state.delete('session');
    default:
      return state;
  }
}
