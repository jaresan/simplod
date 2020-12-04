import { takeEvery, put, select, all, call } from 'redux-saga/effects';
import { getPrefixes, getSelectedProperties, getInfo, getSelectedEntities, getModel, getEntities, getLanguage } from 'src/selectors';
import Interactions from 'src/actions/interactions';
import Query from 'src/actions/yasgui';
import Model from 'src/actions/model';
import { parseSPARQLQuery } from 'src/utils/parseQuery';
import { invertObj, paths } from 'ramda';
import possiblePrefixes from '../constants/possiblePrefixes';
import {getHumanReadableDataPromises} from 'src/api';
import store from 'src/store';

function* dataChanged() {
	const prefixes = yield select(getPrefixes);
	const selectedProperties = yield select(getSelectedProperties);
	const selectedEntities = yield select(getSelectedEntities);
	const {selectionOrder, limit} = yield select(getInfo);
	const prefixToIRI = Object.assign(prefixes, invertObj(possiblePrefixes));
	yield put(Query.Creators.r_updateQuery(parseSPARQLQuery({selectedProperties, selectedEntities, prefixes: prefixToIRI, limit, selectionOrder})));
}

const getField = (languageOrder, field, data) => paths(languageOrder.map(l => [l, field]), data).find(a => a);

function* getHumanData() {
	yield put(Model.Creators.r_setLoadingHumanReadableData(0));
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
				store.dispatch(Model.Creators.r_setLoadingHumanReadableData(Math.round(resolved / arr.length * 100)));
			})
		});

	yield Promise.all(promises);
	store.dispatch(Model.Creators.r_setLoadingHumanReadableData(100));
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
		takeEvery(Interactions.Types.S_DATA_LOADED, onDataLoaded),
		takeEvery(Interactions.Types.S_CHANGE_LANGUAGE, changeLanguage),
	]);
}
