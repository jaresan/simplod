import {Handler} from './Handler';
import entityTypes from 'src/constants/entityTypes';

export class Node extends Handler {
  static entityType = entityTypes.class;
}
