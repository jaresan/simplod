import {compose, lensProp, curry, lens} from 'ramda';

const model = lensProp('model');

// FIXME: Replace with normal lensprop once refactored
const lensForImmutable = k => lens(s => s.get(k), curry((v, s) => s.set(k, v)));

export const lastSave = compose(model, lensForImmutable('lastSave'));
export const labelsLoadingProgress = compose(model, lensForImmutable('labelsLoadingProgress'))
