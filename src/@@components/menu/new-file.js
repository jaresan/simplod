/**
 * @file New file creation modal
 * @module @@components/menu/new-file
 */
import React, {useState} from 'react';
import { Button, Modal } from 'antd';
import { dispatchSet, store } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import { loadGraphFromURL } from '@@actions/load';
import { getDataSchemaURL, getEndpoint } from '@@selectors';
import { connect, Provider } from 'react-redux';
import { FilePropertyFields } from '@@components/menu/file-property-fields';
import { examples } from '@@constants/examples';
import { translated } from '@@localization';

const NewFile = ({schemaURL: stateSchemaUrl, endpointURL: stateEndpointUrl}) => {
  const [schemaUrl, setSchemaUrl] = useState(stateSchemaUrl);
  const [endpoint, setEndpoint] = useState(stateEndpointUrl);
  const [title, setTitle] = useState(translated('Untitled'));
  const [description, setDescription] = useState('');

  return <>
    <div>
      <FilePropertyFields
        onTitleChange={setTitle}
        onEndpointChange={setEndpoint}
        onSchemaChange={setSchemaUrl}
        onDescriptionChange={setDescription}
        schemaURL={schemaUrl}
        endpointURL={endpoint}
        title={title}
        description={description}
      />
    </div>
    <Button
      type="primary"
      style={{margin: '8px 0'}}
      onClick={() => {
        dispatchProps.updateFilename(title);
        dispatchProps.updateDescription(description);
        loadGraphFromURL({dataSchemaURL: schemaUrl, endpointURL: endpoint});
        Modal.destroyAll();
      }}>{translated('Create')}</Button>
    <div>
      <h3>{translated('From example')}</h3>
      <div>
        {
          examples.map(e => <Button style={{margin: 4}} key={e.title} onClick={() => {
            loadGraphFromURL(e);
            Modal.destroyAll();
          }}>{e.title}</Button>)
        }
      </div>
    </div>
  </>
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
