import {Handler} from './Handler';
import { entityTypes } from '@@model/entity-types';

export class Edge extends Handler {
  static entityType = entityTypes.edge;
  static resources = {};
}
