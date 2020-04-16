import {Property, Method, Node, Edge} from './wrappers';

const create = (group, elements = []) => elements.map(el => group.addShape(el));

const wrappers = {
  property: Property,
  method: Method,
  node: Node,
  edge: Edge
};

const wrap = (wrapperType, isNode) => ({id, ...props}) => {
  let nodeType = wrapperType;

  let handler;
  if (wrappers[wrapperType]) {
    handler = new wrappers[wrapperType](id);
    nodeType = isNode ? wrappers[wrapperType].nodeType : undefined;
  }

  return {
    type: nodeType,
    draggable: true,
    handler,
    ...props
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
