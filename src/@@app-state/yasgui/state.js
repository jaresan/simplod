import { fromJS } from 'immutable';
import { compose, curry, lens, lensProp } from 'ramda';

export const initial = fromJS({
  prefixes: {},
  endpoint: '',
  query: '',
  simpleQuery: ''
});

export const root = lensProp('yasgui');

// FIXME: Replace with normal lensprop once refactored
const lensForImmutable = k => lens(s => s.get(k), curry((v, s) => s.set(k, fromJS(v))));

const forKey = k => compose(root, lensForImmutable(k));

export const prefixes = forKey('prefixes');
export const query = forKey('query');
export const endpoint = forKey('endpoint');
export const simpleQuery = forKey('simpleQuery');
