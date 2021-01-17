import React from 'react';
import {connect} from 'react-redux';
import { Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {view} from 'ramda';
import {getAvatar} from '@@selectors';
import * as SolidState from '@@app-state/solid/state';
import * as ModelState from '@@app-state/model/state';
import { openShareModal } from '@@components/menu/share-menu';
import { openFileDialogModal } from '@@components/controls/file-dialog';

class MenuComponent extends React.Component {
  render() {
    const {avatar} = this.props;

    return <Menu mode="horizontal">
      <Menu.Item><Avatar size="large" src={avatar} icon={<UserOutlined />} /></Menu.Item>
      <Menu.Item title="Share" onClick={openShareModal}>Share</Menu.Item>
      <Menu.Item title="Files" onClick={openFileDialogModal}>Files</Menu.Item>
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
