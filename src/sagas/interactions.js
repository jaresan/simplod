import { takeEvery, put, select, all } from 'redux-saga/effects';
import { getPrefixes, getSelectedProperties, getInfo, getSelectedEntities, getModel } from 'src/selectors';
import Interactions from 'src/actions/interactions';
import Query from 'src/actions/yasgui';
import Model from 'src/actions/model';
import { parseSPARQLQuery } from 'src/utils/parseQuery';
import { invertObj } from 'ramda';
import possiblePrefixes from '../constants/possiblePrefixes';

function* dataChanged() {
	const prefixes = yield select(getPrefixes);
	const selectedProperties = yield select(getSelectedProperties);
	const selectedEntities = yield select(getSelectedEntities);
	const {selectionOrder, limit} = yield select(getInfo);
	const prefixToIRI = Object.assign(prefixes, invertObj(possiblePrefixes));
	yield put(Query.Creators.r_updateQuery(parseSPARQLQuery({selectedProperties, selectedEntities, prefixes: prefixToIRI, limit, selectionOrder})));
}

// FIXME: Save only the diff, otherwise too big
function* saveData() {
	const data = yield select(getModel);
	localStorage.setItem('model', JSON.stringify(data.toJS()));
}

function* loadData() {
	yield put(Model.Creators.r_loadState(JSON.parse(localStorage.getItem('model'))));
}

export default function*() {
	yield all([
		takeEvery(Interactions.Types.S_DATA_CHANGED, dataChanged),
		takeEvery(Interactions.Types.S_SAVE_DATA, saveData),
		takeEvery(Interactions.Types.S_LOAD_DATA, loadData)
	]);
}
