import { createActions } from 'reduxsauce'

export default createActions({
  r_linkYasgui: null,
  r_updateQuery: ['query'],
  r_setPrefixes: ['prefixes'],
}, {prefix: 'Yasgui.'});
