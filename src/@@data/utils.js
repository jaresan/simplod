import { keys, curry, pipe, path } from 'ramda';

export const mapKeys = curry((mapFn, obj) => keys(obj).reduce((acc, key) => Object.assign(acc,  {[mapFn(key)]: obj[key]}), {}));
export const fromEvent = fn => pipe(path(['target', 'value']), fn);
