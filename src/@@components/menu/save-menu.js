import React from 'react';
import { Menu } from 'antd';
import { openSaveDialogModal } from '@@components/controls/file-dialog';
import { downloadData, saveData, saveDataLocally } from '@@actions/save-load';

export const SaveMenu = () => (
  <Menu.SubMenu title="Save" onTitleClick={saveData}>
    <Menu.Item onClick={downloadData}>Download file</Menu.Item>
    <Menu.Item onClick={saveDataLocally}>Save locally</Menu.Item>
    <Menu.Item onClick={openSaveDialogModal}>Save as</Menu.Item>
  </Menu.SubMenu>
);
