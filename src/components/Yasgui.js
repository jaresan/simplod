import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedProperties, getSelectedData } from 'src/selectors/index';
import { parseSPARQLQuery } from 'src/utils';
import { sparqlProxy } from '../constants/api';
import styled from '@emotion/styled';

const Container = styled.div`
	overflow: auto;
	.yasqe {
		text-align: left;
	}
`;

class Yasgui extends Component {
	constructor() {
		super();
		this.yasgui = null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {selectedProperties} = this.props;
		if (selectedProperties !== prevProps.selectedProperties) {
			this.yasgui.setQuery(parseSPARQLQuery(selectedProperties));
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
		return <Container id="yasgui" ref={ ref => this.element = ref }/>;
	}
}

const mapStateToProps = appState => ({
	selectedProperties: getSelectedProperties(appState)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Yasgui);
