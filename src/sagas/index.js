import InteractionsSaga from './interactions';
import SolidSaga from './solid';

export default function*() {
	yield [
		InteractionsSaga(),
		SolidSaga(),
	];
};
