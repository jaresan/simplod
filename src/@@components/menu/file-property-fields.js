import React from 'react';
import { Button, Input, Space, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { fromEvent } from '@@data/utils';
import { withInfoIcon } from '@@components/controls/with-info-icon';

const labels = {
  dataSchema: ['Data schema URL:', 'URL from which the data schema should be retrieved'],
  endpoint: ['SPARQL endpoint:', 'URL of the SPARQL endpoint against which the query is run'],
  title: ['Title:', 'Title of the project'],
  description: ['Description:', 'Text description of what this project represents']
};

export const FilePropertyFields = ({
  onSchemaReload,
  onTitleChange,
  onEndpointChange,
  onSchemaChange,
  onDescriptionChange,
  schemaURL, endpointURL, title, description
}) =>
  <Space direction="vertical" style={{width: '100%'}}>
    {withInfoIcon(labels.dataSchema)}
    <Input
      type="text"
      value={schemaURL}
      onChange={fromEvent(onSchemaChange)}
      placeholder="Data schema URL"
    />
    {
      onSchemaReload && <Button onClick={onSchemaReload}>
        Reload schema
      </Button>
    }
    {withInfoIcon(labels.endpoint)}
    <Input
      type="text"
      value={endpointURL}
      onChange={fromEvent(onEndpointChange)}
      placeholder="Endpoint URL"
    />
    {withInfoIcon(labels.title)}
    <Input
      type="text"
      onChange={fromEvent(onTitleChange)}
      value={title}
      placeholder="Project title"
    />
    {withInfoIcon(labels.description)}
    <Input.TextArea
      type="text"
      onChange={fromEvent(onDescriptionChange)}
      value={description}
      placeholder="File description"
    />
  </Space>;
