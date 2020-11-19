import {store} from './store';
import { entityTypes } from '../constants/entityTypes';

export const getRandomEntityId = () => Object.keys(store.getState().model.getIn(['entities', entityTypes.class]).toJS())[0];
export const getRandomPropertyId = () => Object.keys(store.getState().model.getIn(['entities', entityTypes.property]).toJS())[0];