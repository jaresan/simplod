import {curry} from 'ramda';
import {Canvas as CanvasWrapper} from './wrappers';

const getWrapper = n => {
  if (!n) return;
  return n.getParent && n.getParent() && n.getParent().get('wrapper');  // Group wrapper
}

const handle = curry((methodName, e) => {
  const wrapper = getWrapper(e.target) || (e.item && e.item.get('wrapper')); // Group wrapper for nodes or Edge wrapper

  // Default to CanvasWrapper if there's no handler which could resolve the function call
  if (wrapper && typeof wrapper[methodName] == 'function') {
    return wrapper[methodName](e.target || e.item);
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
    this.registerNodeWrappers();
  }

  registerNodeWrappers() {
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
