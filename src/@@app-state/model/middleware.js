import { curry, set, view } from 'ramda';
import { dirty, rootLens } from '@@app-state/model/state';

export const middleware = curry((oldState, newState) => {
  const state = set(dirty, view(dirty, newState), newState);
  // Return original changed state if it was a change cause by setting the 'dirty' flag
  if (view(dirty, oldState) !== view(dirty, newState)) {
    return state;
  }
  // Set dirty to true if the change was made to the model state
  if (view(rootLens, oldState) !== view(rootLens, newState)) {
    return set(dirty, true, newState);
  }

  return state;
});
