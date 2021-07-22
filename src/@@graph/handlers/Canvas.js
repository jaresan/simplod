/**
 * @file Handling of actions on the Canvas wrapper
 * @module @@graph/handlers/Canvas
 */
import {Handler} from '@@graph/handlers/Handler';
import { dispatch, dispatchSet } from '@@app-state';
import { deselectAll, unhighlightEdges } from '@@app-state/model/state';
import { selectedEdgePropertyIds } from '@@app-state/controls/state';

export class Canvas extends Handler {
  static deselectAll = () => dispatch(deselectAll);
  static onClick = () => {
    dispatch(unhighlightEdges);
    dispatchSet(selectedEdgePropertyIds, []);
  }
}
