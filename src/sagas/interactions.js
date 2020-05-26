import { takeEvery, put, select, all } from 'redux-saga/effects';
import { getSelectedDataAndPrefixes } from 'src/selectors';
import Actions from 'src/actions';

function* updateQuery() {
	const { classes, prefixes } = yield select(getSelectedDataAndPrefixes);
	yield put(Actions.Creators.r_updateQuery(classes, prefixes));
}

function* onCanvasClick() {
	yield put(Actions.Creators.r_deselectAll());
	yield updateQuery();
}


export default function*() {
	yield all([]);
}
