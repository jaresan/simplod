import {Handler} from './Handler';
import { entityTypes } from '@@constants/entityTypes';

export class Edge extends Handler {
  static entityType = entityTypes.edge;
  static resources = {};
}
