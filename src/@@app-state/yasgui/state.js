import { compose, lensProp } from 'ramda';

export const initial = {
  prefixes: {},
  endpoint: '',
  query: '',
  simpleQuery: ''
};

export const root = lensProp('yasgui');

const forKey = k => compose(root, lensProp(k));

export const prefixes = forKey('prefixes');
export const query = forKey('query');
export const endpoint = forKey('endpoint');
export const simpleQuery = forKey('simpleQuery');
