import {
  compose,
  lensProp,
  curry,
  lens,
  filter,
  view,
  pipe,
  reduce,
  prop,
  set,
  map,
  assoc,
  mergeDeepRight,
  mergeRight,
  any,
  values
} from 'ramda';
import { entityTypes } from '@@constants/entityTypes';

export const initial = {
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
};

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

const E = {
  selected: prop('selected')
};

const P = {
  target: prop('target')
}

export const middleware = s => {
  const isDirty = any(x => any(E.selected, values(x)), values(view(entities, s)));
  return set(dirty, isDirty, s);
};

const root = 'model';
export const rootLens = lensProp(root);

const forKey = k => compose(rootLens, lensProp(k));

export const lastSave = forKey('lastSave');
export const labelsLoadingProgress = forKey('labelsLoadingProgress');
export const limit = forKey('limit');
export const limitEnabled = forKey('limitEnabled');
export const showHumanReadable = forKey('showHumanReadable');
export const language = forKey('language');
export const dirty = forKey('dirty');
export const entities = forKey('entities');
export const classes = compose(entities, lensProp(entityTypes.class));
export const properties = compose(entities, lensProp(entityTypes.property));
export const edges = compose(entities, lensProp(entityTypes.edge));
const entitiesByType = {
  [entityTypes.class]: classes,
  [entityTypes.property]: properties,
  [entityTypes.edge]: edges
};
export const selectionOrder = forKey('selectionOrder');

const update = curry((type, key, id, value) => set(compose(byTypeAndId(type, id), lensProp(key)), value));
const updateProperty = update(entityTypes.property);
const updateEntity = update(entityTypes.class);

// FIXME: Move to /property.js and use lensProp
export const togglePropertyOptional = updateProperty('optional');
export const togglePropertyAsVariable = updateProperty('asVariable');
export const savePropertyName = updateProperty('varName');
export const toggleClassHidden = updateEntity('hidden');
export const toggleClassAsVariable = updateEntity('asVariable');
export const updateClassName = updateEntity('varName');

const updateSelected = curry((type, id, selected, s) => {
  // FIXME: @reference Not 'selected', use a reference
  s = update(type, 'selected', id, selected)(s);
  const order = view(selectionOrder, s);
  if (selected) {
    return set(selectionOrder, order.concat(id), s);
  }

  return set(selectionOrder, order.splice(order.indexOf(id), 1), s);
});

export const togglePropertySelected = updateSelected(entityTypes.property);

export const toggleClassSelected = curry((id, selected, state) => {
  state = updateSelected(entityTypes.class, id, selected, state);
  const oldProperties = view(properties, state);
  const newProperties = map(property => {
    const target = view(classById(P.target(property)), state);

    // FIXME: @reference Use reference
    property.bound = target && E.selected(target);
    return property;
  }, oldProperties);
  return set(properties, newProperties, state);
});

const byTypeAndId = curry((type, id) => compose(entitiesByType[type], lensProp(id)));
export const propertyById = byTypeAndId(entityTypes.property);
export const classById = byTypeAndId(entityTypes.class);

export const getSelectedClasses = pipe(view(classes), filter(E.selected));
export const getSelectedEntities = pipe(view(entities), map(filter(E.selected)));
export const clearData = set(rootLens, initial);
export const deselectAll = s => {
  const toDeselect = view(entities, s);
  // FIXME: @reference Use reference instead of 'selected'
  const newEntities = map(map(assoc('selected', false)), toDeselect);
  return pipe(set(entities, newEntities), set(selectionOrder, []))(s);
};
export const toggleSelections = curry((type, selection, s) => {
  const entityLens = entitiesByType[type];
  const oldEntities = view(entityLens, s);
  return set(entityLens, mergeDeepRight(oldEntities, selection), s);
});
export const updateClasses = curry((newClasses, s) => {
  // performance issues with ramda
  const oldClasses = view(classes, s);
  return set(classes, mergeRight(oldClasses, newClasses), s);
});
export const registerResources = curry((entityType, resources, s) => {
  const withDefaultProps = map(mergeRight(defaultEntityProps[entityType] || {}), resources);
  return set(entitiesByType[entityType], withDefaultProps, s);
});

export const loadView = curry((json, s) => set(entities, mergeDeepRight(view(entities, s), json), s));
