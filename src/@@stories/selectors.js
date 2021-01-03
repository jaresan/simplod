import {path} from 'ramda';
import {store} from './store';
import { entityTypes } from '@@constants/entityTypes';

export const getRandomEntityId = () => Object.keys(path(['entities', entityTypes.class], store.getState().model))[0];
export const getRandomPropertyId = () => Object.keys(path(['entities', entityTypes.property], store.getState().model))[0];
