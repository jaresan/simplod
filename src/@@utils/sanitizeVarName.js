export const sanitizeVarName = (str = '') => str.replace(
  /([-]\w)/g,
  group => group.toUpperCase().replace('-', '')
).replace(/-/g, '');
