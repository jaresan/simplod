import React from 'react';
import { Menu, Upload } from 'antd';
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

export const LoadMenu = ({lastLocalSave}) => (
  <Menu.SubMenu title="Load">
    <Menu.Item>
      <Upload style={{display: 'none'}} accept=".json" beforeUpload={loadUploadedFile}>Upload file</Upload>
    </Menu.Item>
    <Menu.Item onClick={loadLocalData}>Load from browser storage - {new Date(lastLocalSave).toLocaleString()}</Menu.Item>
    <Menu.Item onClick={openLoadDialogModal}>Load remote resource</Menu.Item>
  </Menu.SubMenu>
);
