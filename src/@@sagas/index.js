import { all } from 'redux-saga/effects';
import SolidSaga from './solid';

export default function*() {
	yield all([
		SolidSaga(),
	]);
};
