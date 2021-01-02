import {fromJS} from 'immutable';
import Actions from '@@actions/model';
import { mergeRight, map, curry, pick } from 'ramda';
import { entityTypes } from '@@constants/entityTypes';

const initialState = fromJS({
  entities: {
    ...Object.keys(entityTypes).reduce((acc, type) => Object.assign(acc, {[type]: {}}), {})
  },
  dirty: false,
  selectionOrder: [],
  language: navigator.language,
  showHumanReadable: false,
  limitEnabled: false,
  limit: 100,
  lastSave: 0
});

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

const handlers = {
  [Actions.Types.R_TOGGLE_PROPERTY_SELECTED]: updatePropertySelected,
  [Actions.Types.R_TOGGLE_PROPERTY_OPTIONAL]: updateProperty('optional'),
  [Actions.Types.R_TOGGLE_PROPERTY_AS_VARIABLE]: updateProperty('asVariable'),
  [Actions.Types.R_SAVE_PROPERTY_NAME]: updateProperty('varName'),
  [Actions.Types.R_UPDATE_PROPERTY_POSITIONS]: updatePropertyPositions,
  [Actions.Types.R_TOGGLE_ENTITY_HIDDEN]: updateEntity('hidden'),
  [Actions.Types.R_TOGGLE_ENTITY_SELECTED]: updateEntitySelected,
  [Actions.Types.R_TOGGLE_ENTITY_AS_VARIABLE]: updateEntity('asVariable'),
  [Actions.Types.R_UPDATE_ENTITY_NAME]: updateEntity('varName')
};

export default (state = initialState, action) => {
  let newState = state;
  if (typeof handlers[action.type] === 'function') {
    newState = handlers[action.type](state, action);
  } else if (action.__customSetterModel) {
    const {key, value} = action.payload;
    newState = state.set(key, value);
  }

  return newState;
};
