import { Space, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import React from 'react';

export const withInfoIcon = arr => <Space>
  {arr[0]}
  <Tooltip title={arr[1]}>
    <InfoCircleOutlined />
  </Tooltip>
</Space>;
