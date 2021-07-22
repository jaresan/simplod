/**
 * @file Settings menu
 * @module @@components/controls/settings
 */
import React from 'react';
import { Select, Space, Switch, Modal, Radio } from 'antd';
import { connect, Provider } from 'react-redux';
import { dispatchSet, store } from '@@app-state';
import { getDataSchemaURL, getEndpoint, getLanguage, getShowHumanReadable, getHorizontalLayout, getLabelLanguage } from '@@selectors';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import { interfaceLanguages, labelLanguages } from '@@constants/languages';
import {pipe, path, sortBy, prop} from 'ramda';
import { translated } from '@@localization';
import { withInfoIcon } from '@@components/controls/with-info-icon';

const {Option} = Select;

const interfaceLanguageOptions = interfaceLanguages.sort().map(code => <Option key={code} value={code}>{code}</Option>);
const labelLanguageOptions = sortBy(prop('code'), labelLanguages).map(({code}) => <Option key={code} value={code}>{code}</Option>);

const Settings = ({language, labelLanguage, showHumanReadable, horizontalLayout}) =>
  <Space direction="vertical">
    <span>{withInfoIcon([translated('Show labels:'), translated('Turn human readable labels on/off in the entity list')])}</span>
    <Switch style={{width: 32}} onChange={dispatchProps.toggleHumanReadable} checked={showHumanReadable}/>
    <span>{withInfoIcon([translated('Label language:'), translated('Preferred language of the labels. If not found, will default to English.')])}</span>
    <Select
      style={{width: 64}}
      showSearch
      placeholder="Search"
      optionFilterProp="children"
      filterOption={(input, {value: code}) => code.includes(input.toLowerCase())}
      onChange={dispatchProps.changeLabelLanguage}
      value={labelLanguage}>
      {labelLanguageOptions}
    </Select>
    <span>{translated('Application language:')}</span>
    <Select style={{width: 64}} onChange={dispatchProps.changeInterfaceLanguage} value={language}>{interfaceLanguageOptions}</Select>
    <span>{translated('View orientation')}:</span>
    <Radio.Group onChange={pipe(path(['target', 'value']), dispatchProps.toggleLayout)} value={horizontalLayout}>
      <Radio.Button value={true}>{translated('Horizontal')}</Radio.Button>
      <Radio.Button value={false}>{translated('Vertical')}</Radio.Button>
    </Radio.Group>
  </Space>;

const mapStateToProps = appState => ({
  language: getLanguage(appState),
  labelLanguage: getLabelLanguage(appState),
  showHumanReadable: getShowHumanReadable(appState),
  endpointURL: getEndpoint(appState),
  dataSchemaURL: getDataSchemaURL(appState),
  horizontalLayout: getHorizontalLayout(appState)
});

const dispatchProps = {
  toggleHumanReadable: dispatchSet(SettingsState.showHumanReadable),
  updateEndpoint: dispatchSet(ModelState.endpoint),
  toggleLayout: dispatchSet(SettingsState.horizontalLayout),
  changeInterfaceLanguage: dispatchSet(SettingsState.language),
  changeLabelLanguage: dispatchSet(SettingsState.labelLanguage)
};

// Connect component to enable use in modal content
const Container = connect(mapStateToProps, null)(Settings);

const Connected = <Provider store={store}><Container/></Provider>;

export const openSettingsModal = () => Modal.info({icon: null, maskClosable: true, content: Connected});
