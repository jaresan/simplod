import InteractionsSaga from './interactions';

export default function*() {
	yield [
		InteractionsSaga()
	];
};
