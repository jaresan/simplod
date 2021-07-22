/**
 * @file Menu bar specification
 * @module @@components/menu/menu
 */
import React from 'react';
import {connect} from 'react-redux';
import { Avatar, Menu, Input, Affix, Button, Space } from 'antd';
import {
  UserOutlined,
  ShareAltOutlined,
  CloudUploadOutlined,
  DesktopOutlined,
  PlaySquareOutlined
} from '@ant-design/icons';
import { getAvatar, getSessionValid, getModelFileLocation, getFilename, getDirty } from '@@selectors';
import { openShareModal } from '@@components/menu/share-menu';
import { openSaveDialogModal } from '@@components/controls/file-dialog';
import { loginToSolid, logoutSolid } from '@@actions/solid/auth';
import { dispatchSet } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import styled from '@emotion/styled';
import { openSettingsModal } from '@@components/controls/settings';
import { FileMenu } from '@@components/menu/file-menu';
import { translated } from '@@localization';
import { saveData } from '@@actions/save';
import { openYasguiModal } from '@@components/Yasgui';

const FilenameInput = styled(Input)`
  border: none;
  font-size: 16px;
  max-width: 512px;
`;

const HiddenSpan = styled.span`
  font-size: 16px;
  position: absolute;
  top: -100px
`;

const getSaveIcons = (modelFileLocation, isDirty) => {
  const localProps = isDirty ? {color: 'orange', text: translated('Changes not saved')} : {color: 'green', text: translated('Changes saved')};
  const cloudProps = isDirty ? {color: 'orange', text: translated('Latest changes not saved to {modelFileLocation}', {modelFileLocation})} : {color: 'green', text: translated('File saved at {modelFileLocation}', {modelFileLocation})};

  return <div style={{display: 'flex', alignItems: 'center'}} onClick={saveData}>
    {!modelFileLocation && <DesktopOutlined style={{color: localProps.color, fontSize: 16}}/>}
    {!modelFileLocation && localProps.text}
    {modelFileLocation && <CloudUploadOutlined onClick={openSaveDialogModal} style={{color: cloudProps.color, fontSize: 16}}/>}
    {modelFileLocation && cloudProps.text}
  </div>
};

const iconStyle = {height: 48, width: 48};

class MenuComponent extends React.Component {
  state = {
    inputWidth: 0
  };

  constructor() {
    super();
    this.hiddenTitleRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      inputWidth: this.hiddenTitleRef.current.offsetWidth + 24 + 'px'
    })
  }

  render() {
    const {avatar, loggedIn, modelFileLocation, isDirty, filename} = this.props;

    return <Affix>
      <Menu selectable={false} mode="horizontal" style={{marginTop: -8, paddingLeft: 8}}>
        <Menu.Item style={{marginLeft: 4, padding: 0, marginBottom: -8, border: 'none'}}>
          <Space>
            <HiddenSpan ref={this.hiddenTitleRef}>{filename}</HiddenSpan>
            <FilenameInput style={{width: this.state.inputWidth}} value={filename} onPressEnter={e => e.target.blur()} onChange={e => {
              this.hiddenTitleRef.current.textContent = e.target.value;
              e.target.style.width = this.hiddenTitleRef.current.offsetWidth + 24 + 'px';
              dispatchProps.updateFilename(e.target.value)
            }}/>
            {getSaveIcons(modelFileLocation, isDirty)}
          </Space>
        </Menu.Item>
        <br/>
        {FileMenu({modelFileLocation, loggedIn})}
        <Menu.Item title={translated('Settings')} onClick={openSettingsModal}>Settings</Menu.Item>
        <Menu.SubMenu style={{height: 64, width: 64, position: 'absolute', top: 8, right: 0}}
                      icon={<Avatar style={iconStyle} size="large" src={avatar}
                                    icon={<UserOutlined style={iconStyle}/>}/>}>
          {
            loggedIn ? <Menu.Item onClick={logoutSolid}>{translated('Logout')}</Menu.Item> :
              <Menu.Item onClick={loginToSolid}>{translated('Login')}</Menu.Item>
          }
        </Menu.SubMenu>
        <Menu.Item style={{position: 'absolute', top: 12, right: 84}}><Button onClick={openShareModal}
                                                                              type="primary"><ShareAltOutlined/>{translated('Share')}</Button></Menu.Item>
        <Menu.Item style={{position: 'absolute', top: 12, right: 176}}><Button
          onClick={() => openYasguiModal({runQuery: true})} type="primary"><PlaySquareOutlined/>{translated('Run SPARQL Query')}</Button></Menu.Item>
      </Menu>
    </Affix>;
  }
}

const mapStateToProps = appState => ({
  avatar: getAvatar(appState),
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
