import React from 'react';
import { Checkbox, Input, Space, List, Row, Col } from 'antd';
import { PrefixedText } from './PrefixedText';
import styled from '@emotion/styled';
import * as Controls from './Controls';
import {EyeInvisibleOutlined, EyeOutlined, QuestionCircleOutlined, QuestionCircleFilled} from '@ant-design/icons';

const StyledInput = styled(Input)`	
	background: ${({disabled}) => disabled ? 'lightgrey' : 'default'};
	width: 128px;	
`;

const RowContainer = styled(List.Item)`
  display: flex;
`;

const DataContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  margin-left: 8px;
`;

const DisableOverlay = styled.div`
  background: lightgrey;
  opacity: 0.2;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const PropertyEntry = ({property: {predicate, asVariable, name, optional, selected}, id, onSelect, onSetAsVariable, onSetName, onSetOptional}) => (
  <RowContainer>
    <Checkbox
      onChange={e => onSelect(id, e.target.checked)}
      name="Select"
      checked={selected}
    />
    <DataContainer>
      <Space>
        <PrefixedText title={predicate}/>
        -->
        <StyledInput
          type="text"
          disabled={!asVariable}
          defaultValue={name}
          onChange={e => onSetName(id, e.target.value)}
        />
        <Controls.Toggle flag={asVariable} onClick={() => onSetAsVariable(id, !asVariable)} OnIcon={EyeOutlined} OffIcon={EyeInvisibleOutlined} />
        <Controls.Toggle flag={optional} onClick={() => onSetOptional(id, !optional)} OnIcon={QuestionCircleFilled} OffIcon={QuestionCircleOutlined} />
      </Space>
      {/*{!selected && <DisableOverlay />}*/}
    </DataContainer>
  </RowContainer>
);
