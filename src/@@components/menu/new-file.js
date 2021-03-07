import React, {useState} from 'react';
import { Button, Space, Modal } from 'antd';
import { dispatchSet, store } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import { loadGraphFromURL } from '@@actions/model/load-graph';
import { getDataSchemaURL, getEndpoint } from '@@selectors';
import { connect, Provider } from 'react-redux';
import { FilePropertyFields } from '@@components/menu/file-property-fields';

const NewFile = ({schemaURL, endpointURL}) => {
  const [schemaUrl, setSchemaUrl] = useState(schemaURL);
  const [endpoint, setEndpoint] = useState(endpointURL);
  const [title, setTitle] = useState('Untitled');
  const [description, setDescription] = useState('');

  return <div>
    <Space direction="vertical" style={{width: '100%'}}>
      <FilePropertyFields
        onTitleChange={setTitle}
        onEndpointChange={setEndpoint}
        onSchemaChange={setSchemaUrl}
        onDescriptionChange={setDescription}
        schemaURL={schemaURL}
        endpointURL={endpointURL}
        title={title}
        description={description}
      />
      <Button
        type="primary"
        onClick={() => {
          dispatchProps.updateFilename(title);
          dispatchProps.updateDescription(description);
          loadGraphFromURL({dataSchemaURL: schemaUrl, endpointURL: endpoint});
          Modal.destroyAll();
        }}>Create</Button>
    </Space>
  </div>
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
