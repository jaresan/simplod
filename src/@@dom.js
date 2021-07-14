import { pipe, path } from 'ramda';

export const fromEvent = fn => pipe(path(['target', 'value']), fn);
