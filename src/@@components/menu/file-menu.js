import React from 'react';
import { Menu } from 'antd';
import { openNewFileModal } from '@@components/menu/new-file';
import { openPropertiesModal } from '@@components/menu/properties';
import { openLoadDialogModal, openSaveDialogModal } from '@@components/controls/file-dialog';

export const FileMenu = () => (
  <Menu.SubMenu title="File">
    <Menu.Item onClick={openNewFileModal}>New</Menu.Item>
    <Menu.Divider/>
    <Menu.Divider/>
    <Menu.Item title="Save" onClick={openSaveDialogModal}>Save</Menu.Item>
    <Menu.Item title="Load" onClick={openLoadDialogModal}>Load</Menu.Item>
    <Menu.Item onClick={openPropertiesModal}>Properties</Menu.Item>
  </Menu.SubMenu>
);
