/**
 * @file Handling of actions on the Property wrapper
 * @module @@graph/handlers/Property
 */
import {Handler} from '@@graph/handlers/Handler';
import {entityTypes} from '@@constants/entity-types';

export class Property extends Handler {
  static entityType = entityTypes.property;
  static resources = {};
}
