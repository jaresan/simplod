import { curry, fromPairs, path, view, groupBy, head, prop } from 'ramda';
import {Canvas as CanvasWrapper} from '@@graph/wrappers';
import {Property, Node, Edge} from '@@graph/handlers';
import { Handler } from '@@graph/handlers/Handler';
import { getNodes, NODE_TYPE } from '@@graph/Node';
import { getEdges, Edge as GraphEdge } from '@@graph/Edge';
import { dispatch } from '@@app-state';
import { registerNewClassWithCallback, properties } from '@@app-state/model/state';
import * as ModelState from '@@app-state/model/state';

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
  static behaviours = {
    click: 'onClick',
    dblclick: 'onDoubleClick',
    mouseover: 'onHover',
    mouseout: 'onBlur',
    contextmenu: 'onContextMenu'
  };

  static setInstance(graph) {
    this.instance = graph;
  }

  static transformModelToGraphData(state) {
    const props = view(properties, state);

    return Object.values(props)
      .reduce((acc, {dataProperty, source, target, predicate}) => {
        acc[source] = acc[source] || {
          dataProperties: {},
          objectProperties: {}
        };

        if (dataProperty) {
          acc[source].dataProperties[predicate] = acc[source].dataProperties[predicate] || [];
          acc[source].dataProperties[predicate].push(target);
        } else {
          acc[source].objectProperties[predicate] = acc[source].objectProperties[predicate] || [];
          acc[source].objectProperties[predicate].push(target);
        }

        return acc;
      }, {});
  }

  static loadDataFromState(state) {
    const data = this.transformModelToGraphData(state);
    this.loadData(data);
  }

  static loadData(data) {
    console.time('getNodes')
    const nodes = getNodes(data);
    console.timeEnd('getNodes')
    console.time('getEdges')
    const edges = getEdges(data);
    console.timeEnd('getEdges');
    this.instance.data({nodes, edges});
  }

  static getBBoxesById() {
    return fromPairs(this.instance
      .getNodes()
      .filter(n => !n.getContainer().destroyed)
      .map(n => [n.get('id'), {bbox: n.getBBox()}]));
  }

  static updatePositions(dataById) {
    const moveFns = [];
    this.instance.getNodes().forEach(n => {
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
    this.instance.on('afterlayout', () => {
      moveFns.forEach(f => f());
      this.instance.fitView()
      this.instance.off('afterlayout');
    });
  }

  static initialize(data) {
    data = data || this.data;
    console.time('this.@@graph.clear();')
    this.instance.clear();
    console.timeEnd('this.@@graph.clear();')

    console.time('this.deregisterBehaviours();')
    this.deregisterBehaviours();
    console.timeEnd('this.deregisterBehaviours();')

    console.time('this.registerBehaviours();')
    this.registerBehaviours();
    console.timeEnd('this.registerBehaviours();')

    console.time('this.graph.data();')
    if (view(ModelState.rootLens, data)) {
      this.loadDataFromState(data);
    } else {
      this.loadData(data);
    }
    console.timeEnd('this.graph.data();')

    console.time('this.render();')
    this.render();
    console.timeEnd('this.render();')
    this.data = data;
  }

  static registerBehaviours() {
    Object.entries(this.behaviours).forEach(([key, targetMethod]) => this.instance.on(key, handle(targetMethod)));
  }

  static deregisterBehaviours() {
    Object.keys(this.behaviours).forEach(key => this.instance.off(key));
  }

  static clear() {
    Handler.clear();
    Property.clear();
    Node.clear();
    Edge.clear();
    if (this.instance) {
      this.instance.clear();
    }
  }

  static render() {
    this.instance.render();
    Property.commitResources();
    Node.commitResources();
    Edge.commitResources();
    Handler.bindProperties();
  }

  static destroy() {
    this.instance.destroy();
  }

  static onCreateNewEntity(id) {
    this.copyNode(Handler.recipients[id].getGroupController().group);
  }

  static onDeleteEntity(id) {
    Handler.remove(id);
    this.instance.removeItem(id);
    dispatch(ModelState.deleteClass(id));
  }

  static copyNode(node) {
    const {cfg} = node;

    const {x, y, width, height} = node.get('item').getBBox();
    dispatch(registerNewClassWithCallback(cfg.id, ({newId: id, instance, properties}) => {
      const node = this.instance.addItem('node', {
        id,
        varName: instance.varName,
        label: instance.type,
        data: cfg.data,
        type: NODE_TYPE,
        x: x + width / 2,
        y: y - 2*height
      });

      node.toFront();

      const groupedProperties =
        groupBy(
          ([id, p]) => [p.target, p.source].sort().join('-'),
          Object.entries(properties).filter(([id, p]) => !p.dataProperty)
        );


      // Create edges for target/source pair
      Object.values(groupedProperties)
        .forEach(propertiesForGivenPair => {
          const propertyIds = propertiesForGivenPair.map(head);
          const properties = propertiesForGivenPair.flatMap(prop(1));
          const {source, target} = properties[0];

          properties.forEach(p => {
            if (p.target === id) {
              Handler.recipients[p.source].getGroupController().group.get('addProperty')(p);
            }
          });

          const edge = this.instance.addItem('edge', GraphEdge({
            source, target,
            propertyIds,
            data: {
              source, target
            }
          }));

          if (
            path(['recipients', target, 'state', 'hidden'], Handler)
            || path(['recipients', source, 'state', 'hidden'], Handler)
          ) {
            edge.hide();
          }

          Handler.recipients[source].getGroupController().recalculateEdges();
          Handler.recipients[target].getGroupController().recalculateEdges();
        })
    }))
  }
}
