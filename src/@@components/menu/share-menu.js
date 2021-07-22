/**
 * @file Project sharing modal menu
 * @module @@components/menu/share-menu
 */
import React, { useState } from 'react';
import { Button, Modal, Select, Space, Typography } from 'antd';
import { getCsvFetchUrl, getCurlFetchString, getDirectFetchUrl, getYasguiShareUrl } from '@@actions/yasgui';
import { getCurrentFileShareableUrl } from '@@actions/solid/share';
import { openSaveDialogModal } from '@@components/controls/file-dialog';
import { getModelFileLocation } from '@@selectors';
import { connect, Provider } from 'react-redux';
import { store } from '@@app-state';
import { changePermissions } from '@@actions/solid/files';
import { PlayCircleOutlined } from '@ant-design/icons';
import { translated } from '@@localization';

const {Paragraph, Title, Text} = Typography;
const {Option} = Select;

const CopyableField = ({text, title, openable}) => <Paragraph>
  <Text copyable={{text}}>{title}</Text>{openable && <PlayCircleOutlined onClick={() => window.open(text)} style={{color: '#1890ff'}} />}
  <br/>
  <Text ellipsis style={{maxWidth: '100%', textOverflow: 'unset', overflow: 'auto'}} code>{text}</Text>
</Paragraph>;

const getAppLinks = modelFileLocation => <>
  <CopyableField title={translated('Direct application URL')} text={getCurrentFileShareableUrl()} />
  <CopyableField title={translated('Current file URL')} text={modelFileLocation} />
</>;

const getFileModalButton = () => <>
  <Text>{translated('To be able to share this file via this application, please save it first.')}</Text>
  <br />
  <Button type="primary" onClick={openSaveDialogModal}>{translated('Save file')}</Button>
</>

const AppShareMenu = (modelFileLocation) => {
  const [permissions, setPermissions] = useState('private');

  return <>
    {getAppLinks(modelFileLocation)}
    <Space direction="horizontal">
      <Typography.Text>Permissions:</Typography.Text>
      <Select value={permissions} onChange={permissions => {
        setPermissions(permissions);
        changePermissions({uri: modelFileLocation, permissions})
      }} defaultValue="private" style={{ width: 120 }}>
        <Option value="private">{translated('Private')}</Option>
        <Option value="public/read">{translated('Public/Read')}</Option>
        <Option value="public/write">{translated('Public/Write')}</Option>
      </Select>
    </Space>
  </>;
};

const ShareMenuComponent = ({modelFileLocation}) =>
  <>
    <Title level={3}>{translated('Data fetching links')}</Title>
    <CopyableField title="YASGUI Query Tool" text={getYasguiShareUrl()} openable />
    <CopyableField title="CSV URL" text={getCsvFetchUrl()} openable/>
    <CopyableField title="Direct Web URL" text={getDirectFetchUrl()} openable/>
    <CopyableField title="cURL POST Request" text={getCurlFetchString()} />
    <Title level={3}>{translated('App links')}</Title>
    {
      modelFileLocation ? AppShareMenu(modelFileLocation) : getFileModalButton()
    }
  </>;

const mapStateToProps = appState => ({
  modelFileLocation: getModelFileLocation(appState)
});

// Connect component to enable use in modal content
const ConnectedComponent = connect(mapStateToProps, null)(ShareMenuComponent);

const content = <Provider store={store}><ConnectedComponent/></Provider>;

export const openShareModal = () => Modal.info({maskClosable: true, icon: null, content});
