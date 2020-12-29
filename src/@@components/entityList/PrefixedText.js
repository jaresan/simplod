import {Tooltip} from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { getPrefixes } from '@@selectors';

const PrefixSpan = styled.span`
  opacity: 0.8;
  color: lightgrey;
`;

const PrefixedTextComponent = ({title, prefixes}) => {
  const [prefix, suffix] = title.split(':');
  const fullTitle = `${prefixes[prefix]}${suffix}`;

  return (
    <span>
      <Tooltip
        title={fullTitle}
      >
        <PrefixSpan>{prefix}:</PrefixSpan>
      </Tooltip>
      <span>{suffix}</span>
    </span>
  );
};

const Unwrapped = ({title, prefixes}) => {
  const [prefix, suffix] = title.split(':');
  const fullTitle = `${prefixes[prefix]}${suffix}`;

  return <span>{fullTitle}</span>;
}

const mapStateToProps = appState => ({prefixes: getPrefixes(appState)})

export const PrefixedText = connect(mapStateToProps, null)(PrefixedTextComponent);
PrefixedText.Unwrapped = connect(mapStateToProps, null)(Unwrapped);
