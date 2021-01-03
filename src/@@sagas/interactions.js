import { parseSPARQLQuery } from '@@utils/parseQuery';
import { invertObj, mapObjIndexed, paths, pick, view, map, filter, path, mergeRight, assoc } from 'ramda';
import possiblePrefixes from '@@constants/possiblePrefixes';
import {getHumanReadableDataPromises} from '@@api';
import {dispatch, dispatchSet, getState} from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as YasguiState from '@@app-state/yasgui/state';
import { entityTypes } from '@@constants/entityTypes';

export const dataChanged = () => {
	const state = getState();
	const prefixes = view(YasguiState.prefixes, state);
	const selectedProperties = filter(e => e.selected, path(['entities', entityTypes.property], state.model));
	const selectedClasses = filter(e => e.selected, path(['entities', entityTypes.class], state.model));
	const limit = view(ModelState.limit, state);
	const limitEnabled = view(ModelState.limitEnabled, state);
	const selectionOrder = view(ModelState.selectionOrder, state);
	const prefixToIRI = Object.assign(prefixes, invertObj(possiblePrefixes));
	dispatchSet(YasguiState.query, parseSPARQLQuery({selectedProperties, selectedEntities: selectedClasses, prefixes: prefixToIRI, limit, limitEnabled, selectionOrder}));
}

const getField = (languageOrder, field, data) => paths(languageOrder.map(l => [l, field]), data).find(a => a);

const getHumanData = () => {
	dispatchSet(ModelState.labelsLoadingProgress, 0);
	const state = getState();
	const classes = view(ModelState.classes, state);
	const prefixes = view(YasguiState.prefixes, state);
	const language = view(ModelState.language, state);
	const jsClasses = classes;
	const urls = Object.keys(jsClasses);
	const prefixToIri = prefixes;
	const iriToPrefix = invertObj(prefixes);
	// const data = yield call(getHumanReadableData, {urls, prefixToIri, iriToPrefix});

	let resolved = 0;
	const promises = getHumanReadableDataPromises({urls, prefixToIri, iriToPrefix})
		.map((p, i, arr) => {
			return p.then(data => {
				const newClasses = {}
				for (const id of Object.keys(data)) {
					if (jsClasses[id]) {
						newClasses[id] = {
							...jsClasses[id],
							info: {byLanguage: (data[id] || {})}
						};
					}

					// FIXME: Aggregate into one dispatch
					dispatch(ModelState.updateClasses(updateEntityLanguageInfo(newClasses, language)));
				}
			})
			.catch(() => {})
			.finally(() => {
				resolved++;
				dispatchSet(ModelState.labelsLoadingProgress, Math.round(resolved / arr.length * 100));
			})
		});

	Promise.all(promises)
		.then(() => dispatchSet(ModelState.labelsLoadingProgress, 100));
}

const updateEntityLanguageInfo = (entities, language) => {
	const languageOrder = [language, 'en', 'de', 'default'];

	return map(e => {
		e.info = e.info || {};
		// Object.assign({}, ...) to get a new copy
		return Object.assign({}, e, {
			info: {
				...e.info,
				label: getField(languageOrder, 'label', e.info.byLanguage),
				description: getField(languageOrder, 'description', e.info.byLanguage)
			}
		})
	}, entities);
}

export const changeLanguage = language => {
	dispatchSet(ModelState.language, language);
	const state = getState();
	const classes = view(ModelState.classes, state);
	const updatedClasses = updateEntityLanguageInfo(classes, language);

	dispatchSet(ModelState.classes, updatedClasses);
}

export const onDataLoaded = () => {
	const state = getState();
	// FIXME: @reference
	const properties = path(['entities', entityTypes.property], state.model);
	const propsById = Object.entries(properties).reduce((acc, [id, p]) => {
			const source = p.source;
			const existing = acc[source] || [];

			return Object.assign(acc, {[source]: existing.concat(id)});
		}, {});

	// FIXME: @reference
	const newClasses = mapObjIndexed((c, id) => Object.assign(c, {propertyIds: propsById[id]}), view(ModelState.classes, state));
	dispatchSet(ModelState.classes, newClasses);
	getHumanData();
}

// FIXME: Save only the diff, otherwise too big
export const saveData = () => {
	const state = getState().model;
	dispatchSet(ModelState.lastSave, Date.now());
	localStorage.setItem('model', JSON.stringify(state));
}

export const loadData = () => {
	const state = getState().model;
	const json = JSON.parse(localStorage.getItem('model'));
	const newState = Object.assign(json, pick(['lastSave'], state));
	dispatchSet(ModelState.rootLens, newState);
}
