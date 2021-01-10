import { compose, lensProp } from 'ramda';

export const initial = {
  prefixes: {},
  endpoint: '',
  query: '',
  dataSchemaURL: '',
  instance: null
};

export const root = lensProp('yasgui');

const forKey = k => compose(root, lensProp(k));

export const prefixes = forKey('prefixes');
export const query = forKey('query');
export const endpoint = forKey('endpoint');
export const dataSchemaURL = forKey('dataSchemaURL');
export const instance = forKey('instance');
