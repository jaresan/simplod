import React from 'react';
import {connect} from 'react-redux';
import { Avatar, Menu } from 'antd';
import { UserOutlined, ShareAltOutlined, FileOutlined } from '@ant-design/icons';
import { getAvatar, getLastSave, getSessionValid, getModelFileLocation } from '@@selectors';
import { openShareModal } from '@@components/menu/share-menu';
import { openFileDialogModal } from '@@components/controls/file-dialog';
import { LoadMenu } from '@@components/menu/load-menu';
import { SaveMenu } from '@@components/menu/save-menu';

class MenuComponent extends React.Component {
  render() {
    const {avatar, lastLocalSave, loggedIn, modelFileLocation} = this.props;

    return <Menu selectable={false} mode="horizontal">
      <Menu.Item><Avatar size="large" src={avatar} icon={<UserOutlined />} /></Menu.Item>
      <Menu.Item icon={<ShareAltOutlined />} title="Share" onClick={openShareModal}>Share</Menu.Item>
      <Menu.Item icon={<FileOutlined />} title="Files" onClick={openFileDialogModal}>Files</Menu.Item>
      {LoadMenu({lastLocalSave, loggedIn})}
      {SaveMenu({modelFileLocation})}
    </Menu>;
  };
}

const mapStateToProps = appState => ({
  avatar: getAvatar(appState),
  lastLocalSave: getLastSave(appState),
  loggedIn: getSessionValid(appState),
  modelFileLocation: getModelFileLocation(appState)
});

const connected = connect(mapStateToProps, null)(MenuComponent);
export { connected as Menu };
