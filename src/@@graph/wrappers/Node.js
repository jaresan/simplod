import {Wrapper} from '@@graph/wrappers/Wrapper';
import { Node as NodeHandler } from '@@graph/handlers';

export class Node extends Wrapper {
  static nodeType = 'rect';
  handler = NodeHandler;
}
