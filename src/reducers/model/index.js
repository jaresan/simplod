import {fromJS, Map} from 'immutable';
import Actions from 'src/actions/model';
import {isNil} from 'ramda';
import entityTypes from 'src/constants/entityTypes';

const initialState = new fromJS({
  entities: {
    ...Object.keys(entityTypes).reduce((acc, type) => Object.assign(acc, {[type]: {}}), {})
  },
  dirty: false
});

// TODO: Add possible entity props description
const defaultEntityProps = {
  asVariable: true
};

const toggleSelect = (state, {entityType, id, selected}) => state.updateIn(['entities', entityType, id, 'selected'], current => isNil(selected) ? !current : selected);

const deselectAll = state => state.update('entities', entities => entities.map(subgroup => subgroup.map(entity => entity.set('selected', false))));

const registerResource = (state, {entityType, id, data}) => state.updateIn(['entities', entityType, id], old => (old || new Map(defaultEntityProps)).merge(fromJS(data)));

const toggleOptional = (state, {id, optional}) => state.setIn(['entities', entityTypes.property, id, 'optional'], optional);
const toggleAsVariable = (state, {id, asVariable}) => state.setIn(['entities', entityTypes.property, id, 'asVariable'], asVariable);
const savePropertyName = (state, {id, name}) => state.setIn(['entities', entityTypes.property, id, 'name'], name);
const clearData = () => initialState;

const loadView = (state, {json}) =>
  Object.entries(json).reduce((newState, [entityType, entities]) =>
    Object.entries(entities).reduce((subState, [id, props]) =>
        subState.updateIn(['entities', entityType], i => i.merge(fromJS({[id]: props}))),
      newState),
  state);

const handlers = {
  [Actions.Types.R_TOGGLE_SELECT]: toggleSelect,
  [Actions.Types.R_DESELECT_ALL]: deselectAll,
  [Actions.Types.R_REGISTER_RESOURCE]: registerResource,
  [Actions.Types.R_TOGGLE_PROPERTY_OPTIONAL]: toggleOptional,
  [Actions.Types.R_TOGGLE_PROPERTY_AS_VARIABLE]: toggleAsVariable,
  [Actions.Types.R_SAVE_PROPERTY_NAME]: savePropertyName,
  [Actions.Types.R_CLEAR_DATA]: clearData,
  [Actions.Types.R_VIEW_LOADED]: loadView
};

export default (state = initialState, action) => {
  let newState = state;
  if (typeof handlers[action.type] === 'function') {
    newState = handlers[action.type](state, action);
  }

  const dirty = newState
    .get('entities')
    .some(x => x.reduce((acc, e) => e.get('selected') || acc, false));
  newState = newState.set('dirty', dirty);

  return newState;
};
