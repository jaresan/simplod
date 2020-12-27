import {fromJS} from 'immutable';
import Actions from 'src/actions/model';
import { mergeRight, map, curry } from 'ramda';
import { entityTypes } from 'src/constants/entityTypes';

const initialState = fromJS({
  entities: {
    ...Object.keys(entityTypes).reduce((acc, type) => Object.assign(acc, {[type]: {}}), {})
  },
  dirty: false,
  selectionOrder: [],
  language: navigator.language,
  loadingHumanReadable: 0,
  showHumanReadable: false,
  limitEnabled: false,
  limit: 100,
  lastSave: 0
});

// TODO: Add possible entity props description
const defaultEntityProps = {
  [entityTypes.property]: {
    asVariable: true,
    selected: false,
    bound: false
  },
  [entityTypes.class]: {
    selected: false,
    asVariable: true,
    name: '',
    info: {
      label: '', // From remote
      description: '' // From remote
    }
  }
};

const getProperty = (state, id, additionalPath = []) => state.getIn(['entities', entityTypes.property, id, ...additionalPath]);
const getEntity = (state, id, additionalPath = []) => state.getIn(['entities', entityTypes.class, id, ...additionalPath]);

const updateEntities = (state, {items}) => state.mergeDeepIn(['entities', entityTypes.class], items);
const toggleSelections = (state, {entityType, selection}) => state.mergeDeepIn(['entities', entityType], selection);

const connectProperties = state => {
  const propsById = state.getIn(['entities', entityTypes.property])
    .reduce((acc, p, id) => {
      const source = p.get('source');
      const existing = acc[source] || [];

      return Object.assign(acc, {[source]: existing.concat(id)});
    }, {});

  return state.updateIn(['entities', entityTypes.class], classes => classes.map((c, id) => c.set('propertyIds', propsById[id])));
}

const deselectAll = state => state.update('entities', entities => {
  return Object.keys(entityTypes).reduce((acc, type) => {
    const ids = acc.get(type).keySeq();
    return ids.reduce((acc2, id) => acc2.setIn([type, id, 'selected'], false), acc)
  }, entities);
}).set('selectionOrder', fromJS([]));

const registerResources = (state, {entityType, resources}) => {
  const withDefaultProps = map(mergeRight(defaultEntityProps[entityType] || {}), resources);
  return state.setIn(['entities', entityType], fromJS(withDefaultProps));
}

const updatePropertyPositions = (state, {propertyIds}) => {
  const updatePosition = updateProperty('position');

  return propertyIds.reduce((acc, id, position) => updatePosition(acc, {id, position}), state);
};

const update = curry((type, key, state, {id, [key]: value}) => state.setIn(['entities', type, id, key], value));
const updateProperty = update(entityTypes.property);
const updateEntity = update(entityTypes.class);

const updateSelected = (state, {id, selected}) => {
  const order = state.get('selectionOrder');
  if (selected) {
    return state.set('selectionOrder', order.push(id));
  }

  return state.set('selectionOrder', order.remove(order.indexOf(id)));
};
const updatePropertySelected = (state, {id, selected}) => updateSelected(updateProperty('selected', state, {id, selected}), {id, selected});
const updateEntitySelected = (state, {id, selected}) => {
  state = updateSelected(updateEntity('selected', state, {id, selected}), {id, selected});
  state = state.updateIn(['entities', entityTypes.property], properties =>
    properties.map(property => {
      const target = state.getIn(['entities', entityTypes.class, property.get('target')]);

      if (target && target.get('selected')) {
        return property.set('bound', true);
      }

      return property.set('bound', false);
    })
  )
  return state;
}
const updateSelectionOrder = (state, {selectionIds}) => state.set('selectionOrder', fromJS(selectionIds));
const clearData = () => initialState;
const updateLimit = (state, {limit}) => state.set('limit', limit);
const updateLanguage = (state, {language}) => state.set('language', language);
const setLoadingHumanReadableData = (state, {loading}) => state.set('loadingHumanReadable', loading);
const toggleHumanReadable = (state, {show}) => state.set('showHumanReadable', show);

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
  [Actions.Types.R_TOGGLE_PROPERTY_SELECTED]: updatePropertySelected,
  [Actions.Types.R_TOGGLE_PROPERTY_OPTIONAL]: updateProperty('optional'),
  [Actions.Types.R_TOGGLE_PROPERTY_AS_VARIABLE]: updateProperty('asVariable'),
  [Actions.Types.R_SAVE_PROPERTY_NAME]: updateProperty('varName'),
  [Actions.Types.R_UPDATE_PROPERTY_POSITIONS]: updatePropertyPositions,
  [Actions.Types.R_TOGGLE_ENTITY_HIDDEN]: updateEntity('hidden'),
  [Actions.Types.R_TOGGLE_ENTITY_SELECTED]: updateEntitySelected,
  [Actions.Types.R_TOGGLE_ENTITY_AS_VARIABLE]: updateEntity('asVariable'),
  [Actions.Types.R_UPDATE_ENTITY_NAME]: updateEntity('varName'),
  [Actions.Types.R_UPDATE_SELECTION_ORDER]: updateSelectionOrder,
  [Actions.Types.R_CLEAR_DATA]: clearData,
  [Actions.Types.R_VIEW_LOADED]: loadView,
  [Actions.Types.R_DATA_LOADED]: connectProperties,
  [Actions.Types.R_UPDATE_LIMIT]: updateLimit,
  [Actions.Types.R_LOAD_STATE]: (state, {json}) => fromJS(json),
  [Actions.Types.R_TOGGLE_SELECTIONS]: toggleSelections,
  [Actions.Types.R_SET_LANGUAGE]: updateLanguage,
  [Actions.Types.R_SET_LOADING_HUMAN_READABLE_DATA]: setLoadingHumanReadableData,
  [Actions.Types.R_TOGGLE_HUMAN_READABLE]: toggleHumanReadable,
  [Actions.Types.R_TOGGLE_LIMIT]: (state, {show}) => state.set('limitEnabled', show)
};

export default (state = initialState, action) => {
  let newState = state;
  if (typeof handlers[action.type] === 'function') {
    newState = handlers[action.type](state, action);
  } else if (action.__customSetter) {
    const {key, value} = action.payload;
    newState = state.set(key, value);
  }

  const dirty = newState
    .get('entities')
    .some(x => x.reduce((acc, e) => e.get('selected') || acc, false));
  newState = newState.set('dirty', dirty);

  return newState;
};
