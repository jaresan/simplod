import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedProperties, getSelectedData } from 'src/selectors/index';
import { parseSPARQLQuery } from 'src/utils';
import { sparqlProxy } from '../constants/api';

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
		window.YASGUI.defaults.catalogueEndpoints = [{
      endpoint: this.props.endpointURL
    }];

		const yasgui = window.YASGUI(this.element, {
			api: {
				corsProxy: sparqlProxy
			},
			endpoint: this.props.endpointURL,
      catalogueEndpoints: [{
				endpoint: this.props.endpointURL
			}],
		}).current();

		this.yasgui = yasgui;
		yasgui.setEndpoint(this.props.endpointURL);
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
