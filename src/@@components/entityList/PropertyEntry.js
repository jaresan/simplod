import React from 'react';
import { Checkbox, Input, Space, List, Tooltip } from 'antd';
import { PrefixedText } from './PrefixedText';
import styled from '@emotion/styled';
import {pipe} from 'ramda';
import * as Controls from './Controls';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
  QuestionCircleFilled,
  TagOutlined, LinkOutlined
} from '@ant-design/icons';
import {getPropertyById, getSelectedClasses} from '@@selectors';
import { connect } from 'react-redux';
import * as ModelState from '@@app-state/model/state';
import {dispatch} from '@@app-state';

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

const getIcon = dataProperty => {
  const TypeIcon = dataProperty ? TagOutlined : LinkOutlined;
  const title = dataProperty ? 'Data property' : 'Object property';

  return <Tooltip title={title}><TypeIcon/></Tooltip>;
}

class PropertyEntryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // FIXME: @reference
      varName: props.property.varName
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // FIXME: @reference
    const varName = this.props.property.varName;

    if (varName !== prevState.varName && (prevState.varName === this.state.varName)) {
      this.setState({varName});
    }
  }

  onNameChange = e => this.setState({varName: e.target.value});

  render() {
    const {selectedEntities, property, id} = this.props;
    const {onSelect, onSetAsVariable, onSetName, onSetOptional} = dispatchProps;

    const {predicate, asVariable, optional, selected, dataProperty, target, bound} = property;
    const {varName} = this.state;

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
        value={varName}
        onChange={this.onNameChange}
        onBlur={() => onSetName(id, varName)}
        onPressEnter={() => onSetName(id, varName)}
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
            <span>
            {target}
          </span>
          </Space>
        </DataContainer>
      </RowContainer>
    );
  }
}

const mapStateToProps = (appState, {id}) => ({
  property: getPropertyById(id, appState),
  selectedEntities: getSelectedClasses(appState)
});

// TODO: @dispatch rewrite
const dispatchProps = {
  onSelect: pipe(ModelState.togglePropertySelected, dispatch),
  onSetAsVariable: pipe(ModelState.togglePropertyAsVariable, dispatch),
  onSetName: pipe(ModelState.savePropertyName, dispatch),
  onSetOptional: pipe(ModelState.togglePropertyOptional, dispatch)
};

export const PropertyEntry = connect(mapStateToProps, null)(PropertyEntryComponent);
