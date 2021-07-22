/**
 * @file Wrapper describing functionality for object properties
 * @module @@graph/wrappers/ObjectProperty
 */
import {Property} from './index';

export class ObjectProperty extends Property {
  getSameTargetProperties() {
    const {target} = this.getNode().get('data');
    return this
      .getContainerNode()
      .getContainer()
      .get('objectProperties')
      .filter(m => m.data.target === target)
  }

  getEdge() {
    if (this.edge) {
      return this.edge && this.edge.get('wrapper');
    }

    const model = this.getNode().get('data');
    const containerNode = this.getContainerNode();
    this.edge = containerNode.getOutEdges()
      .concat(containerNode.getInEdges())
      .find(e => {
        const {target, source} = e.getModel();
        // Edges are bidirectional
        return (model.target === target && model.source === source) || (model.source === target && model.target === source);
      })

    return this.edge && this.edge.get('wrapper');
  }

  setState(newState) {
    super.setState(newState);
    if (this.getEdge()) {
      this.getEdge().updateSelected();
    }
  }
}
