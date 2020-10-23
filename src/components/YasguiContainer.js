import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuery, getEndpoint } from 'src/selectors/index';
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
		localStorage.removeItem('yagui__config')
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.yasgui.getTab().setQuery(this.props.query);
		this.yasgui.getTab().setEndpoint(this.props.endpoint);
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(YasguiContainer);
