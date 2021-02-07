import React from 'react';
import {connect} from 'react-redux';
import { Avatar, Menu, Input, Affix, Button, Tooltip } from 'antd';
import { UserOutlined, ShareAltOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { getAvatar, getLastSave, getSessionValid, getModelFileLocation, getFilename, getDirty } from '@@selectors';
import { openShareModal } from '@@components/menu/share-menu';
import { openFileDialogModal, openSaveDialogModal } from '@@components/controls/file-dialog';
import { LoadMenu } from '@@components/menu/load-menu';
import { SaveMenu } from '@@components/menu/save-menu';
import { loginToSolid, logoutSolid } from '@@actions/solid/auth';
import { openYasguiModal } from '@@components/Yasgui';
import { dispatchSet } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import styled from '@emotion/styled';
import { openSettingsModal } from '@@components/controls/settings';

const FilenameInput = styled(Input)`
  border: none;
  font-size: 16px;
`;

const getSaveIcons = (modelFileLocation, isDirty) => {
  // const localProps = isDirty ? {color: 'orange', text: 'Changes not saved in the browser storage'} : {color: 'green', text: 'Changes saved in browser storage'};
  const cloudProps = modelFileLocation ?
    isDirty ? {color: 'orange', text: 'Last changes not saved remotely'} : {color: 'green', text: `File saved at ${modelFileLocation}`}
    : {color: 'red', text: 'File not saved remotely'};

  return <>
    {/*<Tooltip title={localProps.text}><ChromeOutlined style={{color: localProps.color, fontSize: 16}}/></Tooltip>*/}
    <Tooltip title={cloudProps.text}><CloudUploadOutlined onClick={openSaveDialogModal} style={{color: cloudProps.color, fontSize: 16}}/></Tooltip>
  </>
};

const iconStyle = {height: 48, width: 48};

const MenuComponent = ({avatar, lastLocalSave, loggedIn, modelFileLocation, isDirty, filename}) =>
  <Affix>
    <Menu selectable={false} mode="horizontal" style={{marginTop: -8, paddingLeft: 8}}>
      <Menu.Item style={{marginLeft: 4, padding: 0, marginBottom: -8, border: 'none'}}>
        <FilenameInput value={filename} onPressEnter={e => e.target.blur()} onChange={e => dispatchProps.updateFilename(e.target.value)}/>
        {getSaveIcons(modelFileLocation, isDirty)}
      </Menu.Item>
      <br/>
      <Menu.Item title="Files" onClick={openFileDialogModal}>Files</Menu.Item>
      {LoadMenu({lastLocalSave, loggedIn})}
      {SaveMenu({modelFileLocation})}
      <Menu.Item title="SPARQL" onClick={openYasguiModal}>SPARQL</Menu.Item>
      <Menu.Item title="Settings" onClick={openSettingsModal}>Settings</Menu.Item>
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
  filename: getFilename(appState),
  isDirty: getDirty(appState)
});

const dispatchProps = {
  updateFilename: dispatchSet(ModelState.filename)
};

const connected = connect(mapStateToProps, null)(MenuComponent);
export { connected as Menu };
