/**
 * @file Wrapper describing functionality for Canvas
 * @module @@graph/wrappers/Canvas
 */
import {Canvas as CanvasHandler} from '@@graph/handlers/Canvas';

export class Canvas {
  static handler = CanvasHandler;

  static onClick = () => this.handler.onClick();
}
