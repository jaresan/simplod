import {Canvas as CanvasHandler} from '@@graph/handlers/Canvas';

export class Canvas {
  static onClick = () => {
    CanvasHandler.deselectAll();
  };
}
