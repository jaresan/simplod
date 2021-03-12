import {keys, all, map, always} from 'ramda';

export const getConnectedEntities = (p, edgesByEntity) => {
  const stack = [p];
  let appearingEntities = {};
  while (stack.length) {
    const {target, source} = stack.pop();
    if (!appearingEntities[source]) {
      stack.push(...edgesByEntity[source]);
      appearingEntities[source] = true;
    }
    if (!appearingEntities[target]) {
      stack.push(...edgesByEntity[target]);
      appearingEntities[target] = true;
    }
  }

  return appearingEntities;
};

