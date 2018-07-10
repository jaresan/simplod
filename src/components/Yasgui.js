import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedProperties, getSelectedData } from 'src/selectors/index';
import { parseSPARQLQuery } from 'src/utils';

class Yasgui extends Component {
	constructor() {
		super();
		this.yasgui = null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.selectedProperties !== prevProps.selectedProperties) {
			this.yasgui.setQuery(parseSPARQLQuery(this.props));
		}
	}

	componentDidMount() {
		const yasgui = window.YASGUI(document.getElementById("yasgui"), {
			api: {
				corsProxy: 'http://sparql.org/sparql'
			},
			catalogueEndpoints: {},
			endpoint: 'http://linked.opendata.cz/sparql'
		});
		this.yasgui = yasgui.current();
	}

	render() {
		return <div id="yasgui"/>;
	}
}

const mapStateToProps = appState => ({
	selectedProperties: getSelectedProperties(appState),
	selectedClasses: getSelectedData(appState)
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Yasgui);
