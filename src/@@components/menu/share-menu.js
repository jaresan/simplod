import React, { useState } from 'react';
import { Button, Modal, Select, Space, Typography } from 'antd';
import { getCurlFetchString, getDirectFetchUrl, getYasguiShareUrl } from '@@actions/interactions/yasgui';
import { getCurrentFileShareableUrl } from '@@actions/solid/share';
import { openSaveDialogModal } from '@@components/controls/file-dialog';
import { getModelFileLocation } from '@@selectors';
import { connect, Provider } from 'react-redux';
import { store } from '@@app-state';
import { changePermissions } from '@@actions/solid/files';

const {Paragraph, Title, Text} = Typography;
const {Option} = Select;

const CopyableField = ({text, title}) => <Paragraph><Text copyable={{text}}>{title}</Text><Text ellipsis style={{maxWidth: '100%'}} code>{text}</Text></Paragraph>;

const getAppLinks = modelFileLocation => <>
  <CopyableField title="Direct application URL" text={getCurrentFileShareableUrl()} />
  <CopyableField title="Current file URL" text={modelFileLocation} />
</>;

const getFileModalButton = () => <>
  <Text>To be able to share this file via this application, please save it first.</Text>
  <br />
  <Button type="primary" onClick={openSaveDialogModal}>Save file</Button>
</>

const AppShareMenu = (modelFileLocation) => {
  const [permissions, setPermissions] = useState('private');

  return <>
    {getAppLinks(modelFileLocation)}
    <Space direction="horizontal">
      <Typography.Text>Permissions:</Typography.Text>
      <Select value={permissions} onChange={setPermissions} defaultValue="private" style={{ width: 120 }}>
        <Option value="private">Private</Option>
        <Option value="public/read">Public/Read</Option>
        <Option value="public/write">Public/Write</Option>
      </Select>
      <Button type="primary" onClick={() => changePermissions({uri: modelFileLocation, permissions})}>Set permissions</Button>
    </Space>
  </>;
};

const ShareMenuComponent = ({modelFileLocation}) =>
  <>
    <Title level={3}>Data fetching links</Title>
    <CopyableField title="YASGUI Query Tool" text={getYasguiShareUrl()} />
    <CopyableField title="Direct Web URL" text={getDirectFetchUrl()}/>
    <CopyableField title="cURL POST Request" text={getCurlFetchString()} />
    <Title level={3}>App links</Title>
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
