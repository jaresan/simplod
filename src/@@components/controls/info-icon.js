import React from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

export const InfoIcon = ({title, iconProps}) => <Tooltip title={title}>
  <InfoCircleOutlined {...iconProps}/>
</Tooltip>;
