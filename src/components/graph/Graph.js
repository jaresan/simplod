import {curry} from 'ramda';
import {Canvas as CanvasWrapper, Edge as EdgeWrapper} from './wrappers';

const handle = curry((methodName, e) => {
  const targetHandler = (
    e.target.get('handler')
    || (e.target.getModel && e.target.getModel().handler)
  );
  const itemHandler = (e.item && e.item.get('handler'));

  if (targetHandler && !targetHandler.target) {
    targetHandler.setTarget(e.target)
  }

  if (itemHandler && !itemHandler.target) {
    itemHandler.setTarget(e.item);
  }

  let handler = targetHandler || itemHandler;

  if (handler && typeof handler[methodName] == 'function') {
    return handler[methodName]();
  } else {
    return CanvasWrapper[methodName] && CanvasWrapper[methodName](e.target, e);
  }
});

export class Graph {
  constructor(graph, data) {
    this.graph = graph;
    this.registerBehaviours(graph);
    graph.data(data);
    graph.render();
    this.registerEdgeHandlers();
  }

  // Edge handlers have to be registered manually as they don't have a custom draw function in which this could be done
  registerEdgeHandlers() {
    this.graph.getEdges().forEach(e => e.set('handler', new EdgeWrapper(e)));
  }

  registerBehaviours(graph) {
    Object.entries({
      click: 'onClick',
      dblclick: 'onDoubleClick',
      mouseover: 'onHover',
      mouseout: 'onBlur',
      contextmenu: 'onContextMenu'
    }).forEach(([key, targetMethod]) => graph.on(key, handle(targetMethod)));
  }

  render() {
    this.graph.render();
  }
}
