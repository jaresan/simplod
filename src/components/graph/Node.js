import G6 from '@antv/g6';
import E from './ElementCreators';
const NODE_TYPE = 'graphNode';

const PROP_LINE_HEIGHT = 12;
const attrs = {
  'node-container': (propCount, methodCount) => ({
    width: 300,
    height: 50 + (propCount + methodCount) * PROP_LINE_HEIGHT,
    stroke: 'black', // Apply the color to the stroke. For filling, use fill: cfg.color instead
    fill: 'steelblue',
    opacity: 1
  }),
  'node-title': (width, text) => ({
    x: width / 2, // center
    y: 4,
    textAlign: 'center',
    textBaseline: 'top',
    text,
    fill: '#fff',
  }),
  property: ({predicate, type, i}) => ({
    x: 4, // center
    y: PROP_LINE_HEIGHT * (i+1) + PROP_LINE_HEIGHT,
    textAlign: 'left',
    textBaseline: 'top',
    text: `${predicate}: ${type}`,
    fill: '#000',
  }),
  'method-container': (propCount, methodCount) => ({
    y: propCount * PROP_LINE_HEIGHT + PROP_LINE_HEIGHT * 2,
    width: 300,
    height: methodCount * PROP_LINE_HEIGHT,
    stroke: 'black', // Apply the color to the stroke. For filling, use fill: cfg.color instead
    fill: 'orange',
    opacity: 1
  })
};

const NodeImplementation = {
  draw(cfg, group) {
    const {data: {properties, methods}, id} = cfg;
    const containerAttrs = attrs['node-container'](properties.length, methods.length);
    const {width} = containerAttrs;
    const propFields = properties.reduce((acc, {predicate, type}, i)=> acc.concat(E.Property({
      id: `property_${id}-${predicate}-${type}`,
      attrs: attrs.property({predicate, type, i}),
      name: `property#${i}`,
      data: {source: id, predicate, name: predicate.match(/(\w+)$/)[1]}
    })), []);

    const methodFields = methods.reduce((acc, {predicate, object, weight}, i) => acc.concat(
      E.Method({
        id: `property_${id}-${predicate}-${object}`,
        attrs: attrs.property({predicate, type: object, i: i + properties.length}),
        name: `property#${i + properties.length}`,
        data: {target: object, source: id, predicate, name: predicate.match(/(\w+)$/)[1]}
      })
    ), []);

    const methodContainerAttrs = attrs['method-container'](properties.length, methods.length);

    return E.create(group, [
      E.Node({id: `node_${id}`, attrs: containerAttrs, name: 'node-container'}),
      E.Text({attrs: attrs['node-title'](width, cfg.label), name: 'node-title'}),
      ...propFields,
      E.Rect({attrs: methodContainerAttrs, name: `method-container`}),
      ...methodFields
    ])[0];
  }
};

export const createNode = data => ({
  ...data,
  type: NODE_TYPE
});
export const getNodes = data => Object.entries(data).map(([id, {methods, properties}]) => createNode({
  id: id,
  label: id,
  data: {properties, methods}
}));

G6.registerNode(NODE_TYPE, NodeImplementation, 'single-node');
