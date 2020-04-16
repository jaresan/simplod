import {fromJS, Map} from 'immutable';
import ActionTypes from 'src/actions/model';

const initialState = new fromJS({
  entities: {}
});

const toggleSelect = (state, [id, selected]) => {
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
  [ActionTypes.r_toggleSelect]: toggleSelect,
  [ActionTypes.r_deselectAll]: deselectAll
};

export default (state = initialState, action) => {
  if (typeof handlers[action.type] === 'function') {
    return handlers[action.type](state, action.payload);
  }

  return state;
};
