import {fromJS} from 'immutable';
import Actions from 'src/actions/model';
import {isNil} from 'ramda';
import entityTypes from 'src/constants/entityTypes';

const initialState = new fromJS({
  entities: {
    ...Object.keys(entityTypes).reduce((acc, type) => Object.assign(acc, {[type]: {}}), {})
  }
});

const toggleSelect = (state, {entityType, id, selected}) => state.updateIn(['entities', entityType, id, 'selected'], current => isNil(selected) ? !current : selected);

const deselectAll = state => state.update('entities', entities => entities.map(subgroup => subgroup.map(entity => entity.set('selected', false))));

const registerResource = (state, {entityType, id, data}) => state.updateIn(['entities', entityType, id], old => fromJS({...old, ...data}));

const toggleOptional = (state, {id, optional}) => state.setIn(['entities', entityTypes.property, id, 'optional'], optional);
const toggleShow = (state, {id, show}) => state.setIn(['entities', entityTypes.property, id, 'show'], show);
const toggleDisabled = (state, {id, disabled}) => state.setIn(['entities', entityTypes.property, id, 'disabled'], disabled);
const savePropertyName = (state, {id, name}) => state.setIn(['entities', entityTypes.property, id, 'name'], name);
const clearData = () => initialState;

const handlers = {
  [Actions.Types.R_TOGGLE_SELECT]: toggleSelect,
  [Actions.Types.R_DESELECT_ALL]: deselectAll,
  [Actions.Types.R_REGISTER_RESOURCE]: registerResource,
  [Actions.Types.R_TOGGLE_PROPERTY_OPTIONAL]: toggleOptional,
  [Actions.Types.R_TOGGLE_PROPERTY_SHOW]: toggleShow,
  [Actions.Types.R_TOGGLE_PROPERTY_DISABLED]: toggleDisabled,
  [Actions.Types.R_SAVE_PROPERTY_NAME]: savePropertyName,
  [Actions.Types.R_CLEAR_DATA]: clearData
};

export default (state = initialState, action) => {
  if (typeof handlers[action.type] === 'function') {
    return handlers[action.type](state, action);
  }

  return state;
};
