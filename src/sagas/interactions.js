import { takeEvery, put, select, all } from 'redux-saga/effects';
import { getPrefixes, getSelectedProperties, getSelectionOrder } from 'src/selectors';
import Interactions from 'src/actions/interactions';
import Query from 'src/actions/yasgui';
import { parseSPARQLQuery } from 'src/utils/parseQuery';

function* dataChanged() {
	const prefixes = yield select(getPrefixes);
	const properties = yield select(getSelectedProperties);
	const selectionOrder = yield select(getSelectionOrder);
	yield put(Query.Creators.r_updateQuery(parseSPARQLQuery(properties, prefixes, selectionOrder)));
}

export default function*() {
	yield all([
		takeEvery(Interactions.Types.S_DATA_CHANGED, dataChanged)
	]);
}
