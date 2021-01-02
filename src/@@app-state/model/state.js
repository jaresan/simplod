import {compose, lensProp, curry, lens, filter, view, pipe, reduce, prop} from 'ramda';
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

export const root = lensProp('model');

// FIXME: Replace with normal lensprop once refactored
const lensForImmutable = k => lens(s => s.get(k), curry((v, s) => s.set(k, fromJS(v))));

const forKey = k => compose(root, lensForImmutable(k));

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
export const selectionOrder = forKey('selectionOrder');

export const propertyById = id => compose(properties, lensForImmutable(id));
export const classById = id => compose(classes, lensForImmutable(id));

// FIXME: @immutable
export const getSelectedClasses = pipe(view(classes), filter(e => e.get('selected')), res => res.toJS());
export const getSelectedEntities = pipe(view(entities), e => e.toJS(), Object.entries, reduce((acc, [type, entities]) => Object.assign(acc, {[type]: filter(prop('selected'), entities)}), {}));

