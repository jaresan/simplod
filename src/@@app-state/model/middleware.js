import { curry, set, view } from 'ramda';
import { dirty, rootLens, getSelectedProperties, getSelectedClasses, cartesianProduct } from '@@app-state/model/state';
import { isConnected } from '@@data/graph';

export const middleware = curry((oldState, newState) => {
  let state = set(dirty, view(dirty, newState), newState);
  const cartesianProductPossible = !isConnected({
    properties: getSelectedProperties(state),
    entityIds: Object.keys(getSelectedClasses(state))
  });

  state = set(cartesianProduct, cartesianProductPossible, state);
  // Return original changed state if it was a change cause by setting the 'dirty' flag
  if (view(dirty, oldState) !== view(dirty, newState)) {
    return state;
  }
  // Set dirty to true if the change was made to the model state
  if (view(rootLens, oldState) !== view(rootLens, newState)) {
    return set(dirty, true, state);
  }

  return state;
});
