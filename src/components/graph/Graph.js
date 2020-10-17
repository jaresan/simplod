import {curry, flatten, map} from 'ramda';
import {Canvas as CanvasWrapper, Edge as EdgeWrapper} from './wrappers';

const handle = curry((methodName, e) => {
  const wrapper = (
    e.target.get('wrapper')
    || (e.target.getModel && e.target.getModel().wrapper)
    || (e.item && e.item.get('wrapper'))
  );

  // Default to CanvasWrapper if there's no handler which could resolve the function call
  if (wrapper && typeof wrapper[methodName] == 'function') {
    return wrapper[methodName]();
  } else {
    return CanvasWrapper[methodName] && CanvasWrapper[methodName](e.target, e);
  }
});

const connectWrappers = (node, containerNode) => {
  const wrapper = (
    node.get('wrapper')
    || (node.getModel && node.getModel().wrapper)
  );

  if (wrapper) {
    wrapper.setNode(node)

    if (containerNode) {
      node.set('containerNode', containerNode);
      wrapper.setContainerNode(containerNode);
    }
  }

  const children = (node.get('group') && node.get('group').get('children')) || [];
  // const container = children.find(ch => (ch.get('wrapper') instanceof NodeWrapper))
  children.forEach(ch => connectWrappers(ch, node));
};

export class Graph {
  behaviours = {
    click: 'onClick',
    dblclick: 'onDoubleClick',
    mouseover: 'onHover',
    mouseout: 'onBlur',
    contextmenu: 'onContextMenu'
  };
  constructor(graph) {
    this.graph = graph;
  }

  loadData(data) {
    this.graph.clear();

    this.deregisterBehaviours();
    this.registerBehaviours();
    this.graph.data(data);
    this.render();
    this.registerEdgeHandlers();
    this.registerNodeHandlers();
  }

  // Edge handlers have to be registered manually because they don't have a custom draw function in which this could be done
  registerEdgeHandlers() {
    this.graph.getEdges().forEach(e => e.set('wrapper', new EdgeWrapper(e)));
  }

  registerNodeHandlers() {
    this.graph.getNodes().forEach(connectWrappers);
  }

  registerBehaviours() {
    Object.entries(this.behaviours).forEach(([key, targetMethod]) => this.graph.on(key, handle(targetMethod)));
  }

  deregisterBehaviours() {
    Object.keys(this.behaviours).forEach(key => this.graph.off(key));
  }

  render() {
    this.graph.render();
  }

  destroy() {
    this.graph.destroy();
  }
}
