import React from 'react';
import {connect} from 'react-redux';
import { Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getAvatar, getLastSave, getSessionValid } from '@@selectors';
import { openShareModal } from '@@components/menu/share-menu';
import { openFileDialogModal } from '@@components/controls/file-dialog';
import { LoadMenu } from '@@components/menu/load-menu';
import { SaveMenu } from '@@components/menu/save-menu';

class MenuComponent extends React.Component {
  render() {
    const {avatar, lastLocalSave, loggedIn} = this.props;

    return <Menu selectable={false} mode="horizontal">
      <Menu.Item><Avatar size="large" src={avatar} icon={<UserOutlined />} /></Menu.Item>
      <Menu.Item title="Share" onClick={openShareModal}>Share</Menu.Item>
      <Menu.Item title="Files" onClick={openFileDialogModal}>Files</Menu.Item>
      {LoadMenu({lastLocalSave, loggedIn})}
      {SaveMenu({lastLocalSave, loggedIn})}
    </Menu>;
  };
}

const mapStateToProps = appState => ({
  avatar: getAvatar(appState),
  lastLocalSave: getLastSave(appState),
  loggedIn: getSessionValid(appState)
});

const connected = connect(mapStateToProps, null)(MenuComponent);
export { connected as Menu };
