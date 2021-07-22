/**
 * @file Represents a property entry in the list view
 * @module @@components/entityList/PropertyEntry
 */
import React from 'react';
import { Checkbox, Space, List, Tooltip, Input } from 'antd';
import { PrefixedText } from './PrefixedText';
import styled from '@emotion/styled';
import { pipe, path } from 'ramda';
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
  const title = dataProperty ? translated('Data property') : translated('Object property');

  return <Tooltip title={title}><TypeIcon/></Tooltip>;
}

class PropertyEntryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      varName: path(['property', 'varName'], props)
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const varName = path(['property', 'varName'], this.props);

    if (varName !== prevState.varName && (prevState.varName === this.state.varName)) {
      this.setState({varName});
    }
  }

  onNameChange = e => this.setState({varName: e.target.value});

  getNameInput = () => {
    const {property, id} = this.props;
    const {onSetName} = dispatchProps;

    const {asVariable, dataProperty} = property;
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
          <Space style={{width: 'max-content'}}>
            {getIcon(dataProperty)}
            <PrefixedText title={predicate}/>
            -->
            {this.getNameInput()}
            <Controls.Toggle
              flag={asVariable}
              tooltipTextOn={translated('Hide from result set')}
              tooltipTextOff={translated('Show in result set')}
              onClick={() => onSetAsVariable(id, !asVariable)}
              OnIcon={EyeOutlined}
              OffIcon={EyeInvisibleOutlined}
            />
            <Controls.Toggle
              flag={optional}
              onClick={() => onSetOptional(id, !optional)}
              tooltipTextOn={translated('Mark as required')}
              tooltipTextOff={translated('Mark as optional')}
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

const dispatchProps = {
  onSelect: pipe(ModelState.togglePropertySelected, dispatch),
  onSetAsVariable: pipe(ModelState.togglePropertyAsVariable, dispatch),
  onSetName: pipe(ModelState.savePropertyName, dispatch),
  onSetOptional: pipe(ModelState.togglePropertyOptional, dispatch)
};

export const PropertyEntry = connect(mapStateToProps, null)(PropertyEntryComponent);
