import * as _ from 'underscore';
import * as interactions from './interactions';
import * as yasgui from './yasgui';
import * as solid from './solid';

// FIXME: Rework action registration, this way names can overlap
// (or use reduxsauce)
const actions = Object.assign(
	{},
	interactions,
	yasgui,
	solid
);

export default _.reduce(actions, (acc, actionFn, type) => {
	acc.Creators[type] = (...args) => {
		return {
			type,
			payload: actionFn(...args)
		}
	};

	acc.Types[type] = type;
	return acc;
}, {
	Creators: {},
	Types: {}
});
