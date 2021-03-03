import { Button, Input, Select, Space, Switch, Modal, Radio } from 'antd';
import { changeLanguage } from '@@actions/interactions/change-language';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { dispatchSet, store } from '@@app-state';
import { getDataSchemaURL, getEndpoint, getLanguage, getShowHumanReadable, getHorizontalLayout } from '@@selectors';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import { languages } from '@@constants/languages';
import { loadGraphFromURL } from '@@actions/model/load-graph';
import {pipe, path} from 'ramda';

const {Option} = Select;

const languageOptions = languages.sort().map(code => <Option key={code} value={code}>{code}</Option>);

const Settings = ({language, showHumanReadable, endpointURL, dataSchemaURL, horizontalLayout}) => {
  const dataSchemaInput = React.createRef();
  const endpointInput = React.createRef();

  return <Space direction="vertical">
    <Space>
      <span>Data schema URL:</span>
      <Input type="text" value={dataSchemaURL} ref={dataSchemaInput} placeholder="Data schema URL"/>
      <Button onClick={() => loadGraphFromURL({dataSchemaURL: dataSchemaInput.current.input.value, endpointURL})}>
        Reload graph
      </Button>
    </Space>
    <Space>
      <span>Endpoint:</span>
      <Input
        type="text"
        value={endpointURL}
        ref={endpointInput}
        placeholder="Endpoint URL"
        onChange={e => dispatchProps.updateEndpoint(e.target.value)}
        onPressEnter={e => dispatchProps.updateEndpoint(e.target.value)}
      />
    </Space>
    <Space>
      <span>Show labels:</span>
      <Switch style={{width: 32}} onChange={dispatchProps.toggleHumanReadable} checked={showHumanReadable}/>
    </Space>
    <Space>
      <span>Select language:</span>
      <Select onChange={changeLanguage} value={language}>{languageOptions}</Select>
    </Space>
    <Space>
      View orientation:
      <Radio.Group onChange={pipe(path(['target', 'value']), dispatchProps.toggleLayout)} value={horizontalLayout}>
        <Radio.Button value={true}>Horizontal</Radio.Button>
        <Radio.Button value={false}>Vertical</Radio.Button>
      </Radio.Group>
    </Space>
  </Space>
}

const mapStateToProps = appState => console.log(appState) || ({
  language: getLanguage(appState),
  showHumanReadable: getShowHumanReadable(appState),
  endpointURL: getEndpoint(appState),
  dataSchemaURL: getDataSchemaURL(appState),
  horizontalLayout: getHorizontalLayout(appState)
});

const dispatchProps = {
  toggleHumanReadable: dispatchSet(SettingsState.showHumanReadable),
  updateEndpoint: dispatchSet(ModelState.endpoint),
  toggleLayout: dispatchSet(SettingsState.horizontalLayout)
};

// Connect component to enable use in modal content
const Container = connect(mapStateToProps, null)(Settings);

const Connected = <Provider store={store}><Container/></Provider>;

export const openSettingsModal = () => Modal.info({icon: null, maskClosable: true, content: Connected});
