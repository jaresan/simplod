import { all } from 'redux-saga/effects';
import InteractionsSaga from './interactions';
import SolidSaga from './solid';

export default function*() {
	yield all([
		InteractionsSaga(),
		SolidSaga(),
	]);
};
