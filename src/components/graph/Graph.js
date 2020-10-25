import {curry} from 'ramda';
import {Canvas as CanvasWrapper} from './wrappers';
import {Property, Node, Edge} from './handlers';

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
    console.time('this.graph.clear();')
    this.graph.clear();
    console.timeEnd('this.graph.clear();')

    console.time('this.deregisterBehaviours();')
    this.deregisterBehaviours();
    console.timeEnd('this.deregisterBehaviours();')

    console.time('this.registerBehaviours();')
    this.registerBehaviours();
    console.timeEnd('this.registerBehaviours();')

    console.time('this.graph.data(data);')
    this.graph.data(data);
    console.timeEnd('this.graph.data(data);')

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
