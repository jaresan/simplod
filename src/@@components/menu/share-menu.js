import React from 'react';
import { Typography } from 'antd';
import { getCurlFetchString, getDirectFetchUrl, getYasguiShareUrl } from '@@actions/interactions/yasgui';
import { getCurrentFileShareableUrl, getCurrentFileUrl } from '@@actions/solid/share';

const {Paragraph, Title, Text} = Typography;

const CopyableField = ({text, title}) => <Paragraph><Text copyable={{text}}>{title}</Text><Text ellipsis style={{maxWidth: '100%'}} code>{text}</Text></Paragraph>;

export const ShareMenu = () => {
  return <>
    <Title level={3}>Data fetching links</Title>
    <CopyableField title="YASGUI Query Tool" text={getYasguiShareUrl()} />
    <CopyableField title="Direct Web URL" text={getDirectFetchUrl()}/>
    <CopyableField title="cURL POST Request" text={getCurlFetchString()} />
    <Title level={3}>App links</Title>
    <CopyableField title="Direct application URL" text={getCurrentFileShareableUrl()} />
    <CopyableField title="Current file URL" text={getCurrentFileUrl()} />
  </>;
}
