import React from 'react';
import { Menu } from 'antd';
import { openFileDialogModal } from '@@components/controls/file-dialog';
import { loadGraphFromURL } from '@@actions/model/load-graph';
import { openNewFileModal } from '@@components/menu/new-file';
import { openPropertiesModal } from '@@components/menu/properties';

const endpointURL = 'https://data.gov.cz/sparql';
export const FileMenu = () => (
  <Menu.SubMenu title="File">
    <Menu.Item onClick={openNewFileModal}>New</Menu.Item>
    <Menu.Divider/>
    <Menu.SubMenu title="Examples">
      <Menu.Item onClick={() => loadGraphFromURL({dataSchemaURL: 'https://sparql-proxy-api.jaresantonin.now.sh/spo-job-applicants.ttl', endpointURL})}>Single</Menu.Item>
      <Menu.Item onClick={() => loadGraphFromURL({dataSchemaURL: 'https://sparql-proxy-api.jaresantonin.now.sh/spo-court.ttl', endpointURL})}>Court example</Menu.Item>
      <Menu.Item onClick={() => loadGraphFromURL({dataSchemaURL: 'https://sparql-proxy-api.jaresantonin.now.sh/data.gov.cz.ttl', endpointURL})}>Gov example</Menu.Item>
    </Menu.SubMenu>
    <Menu.Divider/>
    <Menu.Item title="Files" onClick={openFileDialogModal}>SOLID Files</Menu.Item>
    <Menu.Item onClick={openPropertiesModal}>Properties</Menu.Item>
  </Menu.SubMenu>
);
