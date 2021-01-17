import React from 'react';
import { Button, Modal, Typography } from 'antd';
import { getCurlFetchString, getDirectFetchUrl, getYasguiShareUrl } from '@@actions/interactions/yasgui';
import { getCurrentFileShareableUrl, getCurrentFileUrl } from '@@actions/solid/share';
import { openFileDialogModal } from '@@components/controls/file-dialog';
import { getCurrentFileLocation} from '@@selectors';
import { connect, Provider } from 'react-redux';
import { store } from '@@app-state';

const {Paragraph, Title, Text} = Typography;

const CopyableField = ({text, title}) => <Paragraph><Text copyable={{text}}>{title}</Text><Text ellipsis style={{maxWidth: '100%'}} code>{text}</Text></Paragraph>;

const getAppLinks = () => <>
  <CopyableField title="Direct application URL" text={getCurrentFileShareableUrl()} />
  <CopyableField title="Current file URL" text={getCurrentFileUrl()} />
</>;

const getFileModalButton = () => <>
  <Text>To be able to share this file, please save it remotely first.</Text>
  <br />
  <Button type="primary" onClick={openFileDialogModal}>Files</Button>
</>

const ShareMenuComponent = () =>
  <>
    <Title level={3}>Data fetching links</Title>
    <CopyableField title="YASGUI Query Tool" text={getYasguiShareUrl()} />
    <CopyableField title="Direct Web URL" text={getDirectFetchUrl()}/>
    <CopyableField title="cURL POST Request" text={getCurlFetchString()} />
    <Title level={3}>App links</Title>
    {
      getCurrentFileUrl() ? getAppLinks() : getFileModalButton()
    }
  </>;

const mapStateToProps = appState => ({
  files: getCurrentFileLocation(appState)
});

// Connect component to enable use in modal content
const ConnectedComponent = connect(mapStateToProps, null)(ShareMenuComponent);

const ShareMenu = props => <Provider store={store}><ConnectedComponent {...props}/></Provider>;

export const openShareModal = () => Modal.info({maskClosable: true, icon: null, content: <ShareMenu/>});
