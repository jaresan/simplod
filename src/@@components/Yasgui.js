import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { getQuery, getEndpoint, getLimit, getLimitEnabled, getInstance } from '@@selectors';
import styled from '@emotion/styled';
import YASGUI from '@triply/yasgui';
import * as YasguiState from '@@app-state/yasgui/state';
import "@triply/yasgui/build/yasgui.min.css";
import { dispatchSet, getState, store } from '@@app-state';
import { InputNumber, Modal, Switch } from 'antd';
import * as SettingsState from '@@app-state/settings/state';

const YasguiContainer = styled.div`
	width: fit-content;
	min-width: 512px;
	overflow: auto;
	.yasqe {
		text-align: left;
	}
`;

const yasguiRoot = document.createElement('div');
const yasgui = new YASGUI(yasguiRoot, {
	requestConfig: {
		// endpoint: this.props.endpointURL,
		// headers: () => ({
		// 	Accept: 'application/sparql-results+json'
		// }),
		// method: 'GET',
	}
});
// Force usage of cors
YASGUI.__defineGetter__('corsEnabled', () => ({}))
dispatchSet(YasguiState.instance, yasgui);
localStorage.removeItem('yagui__config') // Remove old saved data -- "yagui" instead of "yasgui" is on purpose

class Yasgui extends Component {
	constructor(props) {
		super(props);
		this.yasgui = yasgui;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.update();
	}

	update() {
		const tab = this.yasgui.getTab();
		tab.setQuery(this.props.query);
		setTimeout(() => tab.yasqe.autoformat(), 1);
		tab.setEndpoint(this.props.endpoint);
	}

	componentDidMount() {
		this.update();
		this.yasguiContainer.appendChild(yasguiRoot);
	}

	updateLimit = limit => {
		dispatchProps.updateLimit(limit);
	};

	toggleLimit = checked => {
		dispatchProps.toggleLimit(checked);
	};

	render() {
		const {limit, limitEnabled} = this.props;
		return <>
			<span>Maximum number of results (limit): <InputNumber value={limit} onChange={this.updateLimit} />Use limit: <Switch checked={limitEnabled} onChange={this.toggleLimit}/></span>
			<YasguiContainer ref={ref => this.yasguiContainer = ref}/>
		</>;
	}
}

const mapStateToProps = appState => ({
	query: getQuery(appState),
	endpoint: getEndpoint(appState),
	limit: getLimit(appState),
	limitEnabled: getLimitEnabled(appState)
});

const dispatchProps = {
	updateLimit: dispatchSet(SettingsState.limit),
	toggleLimit: dispatchSet(SettingsState.limitEnabled),
};
const ConnectedComponent = connect(mapStateToProps, null)(Yasgui);

const YasguiTool = <Provider store={store}><ConnectedComponent/></Provider>;

export const openYasguiModal = ({runQuery}) => {
	Modal.info({icon: null, width: 'fit-content', maskClosable: true, content: YasguiTool});

	const state = getState();
	if (runQuery && getQuery(state)) {
		setTimeout(() => getInstance(state).getTab().query(), 500);
	}
}
