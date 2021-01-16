import React from 'react';
import {connect} from 'react-redux';
import { Avatar, Menu, Modal, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {view} from 'ramda';
import {getAvatar} from '@@selectors';
import * as SolidState from '@@app-state/solid/state';
import * as ModelState from '@@app-state/model/state';
import { ShareMenu } from '@@components/menu/share-menu';

class MenuComponent extends React.Component {
  onGetApplicationURL = () => {
    const url = new URL(window.location);
    url.searchParams.set('modelURL', this.props.modelFileLocation);
    url.searchParams.set('schemaURL', this.props.dataSchemaURL);
    url.searchParams.set('endpoint', this.props.endpoint);
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

  openShareModal = () => {
    Modal.info({maskClosable: true, icon: null, content: <ShareMenu/>});
  }

  render() {
    const {avatar} = this.props;

    return <Menu mode="horizontal">
      <Menu.Item><Avatar size="large" src={avatar} icon={<UserOutlined />} /></Menu.Item>
      <Menu.Item title="Share" onClick={this.openShareModal}>Share</Menu.Item>
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
  endpoint: view(ModelState.endpoint, appState),
  dataSchemaURL: view(ModelState.dataSchemaURL, appState),
  modelFileLocation: view(SolidState.modelFileLocation, appState)
});

const connected = connect(mapStateToProps, null)(MenuComponent);
export { connected as Menu };
