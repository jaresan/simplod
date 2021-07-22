/**
 * @file Container for the YASGUI SPARQL editor tool. Reflects changes made to the application model and allows
 * for direct query edits.
 * @module @@components/Yasgui
 */
import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import {
	getQuery,
	getEndpoint,
	getLimit,
	getLimitEnabled,
	getInstance,
	getCartesianProduct,
	getModelQuery
} from '@@selectors';
import styled from '@emotion/styled';
import YASGUI from '@triply/yasgui';
import * as ModelState from '@@app-state/model/state';
import * as YasguiState from '@@app-state/yasgui/state';
import { dispatchSet, getState, store } from '@@app-state';
import { Alert, InputNumber, Modal, Switch, Space } from 'antd';
import * as SettingsState from '@@app-state/settings/state';
import { translated } from '@@localization';
import "@triply/yasgui/build/yasgui.min.css";
import { sparqlProxy, useProxy } from '@@constants/api';

const YasguiContainer = styled.div`
	width: fit-content;
	min-width: 512px;
	overflow: auto;
	.yasqe {
		text-align: left;
	}
`;

const yasguiRoot = document.createElement('div');
const yasgui = new YASGUI(yasguiRoot, useProxy ? {
	corsProxy: sparqlProxy
} : {});

dispatchSet(YasguiState.instance, yasgui);

class Yasgui extends Component {
	constructor(props) {
		super(props);
		this.yasgui = yasgui;
	}

	update() {
		this.tab().setQuery(this.props.query);
		this.tab().setEndpoint(this.props.endpoint);
		this.autoformatting = true;
		this.tab().yasqe.autoformat();
		this.autoformatting = false;
	}

	tab() {
		return this.yasgui.getTab();
	}

	onQueryChange = (_, {origin}) => {
		if (origin && origin !== 'setValue' && !this.autoformatting) {
			dispatchSet(ModelState.query, this.tab().getQuery());
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.query !== this.props.query && !this.props.modelQuery) { // If modelQuery exists, it's being already edited, no need to update
			this.update();
		}
	}

	componentDidMount() {
		this.yasguiContainer.appendChild(yasguiRoot);
		this.update();
		this.tab().getYasqe().on('change', this.onQueryChange);
	}

	componentWillUnmount() {
		this.tab().getYasqe().off('change', this.onQueryChange);
	}

	updateLimit = limit => {
		dispatchProps.updateLimit(limit);
	};

	toggleLimit = checked => {
		dispatchProps.toggleLimit(checked);
	};

	render() {
		const {limit, limitEnabled, cartesianProduct, modelQuery} = this.props;
		return <>
			{
				modelQuery &&
				<div style={{margin: '-12px 0 12px 0'}}>
					<Alert type='error' showIcon={false} message={translated('Current SPARQL Query has been manually edited, making any changes in the application will remove these edits.')} banner />
				</div>
			}
			{
				cartesianProduct &&
				<div style={{margin: '-12px 0 12px 0'}}>
					<Alert message={translated('Current selection is not a connected graph and might result in querying a cartesian product.')} banner />
				</div>
			}
			<Space direction="vertical">
				<div>{translated('Maximum number of results (limit):')} <InputNumber value={limit} onChange={this.updateLimit} /></div>
				<div>{translated('Use limit:')} <Switch checked={limitEnabled} onChange={this.toggleLimit}/></div>
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
	cartesianProduct: getCartesianProduct(appState),
	modelQuery: getModelQuery(appState)
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
