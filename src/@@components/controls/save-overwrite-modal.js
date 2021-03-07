import React from 'react';
import { Input, Modal, Space, Tooltip } from 'antd';
import styled from '@emotion/styled';
import { openFileDialogModal } from '@@components/controls/file-dialog';
import { translated } from '@@localization';

const NameField = styled(Input)`
  width: fit-content;
`

const getField = (label, {old, new: newValue}) => old !== newValue && <>
  <span>{label}</span>
  <Space>
    <Tooltip title={`${translated('Saved value:')} ${old}`}>
      <NameField value={old}/>
    </Tooltip>
    -->
    <Tooltip title={`${translated('New value:')} ${newValue}`}>
      <NameField value={newValue}/>
    </Tooltip>
  </Space>
</>;

const SaveOverwritePrompt = ({dataSchemaURL, endpointURL, filename}) => <Space direction="vertical">
  <h4>{translated('Configuration changes have been detected between last saved file and the current project:')}</h4>
  {getField(translated('Filename:'), filename)}
  {getField(translated('Data schema URL:'), dataSchemaURL)}
  {getField(translated('Endpoint URL:'), endpointURL)}
  <div style={{marginTop: 8}}>{translated('To get complete save functionality, ')}<a href='./#' onClick={openFileDialogModal}>{translated('use your solid pod to save files.')}</a></div>
</Space>;

export const openSaveOverwritePrompt = ({onOk, dataSchemaURL, endpointURL, filename}) => Modal.confirm({
  title: translated('Are you sure you want to overwrite last save?'),
  onOk,
  maskClosable: true,
  content: <SaveOverwritePrompt
    dataSchemaURL={dataSchemaURL}
    endpointURL={endpointURL}
    filename={filename}
  />
})
