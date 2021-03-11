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
  omit,
  propEq,
  mapObjIndexed,
  values
} from 'ramda';
import { entityTypes } from '@@model/entity-types';

export const initial = {
  entities: {
    ...Object.keys(entityTypes).reduce((acc, type) => Object.assign(acc, {[type]: {}}), {})
  },
  customPrefixes: {},
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
  propertyIds: prop('propertyIds'),
  hidden: prop('hidden')
};

const P = {
  target: prop('target'),
  id: prop('id'),
  dataProperty: prop('dataProperty'),
  selected: prop('selected'),
  source: prop('source')
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
export const customPrefixes = forKey('customPrefixes');
export const customPrefixById = id => compose(customPrefixes, lensProp(id));

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
export const propertyTargetById = id => compose(propertyById(id), lensProp('target'));
const getSelectedProperties = pipe(view(properties), filter(P.selected), values);
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

const registerProperties = curry((source, propertyIds, s) => {
  const getNewId = suffixId(propertyById, s);
  const {ids, state} = propertyIds.reduce(({ids, state}, id) => {
    const property = mergeRight(view(propertyById(id), state), defaultEntityProps[entityTypes.property]);
    Object.assign(property, {
      source
    });
    const newId = getNewId(id);

    return {
      ids: ids.concat(newId),
      state: set(propertyById(newId), property, state)
    };
  }, {ids: [], state: s})

  return {ids, state};
});

const assignPropertyTargets = curry((newTarget, propertyIds, s) =>
  propertyIds.reduce((acc, id) => set(propertyTargetById(id), newTarget, acc), s));

const createNewClassInstance = (id, s) => {
  const entity = view(classById(id), s);

  // Keep info intact
  const toRegister = Object.assign({}, entity, defaultEntityProps[entityTypes.class], {info: entity.info});
  const newId = suffixId(classById, s, entity.type || id);
  const {ids: propertyIds, state} = registerProperties(newId, entity.propertyIds, s);

  const typeCount = Object.keys(filter(propEq('type', entity.type), view(classes, s))).length;
  const varName = `${entity.type.replace(/.*:/, '')}_${typeCount}`;

  return {
    newId,
    instance: Object.assign(toRegister, {
      dummy: true,
      type: entity.type,
      propertyIds,
      varName
    }),
    state
  }
}

export const registerNewClass = curry((id, s) => {
  const {newId, instance, state} = createNewClassInstance(id, s);

  return set(classById(newId), instance, state);
});

export const getPropertiesByTarget = curry((id, s) => filter(propEq('target', id), view(properties, s)));

export const deleteClass = curry((id, s) => {
  const entity = view(classById(id), s);
  const propertyIds = E.propertyIds(entity);
  const newTarget = keys(filter(e => e !== entity && e.type === entity.type, view(classes, s)))[0];
  const propertyIdsToReassign = keys(getPropertiesByTarget(id, s));

  return pipe(
    assignPropertyTargets(newTarget, propertyIdsToReassign),
    over(properties, omit(propertyIds)),
    over(classes, omit([id]))
  )(s);
});

export const changePropertyTarget = curry((id, newTarget, s) => set(propertyTargetById(id), newTarget, s));
export const createNewPropertyTarget = curry((id, s) => {
  const currentTargetId = view(propertyTargetById(id), s);
  const {newId, instance, state} = createNewClassInstance(currentTargetId, s);

  const registerNewTarget = set(classById(newId), instance);
  const changeTarget = set(propertyTargetById(id), newId);

  return pipe(registerNewTarget, changeTarget)(state);
});

export const showAll = over(classes, map(assoc('hidden', false)));

export const hideUnselected = s => {
  const toKeepShown = getSelectedProperties(s).reduce((acc, p) => Object.assign(acc, {
    [P.target(p)]: true,
    [P.source(p)]: true
  }), {});

  console.log(toKeepShown, getSelectedProperties(s));

  return over(classes, mapObjIndexed((c, id) => assoc('hidden', !E.selected(c) && !toKeepShown[id] , c)), s);
}
