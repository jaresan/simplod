/**
 * @file Project properties menu
 * @module @@components/menu/properties
 */
import React from 'react';
import { Modal, Select, Space } from 'antd';
import { dispatch, dispatchSet, store } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import {
  getCustomPrefixes,
  getDataSchemaURL,
  getDescription,
  getEndpoint,
  getFilename,
  getPrefixes, getPropertyLanguages
} from '@@selectors';
import { connect, Provider } from 'react-redux';
import { FilePropertyFields } from '@@components/menu/file-property-fields';
import { InfoIcon } from '@@components/controls/info-icon';
import {translated} from '@@localization';
import { CustomPrefixRow } from '@@components/menu/custom-prefix-row';
import { renamePrefix, deletePrefix } from '@@actions/custom-prefix';
import { pipe, prop, sortBy } from 'ramda';
import { loadGraphFromURL } from '@@actions/load';
import { withInfoIcon } from '@@components/controls/with-info-icon';
import { labelLanguages } from '@@constants/languages';

const {Option} = Select;

const languageOptions = sortBy(prop('code'), labelLanguages).map(({code}) => <Option key={code} value={code}>{code}</Option>);

const Properties = ({description, dataSchemaURL, endpointURL, title, prefixes, customPrefixes, propertyLanguages}) =>
  <div>
    <FilePropertyFields
      onSchemaReload={() => loadGraphFromURL({dataSchemaURL, endpointURL})}
      onTitleChange={dispatchProps.updateFilename}
      onEndpointChange={dispatchProps.updateEndpoint}
      onSchemaChange={dispatchProps.updateDataSchemaURL}
      onDescriptionChange={dispatchProps.updateDescription}
      schemaURL={dataSchemaURL}
      endpointURL={endpointURL}
      title={title}
      description={description}
    />
    <Space direction="vertical" style={{ width: '100%', paddingTop: 8 }}>
      <span>{withInfoIcon([translated('Property languages:'), translated('Languages that should appear in the resulting query. Will return every available language if empty.')])}</span>
      <Select value={propertyLanguages} placeholder={translated('All languages')} mode="multiple" style={{ width: '100%' }} onChange={dispatchProps.updatePropertyLanguages} tokenSeparators={[',']}>
        {languageOptions}
      </Select>
    </Space>
    <Space direction="vertical" style={{marginTop: 8}}>
      <h4>{translated('Rename prefixes')} <InfoIcon title={translated('Allows you to override provided prefixes with your own name')} /></h4>
      {
        Object.values(customPrefixes).map(p => <CustomPrefixRow onDeletePrefix={dispatchProps.deletePrefix} key={p} value={p} onChangeName={dispatchProps.renamePrefix} prefixes={prefixes} customPrefixes={customPrefixes} />)
      }
      <CustomPrefixRow onDeletePrefix={dispatchProps.deletePrefix} onChangeName={dispatchProps.renamePrefix} value={null} prefixes={prefixes} customPrefixes={customPrefixes} />
    </Space>
  </div>;

const mapStateToProps = appState => ({
  description: getDescription(appState),
  endpointURL: getEndpoint(appState),
  dataSchemaURL: getDataSchemaURL(appState),
  title: getFilename(appState),
  prefixes: getPrefixes(appState),
  customPrefixes: getCustomPrefixes(appState),
  propertyLanguages: getPropertyLanguages(appState)
});

const dispatchProps = {
  updateFilename: dispatchSet(ModelState.filename),
  updateDescription: dispatchSet(ModelState.description),
  updateEndpoint: dispatchSet(ModelState.endpoint),
  updateDataSchemaURL: dispatchSet(ModelState.dataSchemaURL),
  renamePrefix: pipe(renamePrefix, dispatch),
  deletePrefix: pipe(deletePrefix, dispatch),
  updatePropertyLanguages: dispatchSet(ModelState.propertyLanguages)
};

// Connect component to enable use in modal content
const PropertiesConnected = connect(mapStateToProps, null)(Properties);
const PropertiesContainer = props => <Provider store={store}><PropertiesConnected {...props}/></Provider>;

export const openPropertiesModal = () => Modal.info({icon: null, okText: 'Ok', maskClosable: true, content: <PropertiesContainer />});
