import { takeEvery, put, select, all, call } from 'redux-saga/effects';
import { getPrefixes, getSelectedProperties, getInfo, getSelectedEntities, getModel, getEntities, getLanguage } from '@@selectors';
import Interactions from '@@actions/interactions';
import Query from '@@actions/yasgui';
import Model from '@@actions/model';
import { parseSPARQLQuery } from '@@utils/parseQuery';
import { invertObj, paths } from 'ramda';
import possiblePrefixes from '@@constants/possiblePrefixes';
import {getHumanReadableDataPromises} from '@@api';
import {store, dispatchSet} from '@@app-state';
import { lastSave, labelsLoadingProgress } from '@@app-state/model/state';

function* dataChanged() {
	const prefixes = yield select(getPrefixes);
	const selectedProperties = yield select(getSelectedProperties);
	const selectedEntities = yield select(getSelectedEntities);
	const {selectionOrder, limit, limitEnabled} = yield select(getInfo);
	const prefixToIRI = Object.assign(prefixes, invertObj(possiblePrefixes));
	yield put(Query.Creators.r_updateQuery(parseSPARQLQuery({selectedProperties, selectedEntities, prefixes: prefixToIRI, limit, limitEnabled, selectionOrder})));
}

const getField = (languageOrder, field, data) => paths(languageOrder.map(l => [l, field]), data).find(a => a);

function* getHumanData() {
	yield dispatchSet(labelsLoadingProgress, 0);
	const prefixes = yield select(getPrefixes);
	const entities = yield select(getEntities);
	const language = yield select(getLanguage);
	const jsEntities = entities.toJS();
	const urls = Object.keys(jsEntities);
	const prefixToIri = prefixes;
	const iriToPrefix = invertObj(prefixes);
	// const data = yield call(getHumanReadableData, {urls, prefixToIri, iriToPrefix});

	let resolved = 0;
	const promises = getHumanReadableDataPromises({urls, prefixToIri, iriToPrefix})
		.map((p, i, arr) => {
			return p.then(data => {
				const newEntities = {}
				for (const id of Object.keys(data)) {
					if (jsEntities[id]) {
						newEntities[id] = {
							...jsEntities[id],
							info: {byLanguage: (data[id] || {})}
						};
					}

					store.dispatch(Model.Creators.r_updateEntities(updateEntityLanguageInfo(newEntities, language)));
				}
			})
			.catch(() => {})
			.finally(() => {
				resolved++;
				dispatchSet(labelsLoadingProgress, Math.round(resolved / arr.length * 100));
			})
		});

	yield Promise.all(promises);
	dispatchSet(labelsLoadingProgress, 100);
}

const updateEntityLanguageInfo = (entities, language) => {
	const languageOrder = [language, 'en', 'de', 'default'];
	for (const id of Object.keys(entities)) {
		if (entities[id]) {
			const info = (entities[id].info || {});
			entities[id] = {
				...entities[id],
				info: {
					...info,
					label: getField(languageOrder, 'label', info.byLanguage),
					description: getField(languageOrder, 'description', info.byLanguage),
				}
			};
		}
	}

	return entities;
}

function* changeLanguage({language}) {
	yield put(Model.Creators.r_setLanguage(language));
	let entities = yield select(getEntities);
	const newEntities = updateEntityLanguageInfo(entities.toJS(), language);

	yield put(Model.Creators.r_updateEntities(newEntities));
}

function* onDataLoaded() {
	yield put(Model.Creators.r_dataLoaded());
	yield getHumanData();
}

// FIXME: Save only the diff, otherwise too big
function* saveData() {
	const data = yield select(getModel);
	yield dispatchSet(lastSave, Date.now());
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
		takeEvery(Interactions.Types.S_DATA_LOADED, onDataLoaded),
		takeEvery(Interactions.Types.S_CHANGE_LANGUAGE, changeLanguage),
	]);
}
