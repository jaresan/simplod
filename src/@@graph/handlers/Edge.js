import {Handler} from '@@graph/handlers/Handler';
import { entityTypes } from '@@model/entity-types';

export class Edge extends Handler {
  static entityType = entityTypes.edge;
  static resources = {};
}
