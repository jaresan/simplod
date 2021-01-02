import Model from '@@actions/model';
import { parseSPARQLQuery } from '@@utils/parseQuery';
import { invertObj, mergeDeepRight, paths, pick, view, map } from 'ramda';
import possiblePrefixes from '@@constants/possiblePrefixes';
import {getHumanReadableDataPromises} from '@@api';
import {dispatch, dispatchSet, getState} from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as YasguiState from '@@app-state/yasgui/state';
import { entityTypes } from '@@constants/entityTypes';
import {fromJS} from 'immutable';

export const dataChanged = () => {
	const state = getState();
	const prefixes = view(YasguiState.prefixes, state);
	const selectedProperties = state.model.getIn(['entities', entityTypes.property]).filter(e => e.get('selected')).toJS();
	const selectedEntities = state.model.getIn(['entities', entityTypes.class]).filter(e => e.get('selected')).toJS();
	const limit = view(ModelState.limit, state);
	const limitEnabled = view(ModelState.limitEnabled, state);
	const selectionOrder = view(ModelState.selectionOrder, state).toJS();
	const prefixToIRI = Object.assign(prefixes, invertObj(possiblePrefixes));
	dispatchSet(YasguiState.query, parseSPARQLQuery({selectedProperties, selectedEntities, prefixes: prefixToIRI, limit, limitEnabled, selectionOrder}));
}

const getField = (languageOrder, field, data) => paths(languageOrder.map(l => [l, field]), data).find(a => a);

const getHumanData = () => {
	dispatchSet(ModelState.labelsLoadingProgress, 0);
	const state = getState();
	const classes = view(ModelState.classes, state);
	const prefixes = view(YasguiState.prefixes, state);
	const language = view(ModelState.language, state);
	const jsClasses = classes.toJS();
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
	// TODO: @immutable
	if (entities.toJS) {
		entities = entities.toJS()
	}
	const languageOrder = [language, 'en', 'de', 'default'];

	return map(e => {
		e.info = e.info || {};
		e.info.label = getField(languageOrder, 'label', e.info.byLanguage);
		e.info.description = getField(languageOrder, 'description', e.info.byLanguage);
		return e;
	}, entities);
}

export const changeLanguage = language => {
	dispatchSet(ModelState.language, language);
	const state = getState();
	const classes = view(ModelState.classes, state);
	const updatedClasses = updateEntityLanguageInfo(classes, language);

	const newClasses = classes.mergeDeep(fromJS(updatedClasses));
	dispatchSet(ModelState.classes, newClasses);
}

export const onDataLoaded = () => {
	const state = getState();
	const propsById = state.model.getIn(['entities', entityTypes.property])
		.reduce((acc, p, id) => {
			const source = p.get('source');
			const existing = acc[source] || [];

			return Object.assign(acc, {[source]: existing.concat(id)});
		}, {});

	const newClasses = view(ModelState.classes, state).map((c, id) => c.set('propertyIds', propsById[id]));
	dispatchSet(ModelState.classes, newClasses);
	getHumanData();
}

// FIXME: Save only the diff, otherwise too big
export const saveData = () => {
	const state = getState().model;
	dispatchSet(ModelState.lastSave, Date.now());
	localStorage.setItem('model', JSON.stringify(state.toJS()));
}

export const loadData = () => {
	const state = getState().model;
	const json = JSON.parse(localStorage.getItem('model'));
	const newState = fromJS(Object.assign(json, pick(['lastSave'], state.toJS())));
	dispatchSet(ModelState.rootLens, newState);
}
