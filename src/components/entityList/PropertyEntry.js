import React from 'react';
import { Checkbox, Input, Space, List, Tooltip } from 'antd';
import { PrefixedText } from './PrefixedText';
import styled from '@emotion/styled';
import * as Controls from './Controls';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
  QuestionCircleFilled,
  TagOutlined, LinkOutlined
} from '@ant-design/icons';
import { getProperty, getSelectedEntities } from '../../selectors';
import Actions from 'src/actions/model';
import { connect } from 'react-redux';

const StyledInput = styled(Input)`	
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

const getIcon = dataProperty => {
  const TypeIcon = dataProperty ? TagOutlined : LinkOutlined;
  const title = dataProperty ? 'Data property' : 'Object property';

  return <Tooltip title={title}><TypeIcon/></Tooltip>;
}

const PropertyEntryComponent = ({selectedEntities, property, id, onSelect, onSetAsVariable, onSetName, onSetOptional}) => {
  const {predicate, asVariable, varName, optional, selected, dataProperty, target, bound} = property.toJS();

  let nameInput;
  if (bound) {
    nameInput = <Tooltip
      title="This variable can't be renamed because it is bound to an already selected entity"
    >
      <div>
        <StyledInput
          type="text"
          disabled
          value={selectedEntities[target].varName}
        />
      </div>
    </Tooltip>;
  } else {
    nameInput = <StyledInput
      type="text"
      disabled={!asVariable}
      defaultValue={varName}
      onBlur={e => onSetName(id, e.target.value)}
      onPressEnter={e => onSetName(id, e.target.value)}
    />;
  }

  return (
    <RowContainer>
      <Checkbox
        onChange={e => onSelect(id, e.target.checked)}
        name="Select"
        checked={selected}
      />
      <DataContainer>
        <Space>
          {getIcon(dataProperty)}
          <PrefixedText title={predicate}/>
          -->
          {nameInput}
          <Controls.Toggle
            flag={asVariable}
            tooltipTextOn="Hide from result set"
            tooltipTextOff="Show in result set"
            onClick={() => onSetAsVariable(id, !asVariable)}
            OnIcon={EyeOutlined}
            OffIcon={EyeInvisibleOutlined}
          />
          <Controls.Toggle
            flag={optional}
            onClick={() => onSetOptional(id, !optional)}
            tooltipTextOn="Mark as required"
            tooltipTextOff="Mark as optional"
            OnIcon={QuestionCircleFilled}
            OffIcon={QuestionCircleOutlined}
          />
        </Space>
        {/*{!selected && <DisableOverlay />}*/}
      </DataContainer>
    </RowContainer>
  );
}


const mapStateToProps = (appState, {id}) => ({
  property: getProperty(appState, id),
  selectedEntities: getSelectedEntities(appState)
});

const mapDispatchToProps = {
  onSelect: Actions.Creators.r_togglePropertySelected,
  onSetAsVariable: Actions.Creators.r_togglePropertyAsVariable,
  onSetName: Actions.Creators.r_savePropertyName,
  onSetOptional: Actions.Creators.r_togglePropertyOptional
};

export const PropertyEntry = connect(mapStateToProps, mapDispatchToProps)(PropertyEntryComponent);
