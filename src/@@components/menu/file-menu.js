import React from 'react';
import { Menu } from 'antd';
import { openNewFileModal } from '@@components/menu/new-file';
import { openPropertiesModal } from '@@components/menu/properties';
import { SaveMenu } from '@@components/menu/save-menu';
import { LoadMenu } from '@@components/menu/load-menu';

export const FileMenu = ({modelFileLocation, lastLocalSave, loggedIn}) => (
  <Menu.SubMenu title="File">
    <Menu.Item onClick={openNewFileModal}>New</Menu.Item>
    <Menu.Divider/>
    <Menu.Divider/>
    {SaveMenu({modelFileLocation})}
    {LoadMenu({lastLocalSave, loggedIn})}
    <Menu.Item onClick={openPropertiesModal}>Properties</Menu.Item>
  </Menu.SubMenu>
);
