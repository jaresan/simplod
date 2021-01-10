import {Handler} from '@@graph/handlers/Handler';
import {entityTypes} from '@@model/entity-types';

export class Property extends Handler {
  static entityType = entityTypes.property;
  static resources = {};
}