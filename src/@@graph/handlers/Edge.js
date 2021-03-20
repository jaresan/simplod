import {Handler} from '@@graph/handlers/Handler';
import { entityTypes } from '@@model/entity-types';
import { dispatchSet } from '@@app-state';
import { selectedEdgePropertyIds } from '@@app-state/controls/state';

export class Edge extends Handler {
  static entityType = entityTypes.edge;
  static resources = {};

  static onClick(edge) {
    dispatchSet(selectedEdgePropertyIds, edge.model.propertyIds);
  }
}
