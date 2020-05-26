// FIXME:  Remove r_ from interactions, nothing to do here
import { createActions } from 'reduxsauce'

export default createActions({
  s_onPaperClick: null,
  r_toggleOptional: ['id', 'optional'],
  r_toggleShow: ['id', 'show'],
  r_toggleDisabled: ['id', 'disabled'],
  r_savePropertyName: ['id', 'name'],
  r_unselectProperty: ['id'],
}, {prefix: 'Interactions.'});
