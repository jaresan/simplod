import React from 'react';
import { path, pipe } from 'ramda';
import { List, Card, Space, Checkbox, Tooltip, Input } from 'antd';
import {connect} from 'react-redux';
import {PropertyEntry} from './PropertyEntry';
import {PrefixedText} from './PrefixedText';
import {
  RightOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  CopyOutlined
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { getClassById, getLabelLanguage, getShowHumanReadable } from '@@selectors';
import * as Controls from './Controls';
import * as ModelState from '@@app-state/model/state';
import { dispatch } from '@@app-state';
import { VarNameContainer } from '@@components/controls/var-name-container';
import { Graph } from '@@graph';

const ExpandIconContainer = styled.div`
  display: inline-block;
  width: 100%;
`;

const Container = styled(Card)`
  width: 100%;
  cursor: pointer;
`;

const ControlsContainer = styled.div`
  display: flex;
`;

const renderPropertyEntry = id => (
  <PropertyEntry
    id={id}
  />
);

class EntityEntryComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      varName: path(['entity', 'varName'], props)
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const varName = path(['entity', 'varName'], this.props);

    if (varName !== prevState.varName && (prevState.varName === this.state.varName)) {
      this.setState({varName});
    }
  }

  onNameChange = e => this.setState({varName: e.target.value});

  toggleExpanded = () => this.setState(s => ({expanded: !s.expanded}));

  getToggleIcon = () => this.state.expanded ? <DownOutlined /> : <RightOutlined />

  getControls = () => {
    const {id, entity} = this.props;
    const {toggleSelected, toggleHidden, updateName, deleteClass, onCopyEntity} = dispatchProps;
    const {selected, hidden} = entity;
    const {varName} = this.state;
    return (
      <ControlsContainer>
        <Space>
          <VarNameContainer>
            <Input
              type="text"
              value={varName}
              onChange={this.onNameChange}
              onBlur={() => updateName(id, varName)}
              onPressEnter={() => updateName(id, varName)}
            />
          </VarNameContainer>
          <Tooltip title={`${selected ? 'Hide' : 'Show'} entity in the result set`}>
            <Checkbox
              onChange={e => toggleSelected(id, e.target.checked)}
              name="Select"
              checked={selected}
            />
          </Tooltip>
          <Controls.Toggle
            flag={true}
            tooltipTextOn="Copy entity"
            onClick={() => onCopyEntity(id)}
            OnIcon={CopyOutlined}
          />
          <Controls.Toggle
            flag={true}
            tooltipTextOn="Delete entity"
            onClick={() => deleteClass(id)}
            OnIcon={DeleteOutlined}
          />
          <Controls.Toggle
            flag={!hidden}
            tooltipTextOn="Hide entity in the graph"
            tooltipTextOff="Show entity in the graph"
            onClick={() => toggleHidden(id, !hidden)}
            OnIcon={EyeOutlined}
            OffIcon={EyeInvisibleOutlined}
          />
        </Space>
      </ControlsContainer>
    );
  }

  getInfoIcon = description => description && <Tooltip title={description}>
    <InfoCircleOutlined />
  </Tooltip>;

  getTitle = label => label ?
    <Tooltip
      title={<PrefixedText.Unwrapped title={this.props.entity.type}/>}
    >{label}</Tooltip> : <PrefixedText title={this.props.entity.type}/>;

  render() {
    const {entity, showHumanReadable, labelLanguage} = this.props;
    const {propertyIds, info} = entity;

    let toShow = path(['byLanguage', labelLanguage], info) || path(['byLanguage', 'default'], info) || {}
    if (!showHumanReadable) {
      toShow = {};
    }
    const {label, description} = toShow;

    return (
      <Container
        type="inner"
        title={<ExpandIconContainer onClick={this.toggleExpanded}>
          <Space>
            {this.getToggleIcon()}
            {this.getTitle(label)}
            {this.getInfoIcon(description)}
          </Space>
        </ExpandIconContainer>}
        size="small"
        bodyStyle={{paddingTop: 0, paddingBottom: 0}}
        extra={this.getControls()}
      >
        {this.state.expanded && <List
          dataSource={propertyIds}
          renderItem={renderPropertyEntry}
        />}
      </Container>
    );
  }
}


const mapStateToProps = (appState, {id}) => ({
  entity: getClassById(id, appState),
  showHumanReadable: getShowHumanReadable(appState),
  labelLanguage: getLabelLanguage(appState)
});

const dispatchProps = {
  toggleHidden: pipe(ModelState.toggleClassHidden, dispatch),
  toggleSelected: pipe(ModelState.toggleClassSelected, dispatch),
  updateName: pipe(ModelState.updateClassName, dispatch),
  onCopyEntity: id => {
    Graph.onCreateNewEntity(id);
  },
  deleteClass: id => {
    Graph.onDeleteEntity(id);
  }
};

export const EntityEntry = connect(mapStateToProps, null)(EntityEntryComponent);
