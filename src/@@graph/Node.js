import G6 from '@antv/g6';
import { flatten, last } from 'ramda';
import E from '@@graph/ElementCreators';
import Group from '@@graph/wrappers/Group';
export const NODE_TYPE = 'graphNode';

export const PROP_LINE_HEIGHT = 12;
const blue = '#49b2e7';
const textColor = 'black';
const getAttrs = ctx => ({
  'node-container': ({label}) => ({
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

const getAddPropertyFn = (group, ctx, attrs) => ({source, predicate, target, targetType, varName, dataProperty}) => {
  const propertyCount = Object.values(group.get('wrapper').propertyWrappers).length;
  group.addShape(E.ObjectProperty({
    id: `property_${source}-${predicate}-${target}`,
    attrs: attrs.property({predicate, type: target, i: propertyCount, ctx}),
    name: `property#${propertyCount}`,
    data: {target, source, predicate, targetType, varName: varName || getSuffix(predicate), dataProperty}
  }));
  const node = last(group.getChildren());
  const wrapper = node.get('wrapper');
  if (wrapper) {
    wrapper.setNode(node)

    const containerNode = group.get('item');
    node.set('containerNode', containerNode);
    wrapper.setContainerNode(containerNode);
  }
  group.get('wrapper').registerProperty(node);
}

const NodeImplementation = {
  draw(cfg, group) {
    const {data, id} = cfg;
    const ctx = group.get('canvas').get('context');
    ctx.save();
    ctx.font = '12px sans-serif';
    const attrs = getAttrs(ctx);
    const dataPropertyCount = Object.keys(data.dataProperties).length;
    const containerAttrs = attrs['node-container']({label: cfg.label});
    const {width, height} = containerAttrs;
    const dataProperties = Object.entries(data.dataProperties).map(([predicate, objects], i)=> E.DataProperty({
      id: `property_${id}-${predicate}-${objects[0]}`,
      attrs: attrs.property({predicate, type: objects[0], i, ctx}),
      name: `property#${i}`,
      data: {target: objects[0], targetType: objects[0], source: id, predicate, varName: getSuffix(predicate), dataProperty: true}
    }));

    let i = 0;
    const objectProperties = flatten(Object.entries(data.objectProperties).map(([predicate, objects]) =>
      objects.map(target => E.ObjectProperty({
        id: `property_${id}-${predicate}-${target}`,
        attrs: attrs.property({predicate, type: target, i: i + dataPropertyCount, ctx}),
        name: `property#${i++ + dataPropertyCount}`,
        data: {target, source: id, predicate, targetType: target, varName: getSuffix(predicate)}
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

    const copyNodeIconAttrs = {
      x: -14,
      y: -14,
      img: 'images/copy-icon.png',
      width: 12,
      height: 12
    };

    const deleteNodeIconAttrs = {
      x: -30,
      y: -14,
      img: 'images/delete-icon.png',
      width: 12,
      height: 12
    };

    const selectAllIconAttrs = {
      x: -15,
      y: 3,
      img: 'images/plus.png',
      width: 14,
      height: 14
    };

    const hideIconAttrs = {
      x: -30,
      y: 4,
      img: 'images/eye-invisible.png',
      width: 12,
      height: 12
    };

    group.set('objectProperties', objectProperties);
    group.set('data', data);
    group.set('addProperty', getAddPropertyFn(group, ctx, attrs));
    group.entityId = id;
    const result = E.create(group, [
      E.Node({id, attrs: containerAttrs, name: 'node-container', data: {varName: getSuffix(id), type: id} }),
      E.Rect({id: `node_${id}-delete-node-container`, name: 'delete-node-container', attrs: {x: -32, y: -16, width: 16, height, fill: containerAttrs.fill, stroke: containerAttrs.stroke}}),
      E.Image({id: `node_${id}-delete-node-icon`, name: 'delete-node-icon', attrs: deleteNodeIconAttrs}),
      E.Rect({id: `node_${id}-copy-node-container`, name: 'copy-node-container', attrs: {x: -16, y: -16, width: 16, height, fill: containerAttrs.fill, stroke: containerAttrs.stroke}}),
      E.Image({id: `node_${id}-copy-node-icon`, name: 'copy-node-icon', attrs: copyNodeIconAttrs}),
      E.Rect({id: `node_${id}-varName-container`, attrs: {x: 0, y: -16, width: 32, height: 16, fill: containerAttrs.fill, stroke: containerAttrs.stroke}, name: 'node-varName-container'}),
      E.Text({id: `node_${id}-varName`, attrs: {...attrs['node-title'](width, cfg.varName || cfg.label), y: -14, textAlign: 'left', x: 2}, name: 'node-varName'}),
      E.Text({id: `node_${id}-title`, attrs: attrs['node-title'](width, cfg.label), name: 'node-title'}),
      E.Rect({id: `node_${id}-select-all-container`, attrs: {x: -16, width: 16, height, fill: containerAttrs.fill, stroke: containerAttrs.stroke}, name: 'select-all-container'}),
      E.Image({id: `node_${id}-select-all-icon`, name: 'select-all-icon', attrs: selectAllIconAttrs}),
      E.Rect({id: `node_${id}-hide-icon-container`, attrs: {x: hideIconAttrs.x - 2, width: hideIconAttrs.width + 4, height, fill: containerAttrs.fill, stroke: containerAttrs.stroke}, name: 'hide-icon-container'}),
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

export const measureText = (node, txt) => {
  const ctx = node.get('canvas').get('context');
  ctx.save();
  ctx.font = '12px sans-serif';
  const res = ctx.measureText(txt);
  ctx.restore();
  return res;
};

G6.registerNode(NODE_TYPE, NodeImplementation, 'single-node');
