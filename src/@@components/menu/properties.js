import React, {useState} from 'react';
import { Modal, Space } from 'antd';
import { dispatch, dispatchSet, store } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import {
  getCustomPrefixes,
  getDataSchemaURL,
  getDescription,
  getEndpoint,
  getFilename,
  getPrefixes
} from '@@selectors';
import { connect, Provider } from 'react-redux';
import { FilePropertyFields } from '@@components/menu/file-property-fields';
import { InfoIcon } from '@@components/controls/info-icon';
import {translated} from '@@localization';
import { CustomPrefixRow } from '@@components/menu/custom-prefix-row';
import { renamePrefix, deletePrefix } from '@@actions/model/rename-prefix';
import { pipe } from 'ramda';

const Properties = ({description, dataSchemaURL, endpointURL, title, prefixes, customPrefixes}) => {
  const [schemaURL, setSchemaURL] = useState(dataSchemaURL);

  return <div>
    <FilePropertyFields
      onTitleChange={dispatchProps.updateFilename}
      onEndpointChange={dispatchProps.updateEndpoint}
      onSchemaChange={setSchemaURL}
      onDescriptionChange={dispatchProps.updateDescription}
      schemaURL={schemaURL}
      endpointURL={endpointURL}
      title={title}
      description={description}
    />
    <Space direction="vertical" style={{marginTop: 8}}>
      <h4>{translated('Custom prefixes')} <InfoIcon title={translated('Allows you to override provided prefixes with your own')} /></h4>
      {
        Object.values(customPrefixes).map(p => <CustomPrefixRow onDeletePrefix={dispatchProps.deletePrefix} key={p} value={p} onChangeName={dispatchProps.renamePrefix} prefixes={prefixes} customPrefixes={customPrefixes} />)
      }
      <CustomPrefixRow onDeletePrefix={dispatchProps.deletePrefix} onChangeName={dispatchProps.renamePrefix} value={null} prefixes={prefixes} customPrefixes={customPrefixes} />
    </Space>
  </div>;
}

  // FIXME: Add filename edit
const mapStateToProps = appState => ({
  description: getDescription(appState),
  endpointURL: getEndpoint(appState),
  dataSchemaURL: getDataSchemaURL(appState),
  title: getFilename(appState),
  prefixes: getPrefixes(appState),
  customPrefixes: getCustomPrefixes(appState)
});

const dispatchProps = {
  updateFilename: dispatchSet(ModelState.filename),
  updateDescription: dispatchSet(ModelState.description),
  updateEndpoint: dispatchSet(ModelState.endpoint),
  renamePrefix: pipe(renamePrefix, dispatch),
  deletePrefix: pipe(deletePrefix, dispatch)
};

// Connect component to enable use in modal content
const PropertiesConnected = connect(mapStateToProps, null)(Properties);
const PropertiesContainer = props => <Provider store={store}><PropertiesConnected {...props}/></Provider>;

export const openPropertiesModal = () => Modal.info({icon: null, okText: 'Ok', maskClosable: true, content: <PropertiesContainer />});
