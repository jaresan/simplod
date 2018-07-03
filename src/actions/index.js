import * as _ from 'underscore';
import * as interactions from './interactions';
import * as yasgui from './yasgui';

const actions = Object.assign(
	{},
	interactions,
	yasgui
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
