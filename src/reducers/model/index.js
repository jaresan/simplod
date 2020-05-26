import {fromJS} from 'immutable';
import Actions from 'src/actions/model';

const initialState = new fromJS({
  entities: {}
});

const toggleSelect = (state, {id, selected}) => {
  if (typeof selected !== 'undefined') {
    return state.setIn(['entities', id, 'selected'], selected);
  }
  const current = state.getIn(['entities', id, 'selected']);
  return state.setIn(['entities', id, 'selected'], !current);
};

const deselectAll = state => state
    .set('entities', state
      .get('entities')
      .map(entity => entity.set('selected', false))
    );

const handlers = {
  [Actions.Types.R_TOGGLE_SELECT]: toggleSelect,
  [Actions.Types.R_DESELECT_ALL]: deselectAll
};

export default (state = initialState, action) => {
  if (typeof handlers[action.type] === 'function') {
    return handlers[action.type](state, action);
  }

  return state;
};
