import {curry} from 'ramda';
import {Canvas as CanvasWrapper, Edge as EdgeWrapper} from './wrappers';

const handle = curry((methodName, e) => {
  const targetWrapper = (
    e.target.get('wrapper')
    || (e.target.getModel && e.target.getModel().wrapper)
  );

  if (targetWrapper && !targetWrapper.target) {
    targetWrapper.setTarget(e.target)
  }

  const itemWrapper = (e.item && e.item.get('wrapper'));
  if (itemWrapper && !itemWrapper.target) {
    itemWrapper.setTarget(e.item);
  }

  const wrapper = targetWrapper || itemWrapper;
  // Default to CanvasWrapper if there's no handler which could resolve the function call
  if (wrapper && typeof wrapper[methodName] == 'function') {
    return wrapper[methodName]();
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
    this.graph.clear();

    this.deregisterBehaviours();
    this.registerBehaviours();
    this.graph.data(data);
    this.registerEdgeHandlers();
  }

  // Edge handlers have to be registered manually because they don't have a custom draw function in which this could be done
  registerEdgeHandlers() {
    this.graph.getEdges().forEach(e => e.set('wrapper', new EdgeWrapper(e)));
  }

  registerBehaviours() {
    Object.entries(this.behaviours).forEach(([key, targetMethod]) => this.graph.on(key, handle(targetMethod)));
  }

  deregisterBehaviours() {
    Object.keys(this.behaviours).forEach((key) => this.graph.off(key));
  }

  render() {
    this.graph.render();
  }

  destroy() {
    this.graph.destroy();
  }
}
