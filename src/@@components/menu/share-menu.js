import React from 'react';
import { Button, Modal, Typography } from 'antd';
import { getCurlFetchString, getDirectFetchUrl, getYasguiShareUrl } from '@@actions/interactions/yasgui';
import { getCurrentFileShareableUrl } from '@@actions/solid/share';
import { openSaveDialogModal } from '@@components/controls/file-dialog';
import { getModelFileLocation } from '@@selectors';
import { connect, Provider } from 'react-redux';
import { store } from '@@app-state';

const {Paragraph, Title, Text} = Typography;

const CopyableField = ({text, title}) => <Paragraph><Text copyable={{text}}>{title}</Text><Text ellipsis style={{maxWidth: '100%'}} code>{text}</Text></Paragraph>;

const getAppLinks = (modelFileLocation) => <>
  <CopyableField title="Direct application URL" text={getCurrentFileShareableUrl()} />
  <CopyableField title="Current file URL" text={modelFileLocation} />
</>;

const getFileModalButton = () => <>
  <Text>To be able to share this file via this application, please save it first.</Text>
  <br />
  <Button type="primary" onClick={openSaveDialogModal}>Save file</Button>
</>

const ShareMenuComponent = ({modelFileLocation}) =>
  <>
    <Title level={3}>Data fetching links</Title>
    <CopyableField title="YASGUI Query Tool" text={getYasguiShareUrl()} />
    <CopyableField title="Direct Web URL" text={getDirectFetchUrl()}/>
    <CopyableField title="cURL POST Request" text={getCurlFetchString()} />
    <Title level={3}>App links</Title>
    {
      modelFileLocation ? getAppLinks(modelFileLocation) : getFileModalButton()
    }
  </>;

const mapStateToProps = appState => ({
  modelFileLocation: getModelFileLocation(appState)
});

// Connect component to enable use in modal content
const ConnectedComponent = connect(mapStateToProps, null)(ShareMenuComponent);

const content = <Provider store={store}><ConnectedComponent/></Provider>;

export const openShareModal = () => Modal.info({maskClosable: true, icon: null, content});
