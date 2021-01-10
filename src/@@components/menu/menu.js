import React from 'react';
import {connect} from 'react-redux';
import { Avatar, Menu, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {view} from 'ramda';
import {
  getAvatar,
  getLanguage, getLastSave,
  getLimit,
  getLimitEnabled,
  getLoadingHumanReadable,
  getShowHumanReadable
} from '@@selectors';
import { dispatch, dispatchSet } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import * as SolidState from '@@app-state/solid/state';
import * as YasguiState from '@@app-state/yasgui/state';
import styled from '@emotion/styled';

class MenuComponent extends React.Component {
  onGetCurlClick = () => {
    alert(this.props.yasguiInstance.getTab().yasqe.getAsCurlString());
  }

  onGetURL = () => {
    alert(this.props.yasguiInstance.getTab().yasr.config.getPlainQueryLinkToEndpoint());
  }

  onGetApplicationURL = () => {
    const url = new URL(window.location);
    url.searchParams.set('modelURL', this.props.modelFileLocation);
    url.searchParams.set('schemaURL', this.props.dataSchemaURL);
    url.searchParams.set('endpoint', this.props.endpoint);
    console.log(url);
    alert(url);
  };

  getAppUrlButton = () => {
    if (!this.props.modelFileLocation) {
      return <Menu.Item disabled>
        <Tooltip title="To be able to share the application URL, you have to save the model to your solid pod first.">
          Application URL
        </Tooltip>
      </Menu.Item>;
    }

    return <Menu.Item onClick={this.onGetApplicationURL}>Application URL</Menu.Item>;
  }

  render() {
    const {avatar} = this.props;

    return <Menu mode="horizontal">
      <Menu.Item><Avatar size="large" src={avatar} icon={<UserOutlined />} /></Menu.Item>
      <Menu.SubMenu title="Share">
        {this.getAppUrlButton()}
        <Menu.Divider />
        <Menu.Item onClick={this.onGetURL}>GET Request</Menu.Item>
        <Menu.Item onClick={this.onGetCurlClick}>cURL POST Request</Menu.Item>
      </Menu.SubMenu>
    </Menu>;
  };
}

const mapStateToProps = appState => ({
  avatar: getAvatar(appState),
  yasguiInstance: view(YasguiState.instance, appState),
  endpoint: view(YasguiState.endpoint, appState),
  dataSchemaURL: view(YasguiState.dataSchemaURL, appState),
  modelFileLocation: view(SolidState.modelFileLocation, appState)
});

const connected = connect(mapStateToProps, null)(MenuComponent);
export { connected as Menu };
