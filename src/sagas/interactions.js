import { takeEvery, put, select, all, call } from 'redux-saga/effects';
import { getPrefixes, getSelectedProperties, getInfo, getSelectedEntities, getModel, getEntities } from 'src/selectors';
import Interactions from 'src/actions/interactions';
import Query from 'src/actions/yasgui';
import Model from 'src/actions/model';
import { parseSPARQLQuery } from 'src/utils/parseQuery';
import { invertObj } from 'ramda';
import possiblePrefixes from '../constants/possiblePrefixes';
import {getHumanReadableData} from 'src/api';

function* dataChanged() {
	const prefixes = yield select(getPrefixes);
	const selectedProperties = yield select(getSelectedProperties);
	const selectedEntities = yield select(getSelectedEntities);
	const {selectionOrder, limit} = yield select(getInfo);
	const prefixToIRI = Object.assign(prefixes, invertObj(possiblePrefixes));
	yield put(Query.Creators.r_updateQuery(parseSPARQLQuery({selectedProperties, selectedEntities, prefixes: prefixToIRI, limit, selectionOrder})));
}

function* getHumanData() {
	const prefixes = yield select(getPrefixes);
	let entities = yield select(getEntities);
	entities = entities.toJS();
	const urls = Object.keys(entities);
	const prefixToIri = prefixes;
	const iriToPrefix = invertObj(prefixes);
	const data = yield call(getHumanReadableData, {urls, prefixToIri, iriToPrefix});

	for (const id of Object.keys(data)) {
		if (entities[id]) {
			entities[id] = {
				...entities[id],
				info: (data[id] || {})
			};
		}
	}

	yield put(Model.Creators.r_updateEntities(entities));

	// TODO: Add progress feedback
	// FIXME: Create label/description early directly in the entity info based on the language

}

function* onDataLoaded() {
	yield getHumanData();
	yield put(Model.Creators.r_dataLoaded());
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
		takeEvery(Interactions.Types.S_LOAD_DATA, loadData),
		takeEvery(Interactions.Types.S_DATA_LOADED, onDataLoaded)
	]);
}
