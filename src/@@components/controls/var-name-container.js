/**
 * @file Helper container to display tooltip over '?' for SPARQL variables
 * @module @@components/controls/var-name-container
 */
import React from 'react';
import { Tooltip } from 'antd';
import styled from '@emotion/styled';
import { translated } from '@@localization';


const Container = styled.div`
  position: relative;
`;
const QuestionMarkContainer = styled.div`
  position: absolute;
  left: 1px;
  z-index: 1;
  width: 14px;
  height: calc(100% - 2px);
  font-size: 12px;
  background: lightgrey;
  text-align: center;
  padding: 3px 0;
  border: solid 1px transparent;
  top: 1px;
`;

export const VarNameContainer = ({children: Child}) => {
  return <Container>
    <Tooltip title={translated('Name of the variable in the resulting SPARQL query')}>
      <QuestionMarkContainer>?</QuestionMarkContainer>
    </Tooltip>
    {React.cloneElement(Child, {style: {paddingLeft: 16, ...Child.props.style}})}
  </Container>
}
