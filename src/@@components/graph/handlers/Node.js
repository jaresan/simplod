import {Handler} from './Handler';
import { entityTypes } from '@@constants/entityTypes';

export class Node extends Handler {
  static entityType = entityTypes.class;
  static resources = {};
}
