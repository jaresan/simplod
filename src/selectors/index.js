export const getSelectedDataAndPrefixes = appState => {
	const classes = appState.graphModel.get('selectedObjects').map(cellView => cellView.model.attributes.classData);

	return {
		classes: classes.toJS(),
		prefixes: appState.yasgui.get('prefixes')
	}
};
