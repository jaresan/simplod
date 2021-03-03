import React, {useState} from 'react';
import { Button, Input, Space, Modal } from 'antd';
import {pipe, path} from 'ramda';
import { dispatchSet, store } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import { loadGraphFromURL } from '@@actions/model/load-graph';
import { getDataSchemaURL, getEndpoint } from '@@selectors';
import { connect, Provider } from 'react-redux';

const unwrapped = fn => pipe(path(['target', 'value']), fn);

const NewFile = ({schemaURL, endpointURL}) => {
  const [schemaUrl, setSchemaUrl] = useState(schemaURL);
  const [endpoint, setEndpoint] = useState(endpointURL);
  const [filename, setFileName] = useState('Untitled');
  const [description, setDescription] = useState('');

  return <Space direction="vertical">
    <Space>
      <span>Data schema URL:</span>
      <Input
        type="text"
        value={schemaUrl}
        onChange={unwrapped(setSchemaUrl)}
        placeholder="Data schema URL"
      />
    </Space>
    <Space>
      <span>Endpoint:</span>
      <Input
        type="text"
        value={endpoint}
        onChange={unwrapped(setEndpoint)}
        placeholder="Endpoint URL"
      />
    </Space>
    <Space>
      <span>Title:</span>
      <Input
        type="text"
        onChange={unwrapped(setFileName)}
        value={filename}
      />
    </Space>
    <Space>
      <span>Description:</span>
      <Input
        type="text"
        onChange={unwrapped(setDescription)}
        value={description}
        placeholder="File description"
      />
    </Space>
    <Button
      type="primary"
      onClick={() => {
        dispatchProps.updateFilename(filename);
        dispatchProps.updateDescription(description);
        loadGraphFromURL({dataSchemaURL: schemaUrl, endpointURL: endpoint});
        Modal.destroyAll();
      }}>Create</Button>
  </Space>
}

const mapStateToProps = appState => ({
  schemaURL: getDataSchemaURL(appState),
  endpointURL: getEndpoint(appState)
});

const dispatchProps = {
  updateFilename: dispatchSet(ModelState.filename),
  updateDescription: dispatchSet(ModelState.description)
};

// Connect component to enable use in modal content
const NewFileConnected = connect(mapStateToProps, null)(NewFile);
const NewFileContainer = props => <Provider store={store}><NewFileConnected {...props}/></Provider>;

export const openNewFileModal = () => Modal.info({icon: null, okButtonProps: {style: {display: 'none'}}, maskClosable: true, content: <NewFileContainer />});
