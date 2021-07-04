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
  values,
  groupBy,
  uniqBy,
  mergeLeft,
  without,
  cond,
  T,
  identity,
  any, paths
} from 'ramda';
import { entityTypes } from '@@constants/entity-types';
import { getSuffix } from '@@data/parsePrefix';

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
  description: '',
  cartesianProduct: false,
  propertyLanguages: [],
  prefixes: {}
};

const defaultEntityProps = {
  [entityTypes.property]: {
    asVariable: true,
    selected: false
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
  },
  [entityTypes.edge]: {
    selected: false
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

export const prefixes = forKey('prefixes');
export const prefixById = id => compose(prefixes, lensProp(id));
export const classes = compose(entities, lensProp(entityTypes.class));
export const properties = compose(entities, lensProp(entityTypes.property));
export const edges = compose(entities, lensProp(entityTypes.edge));
const byTypeAndId = curry((type, id) => compose(entitiesByType[type], lensProp(id)));
const byTypeAndIds = curry((type, ids) => compose(entitiesByType[type], lens(pick(ids), (val, obj) => ids.reduce((acc, id) => Object.assign({}, acc, {[id]: val}), obj))));
export const propertiesByIds = byTypeAndIds(entityTypes.property);
export const propertyById = byTypeAndId(entityTypes.property);
export const propertyTargetById = id => compose(propertyById(id), lensProp('target'));
export const classById = byTypeAndId(entityTypes.class);
export const edgeById = byTypeAndId(entityTypes.edge);
const propertyIdsByClassId = id => compose(classById(id), lensProp('propertyIds'));
export const propertyLanguages = forKey('propertyLanguages');

export const endpoint = forKey('endpoint');
export const dataSchemaURL = forKey('dataSchemaURL');
export const filename = forKey('filename');
export const description = forKey('description');
export const customPrefixes = forKey('customPrefixes');
export const cartesianProduct = forKey('cartesianProduct');
export const customPrefixById = id => compose(customPrefixes, lensProp(id));

const entitiesByType = {
  [entityTypes.class]: classes,
  [entityTypes.property]: properties,
  [entityTypes.edge]: edges
};
export const selectionOrder = forKey('selectionOrder');

const update = curry((type, key, id, value, s) => set(compose(byTypeAndId(type, id), lensProp(key)), value, s));
const updateProperty = update(entityTypes.property);
const updateClass = update(entityTypes.class);
const updateEdge = update(entityTypes.edge);

export const togglePropertyOptional = updateProperty('optional');
export const togglePropertyAsVariable = curry((id, asVariable, s) => {
  const {target, dataProperty} = view(propertyById(id), s);

  if (dataProperty) {
    return updateProperty('asVariable', id, asVariable, s);
  } else {
    return toggleClassSelected(target, asVariable, s);
  }
});
export const savePropertyName = updateProperty('varName');
export const toggleClassHidden = updateClass('hidden');
export const toggleClassExpanded = updateClass('expanded');
export const toggleClassAsVariable = updateClass('asVariable');
export const toggleEdgeHighlighted = updateEdge('highlighted');
export const unhighlightEdges = cond([
  [pipe(view(edges), values, any(prop('highlighted'))), over(edges, map(assoc('highlighted', false)))],
  [T, identity]
]);

const getLanguageField = (languageOrder, field, data) => paths(languageOrder.map(l => [l, field]), data).find(a => a);

export const updateLanguageInfo = curry((language, e) => {
  const languageOrder = [language, 'en', 'de', 'default'];

  const info = e.info || {};

  // Object.assign({}, ...) to get a new copy
  return Object.assign({}, e, {
    info: {
      ...info,
      label: getLanguageField(languageOrder, 'label', e.info.byLanguage),
      description: getLanguageField(languageOrder, 'description', e.info.byLanguage)
    }
  })
});

export const updateLanguageInfos = curry((language, entities) => updateClasses(map(updateLanguageInfo(language), entities)));

export const updateClassName = curry((id, newName, s) => {
  const updated = map(assoc('varName', newName), getPropertiesByTarget(id, s))
  s = over(properties, mergeLeft(updated), s);
  return updateClass('varName', id, newName)(s);
});

const updateSelected = curry((type, id, selected, s) => {
  s = update(type, 'selected', id, selected)(s);
  const order = view(selectionOrder, s);
  if (selected) {
    return set(selectionOrder, uniq(order.concat(id)), s);
  }

  order.splice(order.indexOf(id), 1);
  return set(selectionOrder, order, s);
});

export const togglePropertySelected = curry((id, selected, s) => {
  const property = view(propertyById(id), s);
  const {source, target, dataProperty} = property;
  const propertyIds = E.propertyIds(view(classById(source), s));
  const selectedPropertiesCount = values(view(propertiesByIds(propertyIds), s)).filter(P.selected).length;

  // Select/deselect source entity if the property is the first/last one being changed
  if (selectedPropertiesCount === 0 && selected) {
    s = toggleClassSelected(source, true, s);
  } else if (selectedPropertiesCount === 1 && !selected) {
    s = toggleClassSelected(source, false, s);
  }

  const sameTargetPropsSelectedCount = keys(filter(prop('selected'), getPropertiesByTarget(target, s))).length;
  // Select/deselect target entity if the property is the first/last one being changed
  if (!dataProperty) {
    if (sameTargetPropsSelectedCount === 0 && selected) {
      s = toggleClassSelected(target, true, s);
    } else if (sameTargetPropsSelectedCount === 1 && !selected) {
      s = toggleClassSelected(target, false, s);
    }
  }

  return updateSelected(entityTypes.property, id, selected, s);
});

export const toggleClassSelected = curry((id, selected, s) => {
  const properties = getPropertiesByTarget(id, s);

  const withUpdatedClass = updateSelected(entityTypes.class, id, selected, s);
  return keys(properties).reduce((acc, id) => updateProperty('asVariable', id, selected, acc), withUpdatedClass);
});

export const toggleSelected = (type, ...args) => {
  if (type === entityTypes.property) {
    return togglePropertySelected(...args);
  }
  if (type === entityTypes.class) {
    return toggleClassSelected(...args)
  }
  if (type === entityTypes.edge) {
    return update(entityTypes.edge, 'selected', ...args);
  }
}

export const getSelectedProperties = pipe(view(properties), filter(P.selected), values);
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
    return updateProperty('varName', id, varName)(acc);
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
  const {ids, state} = propertyIds.reduce(({ids, state}, propertyId) => {
    const property = mergeRight(view(propertyById(propertyId), state), defaultEntityProps[entityTypes.property]);
    const propSuffix = getSuffix(property.predicate);
    const entitySuffix = getSuffix(source)

    Object.assign(property, {
      source,
      varName: `${entitySuffix}_${propSuffix}` // Since the property is duplicate, prefix it with the varName
    });
    const newId = `property_${source}-${property.predicate}-${property.target}`;

    return {
      ids: ids.concat(newId),
      state: set(propertyById(newId), property, state)
    };
  }, {ids: [], state: s})

  return {ids, state};
});

const createNewPropertiesForTargetType = curry(({type: targetType, id: target, varName}, s) => {
  const properties = getPropertiesByTargetType(targetType, s);
  const propertiesBySource = map(pipe(values, uniqBy(prop('predicate'))), groupBy(P.source, values(properties)))

  return Object.entries(propertiesBySource).reduce((acc, [source, properties]) => {
    const pIds = view(classById(source), s).propertyIds;
    s = values(properties).reduce((acc, p) => {
      const property = mergeRight(p, defaultEntityProps[entityTypes.property])
      const newId = `property_${source}-${property.predicate}-${target}`;
      property.target = target;
      property.varName = varName;
      pIds.push(newId);
      return set(propertyById(newId), property, acc);
    }, s);

    return set(propertyIdsByClassId(source), pIds, s);
  }, s);
});

const createNewClassInstance = (id, s) => {
  const entity = view(classById(id), s);
  const newId = suffixId(classById, s, entity.type || id);

  const typeCount = Object.keys(filter(propEq('type', entity.type), view(classes, s))).length;
  const varName = `${entity.type.replace(/.*:/, '')}_${typeCount}`;

  s = createNewPropertiesForTargetType({type: entity.type, id: newId, varName}, s)

  // Keep info intact
  const toRegister = Object.assign({}, entity, defaultEntityProps[entityTypes.class], {info: entity.info});
  const {ids: propertyIds, state} = registerProperties(newId, entity.propertyIds, s);

  return {
    newId,
    instance: Object.assign(toRegister, {
      dummy: true,
      type: entity.type,
      propertyIds,
      varName,
      id: newId
    }),
    state
  }
}

export const registerNewClass = curry((id, s) => {
  const {newId, instance, state} = createNewClassInstance(id, s);

  return set(classById(newId), instance, state);
});

export const registerNewClassWithCallback = curry((id, callback, s) => {
  const {newId, instance, state} = createNewClassInstance(id, s);
  const propertiesOfWhichTarget = getPropertiesByTarget(newId, state);
  const propertiesOfWhichSource = view(propertiesByIds(instance.propertyIds), state);
  const properties = Object.assign(propertiesOfWhichSource, propertiesOfWhichTarget);
  callback({newId, instance, properties});
  return set(classById(newId), instance, state);
});

export const getPropertiesByTarget = curry((id, s) => filter(propEq('target', id), view(properties, s)));
const getPropertiesByTargetType = curry((id, s) => filter(propEq('targetType', id), view(properties, s)));

export const deleteClass = curry((id, s) => {
  const propertiesWithTarget = getPropertiesByTarget(id, s);
  const propertyIdsToRemove = keys(propertiesWithTarget).concat(view(propertyIdsByClassId(id), s));
  const sourceIds = uniq(values(propertiesWithTarget).map(P.source));

  const newClasses = sourceIds.reduce((acc, sourceId) => {
    const entity = view(classById(sourceId), s);
    return Object.assign(acc, {
      [sourceId]: assoc('propertyIds', without(propertyIdsToRemove, entity.propertyIds), entity)
    })
  }, {});

  return pipe(
    over(properties, omit(propertyIdsToRemove)),
    over(classes, mergeLeft(newClasses)),
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

  return over(classes, mapObjIndexed((c, id) => assoc('hidden', !E.selected(c) && !toKeepShown[id] , c)), s);
}
