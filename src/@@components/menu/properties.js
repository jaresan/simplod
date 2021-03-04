import React, {useState} from 'react';
import { Input, Space, Modal, Button } from 'antd';
import {pipe, path} from 'ramda';
import { dispatchSet, store } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import {
  getDataSchemaURL,
  getDescription,
  getEndpoint, getFilename
} from '@@selectors';
import { connect, Provider } from 'react-redux';
import { loadGraphFromURL } from '@@actions/model/load-graph';

const { TextArea } = Input;

const unwrapped = fn => pipe(path(['target', 'value']), fn);

const Properties = ({description, dataSchemaURL, endpointURL, filename}) => {
  const [schemaURL, setSchemaURL] = useState(dataSchemaURL);
  return <div>
    <Space direction="vertical" style={{width: '100%'}}>
      <span>Data schema URL:</span>
      <Input type="text" onChange={unwrapped(setSchemaURL)} value={schemaURL} placeholder="Data schema URL"/>
      <Button onClick={() => loadGraphFromURL({dataSchemaURL: schemaURL, endpointURL})}>
        Reload schema
      </Button>
      <span>Endpoint:</span>
      <Input
        type="text"
        value={endpointURL}
        placeholder="Endpoint URL"
        onChange={unwrapped(dispatchProps)}
      />
      <span>Project title:</span>
      <Input
        type="text"
        onChange={unwrapped(dispatchProps.updateFilename)}
        value={filename}
        placeholder="Project title"
      />
      <span>Description:</span>
      <TextArea
        type="text"
        onChange={unwrapped(dispatchProps.updateDescription)}
        value={description}
        placeholder="File description"
      />
    </Space>
  </div>;
}

  // FIXME: Add filename edit
const mapStateToProps = appState => ({
  description: getDescription(appState),
  endpointURL: getEndpoint(appState),
  dataSchemaURL: getDataSchemaURL(appState),
  filename: getFilename(appState)
});

const dispatchProps = {
  updateFilename: dispatchSet(ModelState.filename),
  updateDescription: dispatchSet(ModelState.description),
  updateEndpoint: dispatchSet(ModelState.endpoint)
};

// Connect component to enable use in modal content
const PropertiesConnected = connect(mapStateToProps, null)(Properties);
const PropertiesContainer = props => <Provider store={store}><PropertiesConnected {...props}/></Provider>;

export const openPropertiesModal = () => Modal.info({icon: null, okText: 'Ok', maskClosable: true, content: <PropertiesContainer />});
