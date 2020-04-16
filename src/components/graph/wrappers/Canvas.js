import {Canvas as CanvasHandler} from '../handlers/Canvas';

export class Canvas {
  static onClick = () => {
    CanvasHandler.deselectAll();
  };
}
