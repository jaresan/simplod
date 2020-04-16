import {keys, curry} from 'ramda';

export const mapKeys = curry((mapFn, obj) => keys(obj).reduce((acc, key) => Object.assign(acc,  {[mapFn(key)]: obj[key]}), {}));
