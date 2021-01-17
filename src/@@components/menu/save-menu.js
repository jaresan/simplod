import React from 'react';
import { Menu, Tooltip } from 'antd';
import { SaveOutlined, WarningTwoTone } from '@ant-design/icons';
import { openSaveDialogModal } from '@@components/controls/file-dialog';
import { downloadData, saveData, saveDataLocally } from '@@actions/save-load';
import { always, cond, equals, T } from 'ramda';

const getTitle = cond([
  [equals(''), always(<Tooltip title="File not saved remotely">Save <WarningTwoTone twoToneColor="orange" /></Tooltip>)],
  [T, always('Save')]
]);

export const SaveMenu = ({modelFileLocation}) => (
  <Menu.SubMenu icon={<SaveOutlined />} title={getTitle(modelFileLocation)} onTitleClick={saveData}>
    <Menu.Item onClick={downloadData}>Download file</Menu.Item>
    <Menu.Item onClick={saveDataLocally}>Save locally</Menu.Item>
    <Menu.Item onClick={() => openSaveDialogModal({enablePermissions: true})}>Save as</Menu.Item>
  </Menu.SubMenu>
);
