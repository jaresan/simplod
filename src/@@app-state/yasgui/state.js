import { compose, lensProp } from 'ramda';

export const initial = {
  prefixes: {},
  query: '',
  instance: null
};

export const root = lensProp('yasgui');

const forKey = k => compose(root, lensProp(k));

export const prefixes = forKey('prefixes');
export const query = forKey('query');
export const instance = forKey('instance');
