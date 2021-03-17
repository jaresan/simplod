import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { getQuery, getEndpoint, getLimit, getLimitEnabled, getInstance, getCartesianProduct } from '@@selectors';
import styled from '@emotion/styled';
import YASGUI from '@triply/yasgui';
import * as YasguiState from '@@app-state/yasgui/state';
import { dispatchSet, getState, store } from '@@app-state';
import { Alert, InputNumber, Modal, Switch, Space } from 'antd';
import * as SettingsState from '@@app-state/settings/state';
import { translated } from '@@localization';
import "@triply/yasgui/build/yasgui.min.css";

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
		const {limit, limitEnabled, cartesianProduct} = this.props;
		return <>
			{cartesianProduct &&
				<div style={{margin: '-12px 0 12px 0'}}>
					<Alert message={translated('Current selection is not a connected graph and might result in querying a cartesian product.')} banner />
				</div>
			}
			<Space direction="vertical">
				<div>Maximum number of results (limit): <InputNumber value={limit} onChange={this.updateLimit} /></div>
				<div>Use limit: <Switch checked={limitEnabled} onChange={this.toggleLimit}/></div>
				<YasguiContainer ref={ref => this.yasguiContainer = ref}/>
			</Space>
		</>;
	}
}

const mapStateToProps = appState => ({
	query: getQuery(appState),
	endpoint: getEndpoint(appState),
	limit: getLimit(appState),
	limitEnabled: getLimitEnabled(appState),
	cartesianProduct: getCartesianProduct(appState)
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
