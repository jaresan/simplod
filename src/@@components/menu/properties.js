import React from 'react';
import { Input, Space, Modal } from 'antd';
import {pipe, path} from 'ramda';
import { dispatchSet, store } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import { getDescription } from '@@selectors';
import { connect, Provider } from 'react-redux';

const { TextArea } = Input;

const unwrapped = fn => pipe(path(['target', 'value']), fn);

const Properties = ({description}) => <Space>
  <span>Description:</span>
  <TextArea
    type="text"
    onChange={unwrapped(dispatchProps.updateDescription)}
    value={description}
    placeholder="File description"
  />
</Space>;

const mapStateToProps = appState => ({
  description: getDescription(appState)
});

const dispatchProps = {
  updateFilename: dispatchSet(ModelState.filename),
  updateDescription: dispatchSet(ModelState.description)
};

// Connect component to enable use in modal content
const PropertiesConnected = connect(mapStateToProps, null)(Properties);
const PropertiesContainer = props => <Provider store={store}><PropertiesConnected {...props}/></Provider>;

export const openPropertiesModal = () => Modal.info({icon: null, okText: 'Ok', maskClosable: true, content: <PropertiesContainer />});
