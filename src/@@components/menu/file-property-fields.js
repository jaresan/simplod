import React from 'react';
import { Button, Input, Space, Tooltip } from 'antd';
import { loadGraphFromURL } from '@@actions/model/load-graph';
import { path, pipe } from 'ramda';
import { InfoCircleOutlined } from '@ant-design/icons';

const unwrapped = fn => pipe(path(['target', 'value']), fn);

const labels = {
  dataSchema: ['Data schema URL:', 'URL from which the data schema should be retrieved'],
  endpoint: ['Endpoint:', 'URL of the SPARQL endpoint against which the query is run'],
  title: ['Title:', 'Title of the project.'],
  description: ['Description:', 'Text description of what this project represents.']
};

const getField = arr => <Space>
  {arr[0]}
  <Tooltip title={arr[1]}>
    <InfoCircleOutlined />
  </Tooltip>
</Space>;

export const FilePropertyFields = ({
  onSchemaReload,
  onTitleChange,
  onEndpointChange,
  onSchemaChange,
  onDescriptionChange,
  schemaURL, endpointURL, title, description
}) =>
  <Space direction="vertical" style={{width: '100%'}}>
    {getField(labels.dataSchema)}
    <Input
      type="text"
      value={schemaURL}
      onChange={unwrapped(onSchemaChange)}
      placeholder="Data schema URL"
    />
    {
      onSchemaReload && <Button onClick={() => loadGraphFromURL({dataSchemaURL: schemaURL, endpointURL})}>
        Reload schema
      </Button>
    }
    {getField(labels.endpoint)}
    <Input
      type="text"
      value={endpointURL}
      onChange={unwrapped(onEndpointChange)}
      placeholder="Endpoint URL"
    />
    {getField(labels.title)}
    <Input
      type="text"
      onChange={unwrapped(onTitleChange)}
      value={title}
      placeholder="Project title"
    />
    {getField(labels.description)}
    <Input.TextArea
      type="text"
      onChange={unwrapped(onDescriptionChange)}
      value={description}
      placeholder="File description"
    />
  </Space>;
