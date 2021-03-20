import {Canvas as CanvasHandler} from '@@graph/handlers/Canvas';

export class Canvas {
  static handler = CanvasHandler;

  static onClick = () => this.handler.onClick();
}
