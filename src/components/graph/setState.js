import { curry, path } from 'ramda';

export const setState = curry((stateStyles, name, value, node) => {
  const group = node.getContainer();
  const shapes = group.get('children');

  // node.getModel().handler.onStateChange(name, value);
  shapes.forEach(shape => {
    const name = shape.get('name').split('#')[0];
    const style = node.getStates().reduce((acc, state) =>
      Object.assign(acc, path([state, name], stateStyles)),
      {...stateStyles.default[name]}
    );
    shape.attr(style);
  });
});
