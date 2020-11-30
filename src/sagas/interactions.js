import { takeEvery, put, select, all } from 'redux-saga/effects';
import { getPrefixes, getSelectedProperties, getSelectionOrder, getSelectedEntities } from 'src/selectors';
import Interactions from 'src/actions/interactions';
import Query from 'src/actions/yasgui';
import { parseSPARQLQuery } from 'src/utils/parseQuery';

function* dataChanged() {
	const prefixes = yield select(getPrefixes);
	const selectedProperties = yield select(getSelectedProperties);
	const selectedEntities = yield select(getSelectedEntities);
	const selectionOrder = yield select(getSelectionOrder);
	yield put(Query.Creators.r_updateQuery(parseSPARQLQuery({selectedProperties, selectedEntities, prefixes, selectionOrder})));
}

export default function*() {
	yield all([
		takeEvery(Interactions.Types.S_DATA_CHANGED, dataChanged)
	]);
}
