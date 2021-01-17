import React from 'react';
import { Menu, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { openLoadDialogModal } from '@@components/controls/file-dialog';
import { loadLocalData } from '@@actions/save-load';
import { pipe, path } from 'ramda';
import { loadGraphFromJSON } from '@@actions/model/load-graph';

const loadUploadedFile = file => {
  const reader = new FileReader();

  reader.onload = pipe(path(['target', 'result']), JSON.parse, loadGraphFromJSON);
  reader.readAsText(file);

  // Prevent upload
  return false;
};

export const LoadMenu = ({lastLocalSave, loggedIn}) => (
  <Menu.SubMenu icon={<UploadOutlined />} title="Load" onTitleClick={loggedIn ? openLoadDialogModal : loadLocalData}>
    <Menu.Item>
      <Upload style={{display: 'none'}} accept=".json" beforeUpload={loadUploadedFile}>Upload file</Upload>
    </Menu.Item>
    <Menu.Item onClick={loadLocalData}>Load last local save - {new Date(lastLocalSave).toLocaleString()}</Menu.Item>
    <Menu.Item onClick={openLoadDialogModal}>Load remote resource</Menu.Item>
  </Menu.SubMenu>
);
