import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuery, getEndpoint } from 'src/selectors/index';
import styled from '@emotion/styled';
import YASGUI from '@triply/yasgui';
import Actions from 'src/actions/yasgui';
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
		const tab = this.yasgui.getTab();
		tab.setQuery(this.props.query);
		setTimeout(() => tab.yasqe.autoformat(), 1);
		tab.setEndpoint(this.props.endpoint);
		this.props.setSimpleQuery(tab.yasr.config.getPlainQueryLinkToEndpoint());
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

const mapDispatchToProps = {
	setSimpleQuery: Actions.Creators.r_setSimpleQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(YasguiContainer);
