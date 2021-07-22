/**
 * @file Fields describing properties of the project
 * @module @@components/menu/file-property-fields
 */
import React from 'react';
import { Button, Input, Space } from 'antd';
import { fromEvent } from '@@dom';
import { withInfoIcon } from '@@components/controls/with-info-icon';
import { translated } from '@@localization';

export const FilePropertyFields = ({
  onSchemaReload,
  onTitleChange,
  onEndpointChange,
  onSchemaChange,
  onDescriptionChange,
  schemaURL, endpointURL, title, description
}) => {
  const labels = {
    dataSchema: [translated('Data schema URL:'), translated('URL from which the data schema should be retrieved')],
    endpoint: [translated('SPARQL endpoint:'), translated('URL of the SPARQL endpoint against which the query is run')],
    title: [translated('Title:'), translated('Title of the project')],
    description: [translated('Description:'), translated('Text description of what this project represents')]
  };

  return <Space direction="vertical" style={{width: '100%'}}>
    {withInfoIcon(labels.dataSchema)}
    <Input
      type="text"
      value={schemaURL}
      onChange={fromEvent(onSchemaChange)}
      placeholder={translated('Data schema URL')}
    />
    {
      onSchemaReload && <Button onClick={onSchemaReload}>
        {translated('Reload schema')}
      </Button>
    }
    {withInfoIcon(labels.endpoint)}
    <Input
      type="text"
      value={endpointURL}
      onChange={fromEvent(onEndpointChange)}
      placeholder={translated('Endpoint URL')}
    />
    {withInfoIcon(labels.title)}
    <Input
      type="text"
      onChange={fromEvent(onTitleChange)}
      value={title}
      placeholder={translated('Project title')}
    />
    {withInfoIcon(labels.description)}
    <Input.TextArea
      type="text"
      onChange={fromEvent(onDescriptionChange)}
      value={description}
      placeholder={translated('File description')}
    />
  </Space>;
}
