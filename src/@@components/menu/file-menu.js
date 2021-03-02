import React from 'react';
import { Menu } from 'antd';
import { loadLocalData } from '@@actions/save-load';
import { openFileDialogModal } from '@@components/controls/file-dialog';
import { loadGraphFromURL } from '@@actions/model/load-graph';


export const FileMenu = () => (
  <Menu.SubMenu title="File">
    <Menu.Item onClick={loadLocalData}>New</Menu.Item>
    <Menu.Divider/>
    <Menu.SubMenu title="Examples">
      <Menu.Item onClick={() => loadGraphFromURL({dataSchemaURL: 'https://sparql-proxy-api.jaresantonin.now.sh/spo-job-applicants.ttl'})}>Single</Menu.Item>
      <Menu.Item onClick={() => loadGraphFromURL({dataSchemaURL: 'https://sparql-proxy-api.jaresantonin.now.sh/spo-court.ttl'})}>Court example</Menu.Item>
      <Menu.Item onClick={() => loadGraphFromURL({dataSchemaURL: 'https://sparql-proxy-api.jaresantonin.now.sh/data.gov.cz.ttl'})}>Gov example</Menu.Item>
    </Menu.SubMenu>
    <Menu.Divider/>
    <Menu.Item title="Files" onClick={openFileDialogModal}>SOLID Files</Menu.Item>
    <Menu.Item onClick={loadLocalData}>Properties</Menu.Item>
  </Menu.SubMenu>
);
