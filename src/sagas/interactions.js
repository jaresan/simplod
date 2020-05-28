import { takeEvery, put, select, all } from 'redux-saga/effects';
import { getSelectedDataAndPrefixes } from 'src/selectors';
import Interactions from 'src/actions/interactions';
import Query from 'src/actions/yasgui';

function* dataChanged() {
	const { classes, prefixes } = yield select(getSelectedDataAndPrefixes);
	yield put(Query.Creators.r_updateQuery(classes, prefixes));
}

export default function*() {
	yield all([
		takeEvery(Interactions.Types.S_DATA_CHANGED, dataChanged)
	]);
}
