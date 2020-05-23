import {Property, Method, Node, Edge} from './wrappers';

const create = (group, elements = []) => elements.map(el => group.addShape(el));

const wrappers = {
  property: Property,
  method: Method,
  node: Node,
  edge: Edge
};

const wrap = (wrapperType, isNode) => ({id, attrs, ...props}) => {
  let nodeType = wrapperType;

  let wrapper;
  if (wrappers[wrapperType]) {
    wrapper = new wrappers[wrapperType](id);
    nodeType = isNode ? wrappers[wrapperType].nodeType : undefined;
  }

  const defaultStyle = (wrapper && wrapper.defaultStyle) || {};
  return {
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
  property: wrap('property', true),
  method: wrap('method', true),
  node: wrap('node', true),
  edge: wrap('edge')
};

export default new Proxy({}, {
  get(target, key) {
    return wrapped[key.toLowerCase()] || wrap(key.toLowerCase());
  }
});
