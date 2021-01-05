import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuery, getEndpoint } from '@@selectors';
import styled from '@emotion/styled';
import YASGUI from '@triply/yasgui';
import * as YasguiState from '@@app-state/yasgui/state';
import "@triply/yasgui/build/yasgui.min.css";
import { dispatchSet } from '@@app-state';


const Container = styled.div`
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	.yasqe {
		text-align: left;
	}
`;

class YasguiContainer extends Component {
	constructor(props) {
		super(props);
		this.yasgui = null;
		localStorage.removeItem('yagui__config')
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const tab = this.yasgui.getTab();
		tab.setQuery(this.props.query);
		setTimeout(() => tab.yasqe.autoformat(), 1);
		tab.setEndpoint(this.props.endpoint);
		dispatchSet(YasguiState.simpleQuery, tab.yasr.config.getPlainQueryLinkToEndpoint());
	}

	componentDidMount() {
		const yasgui = new YASGUI(this.yasguiMountNode, {
			requestConfig: {
				// endpoint: this.props.endpointURL,
				// headers: () => ({
				// 	Accept: 'application/sparql-results+json'
				// }),
				// method: 'GET',
			}
		});

		this.yasgui = yasgui;
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
	query: getQuery(appState),
	endpoint: getEndpoint(appState)
});

export default connect(mapStateToProps, null)(YasguiContainer);
