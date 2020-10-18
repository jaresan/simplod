import {Wrapper} from './Wrapper';
import { Node as NodeHandler } from '../handlers';

export class Node extends Wrapper {
  static nodeType = 'rect';
  handler = NodeHandler;

  onClick = () => {
    this.node.get('groupController').toggleProperties();
  }
}
