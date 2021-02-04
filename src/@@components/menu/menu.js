import React from 'react';
import {connect} from 'react-redux';
import { Avatar, Menu, Input, Affix, Button } from 'antd';
import { UserOutlined, ShareAltOutlined, FileOutlined, DatabaseOutlined } from '@ant-design/icons';
import { getAvatar, getLastSave, getSessionValid, getModelFileLocation, getFilename } from '@@selectors';
import { openShareModal } from '@@components/menu/share-menu';
import { openFileDialogModal } from '@@components/controls/file-dialog';
import { LoadMenu } from '@@components/menu/load-menu';
import { SaveMenu } from '@@components/menu/save-menu';
import { loginToSolid, logoutSolid } from '@@actions/solid/auth';
import { openYasguiModal } from '@@components/Yasgui';
import { dispatchSet } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import styled from '@emotion/styled';

const FilenameInput = styled(Input)`
  border: none;
  font-size: 16px;
`;

const iconStyle = {height: 48, width: 48};

const MenuComponent = ({avatar, lastLocalSave, loggedIn, modelFileLocation, filename}) =>
  <Affix>
    <Menu selectable={false} mode="horizontal" style={{marginTop: -8, paddingLeft: 8}}>
      <Menu.Item style={{marginLeft: 8, padding: 0, marginBottom: -8, border: 'none'}}>
        <FilenameInput value={filename} onPressEnter={e => e.target.blur()} onChange={e => dispatchProps.updateFilename(e.target.value)}/>
      </Menu.Item>
      <br/>
      <Menu.Item icon={<FileOutlined />} title="Files" onClick={openFileDialogModal}>Files</Menu.Item>
      {LoadMenu({lastLocalSave, loggedIn})}
      {SaveMenu({modelFileLocation})}
      <Menu.Item icon={<DatabaseOutlined />} title="Share" onClick={openYasguiModal}>SPARQL</Menu.Item>
      <Menu.SubMenu style={{height: 64, width: 64, position: 'absolute', top: 8, right: 0}} icon={<Avatar style={iconStyle} size="large" src={avatar} icon={<UserOutlined style={iconStyle} />} />}>
        {
          loggedIn ? <Menu.Item onClick={logoutSolid}>Logout</Menu.Item> : <Menu.Item onClick={loginToSolid}>Login</Menu.Item>
        }
      </Menu.SubMenu>
      <Menu.Item style={{position: 'absolute', top: 12, right: 84}}><Button onClick={openShareModal} type="primary"><ShareAltOutlined />Share</Button></Menu.Item>
    </Menu>
  </Affix>;

const mapStateToProps = appState => ({
  avatar: getAvatar(appState),
  lastLocalSave: getLastSave(appState),
  loggedIn: getSessionValid(appState),
  modelFileLocation: getModelFileLocation(appState),
  filename: getFilename(appState)
});

const dispatchProps = {
  updateFilename: dispatchSet(ModelState.filename)
};

const connected = connect(mapStateToProps, null)(MenuComponent);
export { connected as Menu };
