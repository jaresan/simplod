import React, {useState} from 'react';
import { Modal } from 'antd';
import { dispatchSet, store } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import {
  getDataSchemaURL,
  getDescription,
  getEndpoint, getFilename
} from '@@selectors';
import { connect, Provider } from 'react-redux';
import { FilePropertyFields } from '@@components/menu/file-property-fields';

const Properties = ({description, dataSchemaURL, endpointURL, title}) => {
  const [schemaURL, setSchemaURL] = useState(dataSchemaURL);
  return <FilePropertyFields
    onTitleChange={dispatchProps.updateFilename}
    onEndpointChange={dispatchProps.updateEndpoint}
    onSchemaChange={setSchemaURL}
    onDescriptionChange={dispatchProps.updateDescription}
    schemaURL={schemaURL}
    endpointURL={endpointURL}
    title={title}
    description={description}
  />;
}

  // FIXME: Add filename edit
const mapStateToProps = appState => ({
  description: getDescription(appState),
  endpointURL: getEndpoint(appState),
  dataSchemaURL: getDataSchemaURL(appState),
  title: getFilename(appState)
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
