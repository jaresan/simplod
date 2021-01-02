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
  mergeRight
} from 'ramda';
import {fromJS} from 'immutable';
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

// FIXME: @immutable
export const middleware = s => {
  const isDirty = view(entities, s).some(x => x.some(e => e.get('selected')));
  return set(dirty, isDirty, s);
};

const root = 'model';
export const rootLens = lensProp(root);

// FIXME: @immutable Replace with normal lensprop once refactored
const lensForImmutable = k => lens(s => s.get(k), curry((v, s) => s.set(k, fromJS(v))));

const forKey = k => compose(rootLens, lensForImmutable(k));

export const lastSave = forKey('lastSave');
export const labelsLoadingProgress = forKey('labelsLoadingProgress');
export const limit = forKey('limit');
export const limitEnabled = forKey('limitEnabled');
export const showHumanReadable = forKey('showHumanReadable');
export const language = forKey('language');
export const dirty = forKey('dirty');
export const entities = forKey('entities');
export const classes = compose(entities, lensForImmutable(entityTypes.class));
export const properties = compose(entities, lensForImmutable(entityTypes.property));
export const edges = compose(entities, lensForImmutable(entityTypes.edge));
const entitiesByType = {
  [entityTypes.class]: classes,
  [entityTypes.property]: properties,
  [entityTypes.edge]: edges
};
export const selectionOrder = forKey('selectionOrder');

const update = curry((type, key, id, value) => set(compose(byTypeAndId(type, id), lensForImmutable(key)), value));
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
  s = update(type, 'selected', id, selected)(s);
  // @immutable
  const order = view(selectionOrder, s);
  if (selected) {
    return set(selectionOrder, order.concat(id), s);
  }

  return set(selectionOrder, order.remove(order.indexOf(id)), s);
});

export const togglePropertySelected = updateSelected(entityTypes.property);

export const toggleClassSelected = curry((id, selected, state) => {
  state = updateSelected(entityTypes.class, id, selected, state);
  const oldProperties = view(properties, state);
  const newProperties = oldProperties.map(property => {
    const target = view(classById(property.get('target')), state);

    if (target && target.get('selected')) {
      return property.set('bound', true);
    }

    return property.set('bound', false);
  });
  return set(properties, newProperties, state);
});

const byTypeAndId = curry((type, id) => compose(entitiesByType[type], lensForImmutable(id)));
export const propertyById = byTypeAndId(entityTypes.property);
export const classById = byTypeAndId(entityTypes.class);

// FIXME: @immutable
export const getSelectedClasses = pipe(view(classes), filter(e => e.get('selected')), res => res.toJS());
export const getSelectedEntities = pipe(view(entities), e => e.toJS(), Object.entries, reduce((acc, [type, entities]) => Object.assign(acc, {[type]: filter(prop('selected'), entities)}), {}));
export const clearData = set(rootLens, fromJS(initial));
export const deselectAll = s => {
  const toDeselect = view(entities, s).toJS();
  const newEntities = map(map(assoc('selected', false)), toDeselect);
  return pipe(set(entities, newEntities), set(selectionOrder, []))(s);
};
export const toggleSelections = curry((type, selection, s) => {
  const entityLens = entitiesByType[type];
  const oldEntities = view(entityLens, s).toJS();
  return set(entityLens, mergeDeepRight(oldEntities, selection), s);
});
export const updateClasses = curry((newClasses, s) => {
  // performance issues with ramda
  return {
    ...s,
    [root]: s[root].mergeDeepIn(['entities', entityTypes.class], fromJS(newClasses))
  };
  const oldClasses = view(classes, s);

  return set(classes, oldClasses.merge(newClasses), s);
});
export const registerResources = curry((entityType, resources, s) => {
  const withDefaultProps = map(mergeRight(defaultEntityProps[entityType] || {}), resources);
  return {
    ...s,
    [root]: s[root].setIn(['entities', entityType], fromJS(withDefaultProps))
  };
});
export const loadView = curry((json, s) => {
  const substate = Object.entries(json).reduce((newState, [entityType, entities]) =>
    Object.entries(entities).reduce((subState, [id, props]) =>
        subState.updateIn(['entities', entityType], i => i.merge(fromJS({[id]: props}))),
      newState),
    s[root]);
  return {
    ...s,
    [root]: substate
  };
});

