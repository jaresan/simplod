import {
  compose,
  lensProp,
  curry,
  filter,
  view,
  pipe,
  keys,
  prop,
  set,
  map,
  assoc,
  mergeDeepRight,
  mergeRight,
  uniq, partition,
} from 'ramda';
import { entityTypes } from '@@model/entity-types';

export const initial = {
  entities: {
    ...Object.keys(entityTypes).reduce((acc, type) => Object.assign(acc, {[type]: {}}), {})
  },
  dirty: false,
  selectionOrder: [],
  endpoint: '',
  dataSchemaURL: '',
  filename: 'Untitled'
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
    },
    propertyIds: [],
    hidden: false,
    expanded: false
  }
};

const E = {
  selected: prop('selected')
};

const P = {
  target: prop('target')
}

const root = 'model';
export const rootLens = lensProp(root);

const forKey = k => compose(rootLens, lensProp(k));

export const dirty = forKey('dirty');
export const entities = forKey('entities');
export const classes = compose(entities, lensProp(entityTypes.class));
export const properties = compose(entities, lensProp(entityTypes.property));
export const edges = compose(entities, lensProp(entityTypes.edge));
export const endpoint = forKey('endpoint');
export const dataSchemaURL = forKey('dataSchemaURL');
export const filename = forKey('filename');
const entitiesByType = {
  [entityTypes.class]: classes,
  [entityTypes.property]: properties,
  [entityTypes.edge]: edges
};
export const selectionOrder = forKey('selectionOrder');

const update = curry((type, key, id, value) => set(compose(byTypeAndId(type, id), lensProp(key)), value));
const updateProperty = update(entityTypes.property);
const updateClass = update(entityTypes.class);

// FIXME: Move to /property.js and use lensProp
export const togglePropertyOptional = updateProperty('optional');
export const togglePropertyAsVariable = updateProperty('asVariable');
export const savePropertyName = updateProperty('varName');
export const toggleClassHidden = updateClass('hidden');
export const toggleClassExpanded = updateClass('expanded');
export const toggleClassAsVariable = updateClass('asVariable');
export const updateClassName = updateClass('varName');

const updateSelected = curry((type, id, selected, s) => {
  // FIXME: @reference Not 'selected', use a reference
  s = update(type, 'selected', id, selected)(s);
  const order = view(selectionOrder, s);
  if (selected) {
    return set(selectionOrder, order.concat(id), s);
  }

  order.splice(order.indexOf(id), 1);
  return set(selectionOrder, order, s);
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

export const toggleSelected = (type, ...args) => {
  if (type === entityTypes.property) {
    return togglePropertySelected(...args);
  }
  if (type === entityTypes.class) {
    return toggleClassSelected(...args)
  }
  if (type === entityTypes.edge) {
    // @reference don't use 'selected'
    return update(entityTypes.edge, 'selected', ...args);
  }
}

const byTypeAndId = curry((type, id) => compose(entitiesByType[type], lensProp(id)));
export const propertyById = byTypeAndId(entityTypes.property);
export const classById = byTypeAndId(entityTypes.class);

export const getSelectedClasses = pipe(view(classes), filter(E.selected));
export const getSelectedEntities = pipe(view(entities), map(filter(E.selected)));
export const clearData = set(rootLens, initial);
export const setBoundingBoxes = curry((boxesById, state) => {
  const toUpdate = view(classes, state);
  const updated = mergeDeepRight(toUpdate, boxesById);

  return set(classes, updated, state);
});
export const deselectAll = s => {
  const toDeselect = view(entities, s);
  // FIXME: @reference Use reference instead of 'selected'
  const newEntities = map(map(assoc('selected', false)), toDeselect);
  return pipe(set(entities, newEntities), set(selectionOrder, []))(s);
};
export const toggleSelections = curry((type, selection, s) => {
  const entityLens = entitiesByType[type];
  const oldEntities = view(entityLens, s);

  // Change selection order if properties or classes are selected
  if (type !== entityTypes.edge) {
    const oldSelected = view(selectionOrder, s);
    const [newSelected, newDeselected] = partition(E.selected, selection);
    const newSelectionOrder = oldSelected.concat(keys(newSelected)).filter(id => !newDeselected[id]);
    s = set(selectionOrder, uniq(newSelectionOrder), s);
  }

  return set(entityLens, mergeDeepRight(oldEntities, selection), s);
});
export const updateClasses = curry((newClasses, s) => {
  const oldClasses = view(classes, s);
  return set(classes, mergeRight(oldClasses, newClasses), s);
});
export const registerResources = curry((entityType, resources, s) => {
  const withDefaultProps = map(mergeRight(defaultEntityProps[entityType] || {}), resources);
  return set(entitiesByType[entityType], withDefaultProps, s);
});

export const loadView = curry((json, s) => set(entities, mergeDeepRight(view(entities, s), json), s));

export const middleware = (oldState, newState) => {
  // Return changed state if it was a changed cause by setting the 'dirty' flag
  if (view(dirty, oldState) !== view(dirty, newState)) {
    return newState;
  }
  if (view(rootLens, oldState) !== view(rootLens, newState)) {
    return set(dirty, true, newState);
  }
  return newState;
};
