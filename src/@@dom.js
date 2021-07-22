/**
 * @file Contains helper functions for dealing with DOM
 * @module @@dom
 */
import { pipe, path } from 'ramda';

/**
 * Wraps a function so that it's called directly with a value from target for DOM events
 * @function
 * @param fn
 */
export const fromEvent = fn => pipe(path(['target', 'value']), fn);
