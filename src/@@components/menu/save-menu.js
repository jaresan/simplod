import React from 'react';
import { Menu } from 'antd';
import { openSaveDialogModal } from '@@components/controls/file-dialog';
import { downloadData, saveDataLocally } from '@@actions/save-load';

export const SaveMenu = () => (
  <Menu.SubMenu title="Save">
    <Menu.Item onClick={downloadData}>Download file</Menu.Item>
    <Menu.Item onClick={saveDataLocally}>Save to browser storage</Menu.Item>
    <Menu.Item onClick={openSaveDialogModal}>Save as</Menu.Item>
  </Menu.SubMenu>
);
