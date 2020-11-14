import React from 'react';
import styled from '@emotion/styled';
import {Tooltip} from 'antd';

const IconContainer = styled.div`
  font-size: 18px;
  width: 18px;
  height: 18px;
  display: flex;
`

export const Toggle = ({flag, OnIcon, OffIcon, tooltip = '', ...props}) => {
  const Icon = flag ? OnIcon : OffIcon;
  const MaybeTooltip = tooltip ? props => <Tooltip title={tooltip} {...props} /> : React.Fragment;

  return <MaybeTooltip>
    <IconContainer {...props}>
      <Icon/>
    </IconContainer>
  </MaybeTooltip>
}


