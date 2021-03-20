import React from 'react';
import { Select } from 'antd';
import { cond, isNil, T } from 'ramda';
import {css} from '@emotion/css';

const dropDownCss = css`
  .ant-select-selector {
    padding-left: 16px !important;
  }
`;

export const PropertyTargetSelect = ({target, targetType, possibleTargets, onChangeTarget, onCreateNew}) =>
  <Select className={dropDownCss} onChange={cond([
    [isNil, onCreateNew],
    [T, onChangeTarget]
  ])} dropdownMatchSelectWidth={false} value={target}>
    <Select.OptGroup label={targetType}>
      {
        Object.entries(possibleTargets).map(([id, {varName}]) => <Select.Option key={id} value={id}>{varName}</Select.Option>)
      }
      <Select.Option value={null}>New object</Select.Option>
    </Select.OptGroup>
  </Select>;

