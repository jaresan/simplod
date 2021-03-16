import React from 'react';
import { Checkbox, Space, List, Tooltip, Input } from 'antd';
import { PrefixedText } from './PrefixedText';
import styled from '@emotion/styled';
import { pickBy, pipe, propEq } from 'ramda';
import * as Controls from './Controls';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
  QuestionCircleFilled,
  TagOutlined, LinkOutlined
} from '@ant-design/icons';
import { getClasses, getPropertyById } from '@@selectors';
import { connect } from 'react-redux';
import * as ModelState from '@@app-state/model/state';
import {dispatch} from '@@app-state';
import { VarNameContainer } from '@@components/controls/var-name-container';
import { Graph } from '@@graph';
import { translated } from '@@localization';

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

  getNameInput = () => {
    const {classes, property, id} = this.props;
    const {onSetName} = dispatchProps;

    const {asVariable, target, dataProperty, targetType} = property;
    const {varName} = this.state;

    if (dataProperty) {
      return <VarNameContainer>
        <StyledInput
          type="text"
          disabled={!asVariable}
          value={varName}
          onChange={this.onNameChange}
          onBlur={() => onSetName(id, varName)}
          onPressEnter={() => onSetName(id, varName)}
        />
      </VarNameContainer>;
    }

    // If not a data property, it's bound to an already existing entity
    if (!property.dataProperty) {
      return <Tooltip
        title={translated('This variable can\'t be renamed because it is bound to an existing entity. To change its name, rename the target entity.')}
      >
        <div>
          <StyledInput
            type="text"
            disabled
            value={property.varName}
          />
        </div>
      </Tooltip>;
    }

    // return <VarNameContainer>
    //   <PropertyTargetSelect
    //     target={target}
    //     targetType={targetType}
    //     possibleTargets={pickBy(propEq('type', targetType), classes)}
    //     onChangeTarget={t => dispatchProps.onChangePropertyTarget(id, t)}
    //     onCreateNew={() => dispatchProps.onCreateNewPropertyTarget(id, target)}
    //   />
    // </VarNameContainer>;
  };

  render() {
    const {property, id} = this.props;
    const {onSelect, onSetAsVariable, onSetOptional} = dispatchProps;

    const {predicate, asVariable, optional, selected, dataProperty, targetType} = property;

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
            {this.getNameInput()}
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
            {targetType}
          </span>
          </Space>
        </DataContainer>
      </RowContainer>
    );
  }
}

const mapStateToProps = (appState, {id}) => ({
  property: getPropertyById(id, appState),
  classes: getClasses(appState)
});

// TODO: @dispatch rewrite
const dispatchProps = {
  onSelect: pipe(ModelState.togglePropertySelected, dispatch),
  onSetAsVariable: pipe(ModelState.togglePropertyAsVariable, dispatch),
  onSetName: pipe(ModelState.savePropertyName, dispatch),
  onSetOptional: pipe(ModelState.togglePropertyOptional, dispatch),
  onChangePropertyTarget: pipe(ModelState.changePropertyTarget, dispatch),
  onCreateNewPropertyTarget: (propertyId, target) => {
    Graph.onCreateNewEntity(target);
  },
};

export const PropertyEntry = connect(mapStateToProps, null)(PropertyEntryComponent);
