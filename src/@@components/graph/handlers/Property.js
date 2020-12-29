import {Handler} from './Handler';
import {entityTypes} from '@@constants/entityTypes';

export class Property extends Handler {
  static entityType = entityTypes.property;
  static resources = {};
}
