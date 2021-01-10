import G6 from '@antv/g6';
import {flatten} from 'ramda';
import E from '@@graph/ElementCreators';
import Group from '@@graph/wrappers/Group';
const NODE_TYPE = 'graphNode';

export const PROP_LINE_HEIGHT = 12;
const blue = '#49b2e7';
const textColor = 'black';
const getAttrs = ctx => ({
  'node-container': ({propCount, methodCount, label}) => ({
    width: ctx.measureText(label).width + 8,
    height: 20,
    stroke: textColor, // Apply the color to the stroke. For filling, use fill: cfg.color instead
    fill: blue,
    opacity: 1
  }),
  'node-title': (width, text) => ({
    x: width / 2, // center
    y: 4,
    textAlign: 'center',
    textBaseline: 'top',
    text,
    fill: textColor,
  }),
  property: ({predicate, type, i, ctx}) => {
    const text = `${predicate}: ${type}`;
    return {
      x: 4, // center
      y: PROP_LINE_HEIGHT * (i+1) + PROP_LINE_HEIGHT - 2,
      textAlign: 'left',
      textBaseline: 'top',
      width: Math.round(ctx.measureText(text).width + 8),
      text,
      fill: textColor,
      stroke: textColor
    }
  },
  'property-container': propArr => ({
    y: PROP_LINE_HEIGHT * 2 - 4,
    width: Math.max(...propArr.map(p => p.attrs.width)),
    height: propArr.length * PROP_LINE_HEIGHT + 6,
    stroke: 'black',
    fill: blue,
    opacity: 1
  })
});

const getSuffix = iri => iri.match(/([^/#:]+)$/)[1];

const NodeImplementation = {
  draw(cfg, group) {
    const {data, id} = cfg;
    const ctx = group.get('canvas').get('context');
    ctx.save();
    ctx.font = '12px sans-serif';
    const attrs = getAttrs(ctx);
    const dataPropertyCount = Object.keys(data.dataProperties).length;
    const objectPropertyCount = Object.keys(data.objectProperties).length;
    const containerAttrs = attrs['node-container']({propCount: dataPropertyCount, methodCount: objectPropertyCount, label: cfg.label});
    const {width, height} = containerAttrs;
    const dataProperties = Object.entries(data.dataProperties).map(([predicate, objects], i)=> E.DataProperty({
      id: `property_${id}-${predicate}-${objects[0]}`,
      attrs: attrs.property({predicate, type: objects[0], i, ctx}),
      name: `property#${i}`,
      data: {target: objects[0], source: id, predicate, varName: getSuffix(predicate), dataProperty: true}
    }));

    let i = 0;
    const objectProperties = flatten(Object.entries(data.objectProperties).map(([predicate, objects]) =>
      objects.map(target => E.ObjectProperty({
        id: `property_${id}-${predicate}-${target}`,
        attrs: attrs.property({predicate, type: target, i: i + dataPropertyCount, ctx}),
        name: `property#${i++ + dataPropertyCount}`,
        data: {target, source: id, predicate, varName: getSuffix(predicate)}
      }))
    ));

    const propertyContainerAttrs = attrs['property-container'](dataProperties.concat(objectProperties));
    const expandIconAttrs = {
      x: width + 3,
      y: 5,
      img: 'images/expand.png',
      width: 10,
      height: 10
    };

    const selectAllIconAttrs = {
      x: -16,
      y: 2,
      img: 'images/plus.png',
      width: 16,
      height: 16
    };

    const hideIconAttrs = {
      x: -32,
      y: 2,
      img: 'images/eye-invisible.png',
      width: 16,
      height: 16
    };

    group.set('objectProperties', objectProperties);
    // FIXME: Separate group for logical pieces --> can have multiple groups, yes
    group.entityId = id;
    const result = E.create(group, [
      E.Node({id, attrs: containerAttrs, name: 'node-container', data: {varName: getSuffix(id)} }),
      E.Text({id: `node_${id}-title`, attrs: attrs['node-title'](width, cfg.label), name: 'node-title'}),
      E.Rect({id: `node_${id}-select-all-container`, attrs: {x: -16, width: 16, height, fill: containerAttrs.fill, stroke: containerAttrs.stroke}, name: 'select-all-container'}),
      E.Image({id: `node_${id}-select-all-icon`, name: 'select-all-icon', attrs: selectAllIconAttrs}),
      E.Rect({id: `node_${id}-hide-icon-container`, attrs: {x: hideIconAttrs.x, width: hideIconAttrs.width, height, fill: containerAttrs.fill, stroke: containerAttrs.stroke}, name: 'hide-icon-container'}),
      E.Image({id: `node_${id}-hide-icon`, name: 'hide-icon', attrs: hideIconAttrs}),
      E.Rect({id: `node_${id}-expand-icon-container`, attrs: {x: width, width: 16, height, fill: containerAttrs.fill, stroke: containerAttrs.stroke}, name: 'expand-icon-container'}),
      E.Image({id: `node_${id}-expand-icon`, name: 'expand-icon', attrs: expandIconAttrs}),
      E.Rect({id: `node_${id}-prop-container`, attrs: propertyContainerAttrs, name: 'property-container'}),
      ...dataProperties,
      ...objectProperties
    ])[0];

    ctx.restore();
    return result;
  },

  afterDraw(cfg, group) {
    group.getChildren().forEach(node => {
      const wrapper = node.get('wrapper');
      if (wrapper) {
        wrapper.setNode(node)

        const containerNode = group.get('item');
        node.set('containerNode', containerNode);
        wrapper.setContainerNode(containerNode);
      }
    });
    const wrapper = new Group(group.entityId, group);
    group.set('wrapper', wrapper);
    wrapper.toggleExpanded(false);
  }
};

export const createNode = data => ({
  ...data,
  type: NODE_TYPE
});
export const getNodes = data => Object.entries(data).map(([id, {objectProperties, dataProperties}]) => createNode({
  id: id,
  label: id,
  data: {objectProperties, dataProperties}
}));

G6.registerNode(NODE_TYPE, NodeImplementation, 'single-node');