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
		const yasgui = window.YASGUI(this.element, {
			api: {
				corsProxy: 'https://sparql.org/sparql'
			},
			catalogueEndpoints: [],
			endpoint: 'https://linked.opendata.cz/sparql'
		});
		this.yasgui = yasgui.current();
	}

	render() {
		return <div id="yasgui" ref={ ref => this.element = ref }/>;
	}
}

const mapStateToProps = appState => ({
	selectedProperties: getSelectedProperties(appState),
	selectedClasses: getSelectedData(appState)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Yasgui);
