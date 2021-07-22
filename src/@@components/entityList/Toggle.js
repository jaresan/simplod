/**
 * @file Helper toggle component for displaying tooltips and icons based on the given flag
 * @module @@components/entityList/Toggle
 */
import React from 'react';
import styled from '@emotion/styled';
import {Tooltip} from 'antd';

const IconContainer = styled.div`
  font-size: 18px;
  width: 18px;
  height: 18px;
  display: flex;
`

export const Toggle = ({flag, OnIcon, OffIcon, tooltipTextOn, tooltipTextOff, ...props}) => {
  const Icon = flag ? OnIcon : OffIcon;
  const tooltipText = flag ? tooltipTextOn : tooltipTextOff;
  const MaybeTooltip = tooltipText ? props => <Tooltip title={tooltipText} {...props} /> : React.Fragment;

  return <MaybeTooltip>
    <IconContainer {...props}>
      <Icon/>
    </IconContainer>
  </MaybeTooltip>
}


