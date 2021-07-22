/**
 * @file Wrapper describing functionality for Node objects
 * @module @@graph/wrappers/Node
 */
import {Wrapper} from '@@graph/wrappers/Wrapper';
import { Node as NodeHandler } from '@@graph/handlers';

export class Node extends Wrapper {
  static nodeType = 'rect';
  handler = NodeHandler;
}
