import {Handler} from './Handler';
import { entityTypes } from '@@model/entity-types';

export class Node extends Handler {
  static entityType = entityTypes.class;
  static resources = {};
}
