import { invertObj, view, map } from 'ramda';
import {getHumanReadableDataPromises} from '@@api';
import {dispatch, dispatchSet, getState} from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as YasguiState from '@@app-state/yasgui/state';
import { updateLanguageInfo } from '@@model/class-entity';

export const getHumanData = () => {
	dispatchSet(ModelState.labelsLoadingProgress, 0);
	const state = getState();
	const classes = view(ModelState.classes, state);
	const prefixes = view(YasguiState.prefixes, state);
	const language = view(ModelState.language, state);
	const urls = Object.keys(classes);
	const prefixToIri = prefixes;
	const iriToPrefix = invertObj(prefixes);

	let resolved = 0;
	const promises = getHumanReadableDataPromises({urls, prefixToIri, iriToPrefix})
		.map((p, i, arr) => {
			return p.then(data => {
				const newClasses = Object.keys(data)
					.filter(id => classes.hasOwnProperty(id))
					.reduce((acc, id) => Object.assign(acc, {[id]: {
							...classes[id],
							info: {byLanguage: (data[id] || {})}
						}}), {});

				// FIXME: Aggregate into one dispatch
				dispatch(ModelState.updateClasses(map(updateLanguageInfo(language), newClasses)));
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
