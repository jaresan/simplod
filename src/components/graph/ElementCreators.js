import {Property, Method, Node, Edge} from './wrappers';

const create = (group, elements = []) => elements.map(el => group.addShape(el));

const wrappers = {
  dataProperty: Property,
  objectProperty: Method,
  node: Node,
  edge: Edge
};

const wrap = (type, isNode) => ({id, attrs, ...props}) => {
  let nodeType = type;

  let wrapper;
  if (wrappers[type]) {
    wrapper = new wrappers[type](id);
    nodeType = isNode ? wrappers[type].nodeType : undefined;
  }

  const defaultStyle = (wrapper && wrapper.defaultStyle) || {};
  return {
    id,
    type: nodeType,
    draggable: true,
    wrapper,
    ...props,
    attrs: {
      ...attrs,
      ...defaultStyle
    }
  };
};

const wrapped = {
  create,
  dataproperty: wrap('dataProperty', true),
  objectproperty: wrap('objectProperty', true),
  node: wrap('node', true),
  edge: wrap('edge')
};

export default new Proxy({}, {
  get(target, key) {
    return wrapped[key.toLowerCase()] || wrap(key.toLowerCase());
  }
});
