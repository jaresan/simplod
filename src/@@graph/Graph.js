import { curry, fromPairs, path } from 'ramda';
import {Canvas as CanvasWrapper} from '@@graph/wrappers';
import {Property, Node, Edge} from '@@graph/handlers';

const getWrapper = n => {
  if (!n) return;
  return n.getParent && n.getParent() && n.getParent().get('wrapper');  // Group wrapper
}

const handle = curry((methodName, e) => {
  e.stopPropagation();
  const wrapper = getWrapper(e.target) || (e.item && e.item.get('wrapper')); // Group wrapper for nodes or Edge wrapper

  // Default to CanvasWrapper if there's no handler which could resolve the function call
  if (wrapper && typeof wrapper[methodName] == 'function') {
    return wrapper[methodName](e.target || e.item);
  } else {
    return CanvasWrapper[methodName] && CanvasWrapper[methodName](e.target, e);
  }
});

export class Graph {
  // TODO: Use specific node events, not using graph events?
  behaviours = {
    click: 'onClick',
    dblclick: 'onDoubleClick',
    mouseover: 'onHover',
    mouseout: 'onBlur',
    contextmenu: 'onContextMenu'
  };

  constructor(graph) {
    this.graph = graph;
    Graph.instance = this;
  }

  static getBBoxesById() {
    return fromPairs(Graph.instance.graph.getNodes().map(n => [n.get('id'), {bbox: n.getBBox()}]));
  }

  static updatePositions(dataById) {
    const moveFns = [];
    Graph.instance.graph.getNodes().forEach(n => {
      const bbox = path([n.get('id'), 'bbox'], dataById);
      if (bbox) {
        const {x, y} = bbox;
        moveFns.push(() => {
          n.get('group').get('item').updatePosition({x, y});
          n.get('group').get('wrapper').onLoad();
          n.getEdges().forEach(e => e.refresh());
        });
      }
    })

    // Trigger the move functions only after the graph is done layouting (to prevent delayed zoom changes
    // messing up the placement)
    Graph.instance.graph.on('afterlayout', () => {
      moveFns.forEach(f => f());
      Graph.instance.graph.fitView()
      Graph.instance.graph.off('afterlayout');
    });
  }

  loadData(data) {
    console.time('this.@@graph.clear();')
    this.graph.clear();
    console.timeEnd('this.@@graph.clear();')

    console.time('this.deregisterBehaviours();')
    this.deregisterBehaviours();
    console.timeEnd('this.deregisterBehaviours();')

    console.time('this.registerBehaviours();')
    this.registerBehaviours();
    console.timeEnd('this.registerBehaviours();')

    console.time('this.@@graph.data(data);')
    this.graph.data(data);
    console.timeEnd('this.@@graph.data(data);')

    console.time('this.render();')
    this.render();
    console.timeEnd('this.render();')
  }

  registerBehaviours() {
    Object.entries(this.behaviours).forEach(([key, targetMethod]) => this.graph.on(key, handle(targetMethod)));
  }

  deregisterBehaviours() {
    Object.keys(this.behaviours).forEach(key => this.graph.off(key));
  }

  static reset() {
    if (Graph.instance) {
      Graph.instance.graph.clear();
      Graph.instance.render();
    }
  }

  render() {
    this.graph.render();
    Property.commitResources();
    Node.commitResources();
    Edge.commitResources();
  }

  destroy() {
    this.graph.destroy();
  }
}
