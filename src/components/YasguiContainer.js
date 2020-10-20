import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPrefixes, getSelectedProperties } from 'src/selectors/index';
import { parseSPARQLQuery } from 'src/utils/parseQuery';
import { sparqlProxy } from 'src/constants/api';
import styled from '@emotion/styled';
import YASGUI from '@triply/yasgui';
import "@triply/yasgui/build/yasgui.min.css";


const Container = styled.div`
	overflow: auto;
	.yasqe {
		text-align: left;
	}
`;

class YasguiContainer extends Component {
	constructor(props) {
		super(props);
		this.yasgui = null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {selectedProperties, prefixes} = this.props;
		if (selectedProperties !== prevProps.selectedProperties) {
			this.yasgui.getTab().setQuery(parseSPARQLQuery(selectedProperties, prefixes.toJS()));
		}
	}

	componentDidMount() {
		const yasgui = new YASGUI(this.yasguiMountNode, {corsProxy: sparqlProxy});

		this.yasgui = yasgui;
		yasgui.getTab().setEndpoint(this.props.endpointURL);
		window.current = yasgui;
		window.yasgui = YASGUI;
		// Force usage of cors
		YASGUI.__defineGetter__('corsEnabled', () => ({}))
	}

	render() {
		return <Container id="yasgui" ref={ref => this.yasguiMountNode = ref}/>;
	}
}

const mapStateToProps = appState => ({
	selectedProperties: getSelectedProperties(appState),
	prefixes: getPrefixes(appState)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(YasguiContainer);
