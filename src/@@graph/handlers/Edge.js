/**
 * @file Handling of actions on the Edge wrapper
 * @module @@graph/handlers/Edge
 */
import {Handler} from '@@graph/handlers/Handler';
import { entityTypes } from '@@constants/entity-types';
import { dispatchSet, dispatch } from '@@app-state';
import { selectedEdgePropertyIds } from '@@app-state/controls/state';
import { toggleEdgeHighlighted, unhighlightEdges } from '@@app-state/model/state';

export class Edge extends Handler {
  static entityType = entityTypes.edge;
  static resources = {};

  static onClick(edge) {
    dispatch(unhighlightEdges);
    dispatch(toggleEdgeHighlighted(edge.id, true));
    dispatchSet(selectedEdgePropertyIds, edge.model.propertyIds);
  }
}
