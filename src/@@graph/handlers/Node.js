/**
 * @file Handling of actions on the Node wrapper
 * @module @@graph/handlers/Node
 */
import {Handler} from '@@graph/handlers/Handler';
import { entityTypes } from '@@constants/entity-types';

export class Node extends Handler {
  static entityType = entityTypes.class;
  static resources = {};
}
