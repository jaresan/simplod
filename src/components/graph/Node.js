import G6 from '@antv/g6';
import E from './ElementCreators';
import Group from './wrappers/Group';
const NODE_TYPE = 'graphNode';

const PROP_LINE_HEIGHT = 12;
const attrs = {
  'node-container': ({propCount, methodCount, label}) => ({
    width: label.length * 8,
    height: 20,
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
    y: PROP_LINE_HEIGHT * (i+1) + PROP_LINE_HEIGHT - 2,
    textAlign: 'left',
    textBaseline: 'top',
    text: `${predicate}: ${type}`,
    fill: '#000',
  }),
  'property-container': (propCount, methodCount) => ({
    y: PROP_LINE_HEIGHT * 2 - 4,
    width: 300,
    height: (propCount + methodCount) * PROP_LINE_HEIGHT + 6,
    stroke: 'black',
    fill: 'steelblue',
    opacity: 1
  })
};

const getSuffix = iri => iri.match(/([^/#:]+)$/)[1];

const NodeImplementation = {
  draw(cfg, group) {
    const {data: {properties, methods}, id} = cfg;
    const containerAttrs = attrs['node-container']({propCount: properties.length, methodCount: methods.length, label: cfg.label});
    const {width, height} = containerAttrs;
    const propFields = properties.reduce((acc, {predicate, object, type}, i)=> acc.concat(E.Property({
      id: `property_${id}-${predicate}-${type}`,
      attrs: attrs.property({predicate, type, i}),
      name: `property#${i}`,
      data: {target: type, source: id, predicate, name: getSuffix(predicate)}
    })), []);

    const methodFields = methods.reduce((acc, {predicate, object, weight}, i) => acc.concat(
      E.Method({
        id: `property_${id}-${predicate}-${object}`,
        attrs: attrs.property({predicate, type: object, i: i + properties.length}),
        name: `property#${i + properties.length}`,
        data: {target: object, source: id, predicate, name: getSuffix(predicate)}
      })
    ), []);

    const propertyContainerAttrs = attrs['property-container'](properties.length, methods.length);
    const expandIconAttrs = {
      x: width + 3,
      y: 5,
      img: '/images/expand.png',
      width: 10,
      height: 10
    };

    group.set('methods', methodFields);
    // FIXME: Separate group for logical pieces --> can have multiple groups, yes
    return E.create(group, [
      E.Node({id: `node_${id}`, attrs: containerAttrs, name: 'node-container'}),
      E.Text({id: `node_${id}-title`, attrs: attrs['node-title'](width, cfg.label), name: 'node-title'}),
      E.Rect({id: `node_${id}-expand-icon-container`, attrs: {x: width, width: 16, height, fill: containerAttrs.fill, stroke: containerAttrs.stroke}, name: 'expand-icon-container'}),
      E.Image({id: `node_${id}-expand-icon`, changeIcon() {console.log(this)}, name: 'expand-icon', attrs: expandIconAttrs}),
      E.Rect({id: `node_${id}-prop-container`, attrs: propertyContainerAttrs, name: 'property-container'}),
      ...propFields,
      ...methodFields
    ])[0];
  },

  afterDraw(cfg, group) {
    const wrapper = new Group(group);
    group.set('wrapper', wrapper);
    wrapper.toggleProperties(false);
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
