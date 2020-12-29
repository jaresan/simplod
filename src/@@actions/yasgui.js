import { createActions } from 'reduxsauce'

export default createActions({
  r_linkYasgui: null,
  r_updateQuery: ['query'],
  r_setPrefixes: ['prefixes'],
  r_setEndpoint: ['endpoint'],
  r_setSimpleQuery: ['query']
}, {prefix: 'Yasgui.'});
