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
  lens,
  pick,
  over,
  omit, invertObj
} from 'ramda';
import { entityTypes } from '@@model/entity-types';
import * as YasguiState from '@@app-state/yasgui/state';
import * as SettingsState from '@@app-state/settings/state';
import possiblePrefixes from '@@constants/possible-prefixes';

export const initial = {
  entities: {
    ...Object.keys(entityTypes).reduce((acc, type) => Object.assign(acc, {[type]: {}}), {})
  },
  dirty: false,
  selectionOrder: [],
  endpoint: '',
  dataSchemaURL: '',
  filename: 'Untitled',
  description: ''
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
    dummy: false, // False - node is displayed in the graph, true - node is just present to allow for linking properties to additional objects
    propertyIds: [],
    hidden: false,
    expanded: false
  }
};

const E = {
  selected: prop('selected'),
  varName: prop('varName'),
  propertyIds: prop('propertyIds')
};

const P = {
  target: prop('target'),
  id: prop('id'),
  dataProperty: prop('dataProperty')
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
export const description = forKey('description');

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
    return set(selectionOrder, uniq(order.concat(id)), s);
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
const byTypeAndIds = curry((type, ids) => compose(entitiesByType[type], lens(pick(ids), (val, obj) => ids.reduce((acc, id) => Object.assign({}, acc, {[id]: val}), obj))));
export const propertiesByIds = byTypeAndIds(entityTypes.property);
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

export const bindProperties = curry((propertyIds, state) => {
  if (!propertyIds || !propertyIds.length) {
    propertyIds = Object.keys(view(properties, state));
  }

  return propertyIds.reduce((acc, id) => {
    const property = view(propertyById(id), acc);
    if (P.dataProperty(property)) {
      return acc;
    }
    const target = P.target(property);
    const targetClass = view(classById(target), acc);
    const varName = E.varName(targetClass);
    return pipe(updateProperty('bound', id, true), updateProperty('varName', id, varName))(acc);
  }, state);
});

export const loadView = curry((json, s) => set(entities, mergeDeepRight(view(entities, s), json), s));

const suffixId = curry((getterFn, state, id) => {
  let i = 1;
  while (view(getterFn(`${id}_${i}`), state)) {
    i++;
  }
  return `${id}_${i}`;
});

const registerProperties = (sourceType, source, propertyIds, s) => {
  const getNewId = suffixId(propertyById, s);
  const {ids, state} = propertyIds.reduce(({ids, state}, id) => {
    const property = mergeRight(view(propertyById(id), state), defaultEntityProps[entityTypes.property]);
    Object.assign(property, {
      sourceType,
      source
    });
    const newId = getNewId(id);

    return {
      ids: ids.concat(newId),
      state: set(propertyById(newId), property, state)
    };
  }, {ids: [], state: s})

  return {ids, state};
};

export const registerNewClass = curry((id, s) => {
  const entity = view(classById(id), s);
  const toRegister = Object.assign({}, entity, defaultEntityProps[entityTypes.class]);
  const newId = suffixId(classById, s, entity.type || id);

  const {ids: propertyIds, state} = registerProperties(entity.type || id, newId, entity.propertyIds, s);
  Object.assign(toRegister, {
    dummy: true,
    propertyIds,
    type: id
  })

  return set(classById(newId), toRegister, state);
});
window.registerNewClass = registerNewClass;

export const deleteClass = curry((id, s) => {
  const propertyIds = E.propertyIds(view(classById(id), s));

  return pipe(over(properties, omit(propertyIds)), over(classes, omit([id])))(s);
});

export const middleware = curry((oldState, newState) => {
  const state = set(dirty, view(dirty, newState), newState);
  // Return original changed state if it was a change cause by setting the 'dirty' flag
  if (view(dirty, oldState) !== view(dirty, newState)) {
    return state;
  }
  // Set dirty to true if the change was made to the model state
  if (view(rootLens, oldState) !== view(rootLens, newState)) {
    return set(dirty, true, newState);
  }

  return state;
});
