/**
 * @file "File" menu item specification
 * @module @@components/menu/file-menu
 */
import React from 'react';
import { Menu } from 'antd';
import { openNewFileModal } from '@@components/menu/new-file';
import { openPropertiesModal } from '@@components/menu/properties';
import { openLoadDialogModal, openSaveDialogModal } from '@@components/controls/file-dialog';
import { translated } from '@@localization';

export const FileMenu = () => (
  <Menu.SubMenu title={translated('File')}>
    <Menu.Item onClick={openNewFileModal}>{translated('New')}</Menu.Item>
    <Menu.Divider/>
    <Menu.Divider/>
    <Menu.Item title="Save" onClick={openSaveDialogModal}>{translated('Save')}</Menu.Item>
    <Menu.Item title="Load" onClick={openLoadDialogModal}>{translated('Load')}</Menu.Item>
    <Menu.Item onClick={openPropertiesModal}>{translated('Properties')}</Menu.Item>
  </Menu.SubMenu>
);
