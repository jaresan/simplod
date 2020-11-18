import {fromJS} from 'immutable';
import Actions from 'src/actions/model';
import { mergeRight, map } from 'ramda';
import { entityTypes } from 'src/constants/entityTypes';

const initialState = fromJS({
  entities: {
    ...Object.keys(entityTypes).reduce((acc, type) => Object.assign(acc, {[type]: {}}), {})
  },
  dirty: false
});

// TODO: Add possible entity props description
const defaultEntityProps = {
  [entityTypes.property]: {
    asVariable: true
  }
};

const updateEntities = (state, {items}) => state.mergeDeepIn(['entities'], items);

const connectProperties = state => {
  const propsById = state.getIn(['entities', entityTypes.property])
    .reduce((acc, p, id) => {
      const source = p.get('source');
      const existing = acc[source] || [];

      return Object.assign(acc, {[source]: existing.concat(id)});
    }, {});

  return state.updateIn(['entities', entityTypes.class], classes => classes.map((c, id) => c.set('propertyIds', propsById[id])));
}

const deselectAll = state => state.update('entities', entities => entities.map(subgroup => subgroup.map(entity => entity.set('selected', false))));

const registerResources = (state, {entityType, resources}) => {
  const withDefaultProps = map(mergeRight(defaultEntityProps[entityType] || {}), resources);
  return state.setIn(['entities', entityType], fromJS(withDefaultProps));
}

const toggleOptional = (state, {id, optional}) => state.setIn(['entities', entityTypes.property, id, 'optional'], optional);
const toggleAsVariable = (state, {id, asVariable}) => state.setIn(['entities', entityTypes.property, id, 'asVariable'], asVariable);
const toggleSelected = (state, {id, selected}) => state.setIn(['entities', entityTypes.property, id, 'selected'], selected);
const savePropertyName = (state, {id, name}) => state.setIn(['entities', entityTypes.property, id, 'name'], name);
const toggleEntityHidden = (state, {id, hidden}) => state.setIn(['entities', entityTypes.class, id, 'hidden'], hidden);
const clearData = () => initialState;

const loadView = (state, {json}) =>
  Object.entries(json).reduce((newState, [entityType, entities]) =>
    Object.entries(entities).reduce((subState, [id, props]) =>
        subState.updateIn(['entities', entityType], i => i.merge(fromJS({[id]: props}))),
      newState),
  state);

const handlers = {
  [Actions.Types.R_UPDATE_ENTITIES]: updateEntities,
  [Actions.Types.R_DESELECT_ALL]: deselectAll,
  [Actions.Types.R_REGISTER_RESOURCES]: registerResources,
  [Actions.Types.R_TOGGLE_PROPERTY_SELECTED]: toggleSelected,
  [Actions.Types.R_TOGGLE_PROPERTY_OPTIONAL]: toggleOptional,
  [Actions.Types.R_TOGGLE_PROPERTY_AS_VARIABLE]: toggleAsVariable,
  [Actions.Types.R_SAVE_PROPERTY_NAME]: savePropertyName,
  [Actions.Types.R_TOGGLE_ENTITY_HIDDEN]: toggleEntityHidden,
  [Actions.Types.R_CLEAR_DATA]: clearData,
  [Actions.Types.R_VIEW_LOADED]: loadView,
  [Actions.Types.R_DATA_LOADED]: connectProperties,
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

window.initialState = initialState;
