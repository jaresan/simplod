import React from 'react';
import { pick, pipe, filter, prop } from 'ramda';
import { List, Card, Space, Checkbox, Tooltip, Input, message } from 'antd';
import {connect} from 'react-redux';
import {PropertyEntry} from './PropertyEntry';
import {PrefixedText} from './PrefixedText';
import {RightOutlined, DownOutlined, EyeInvisibleOutlined, EyeOutlined, InfoCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';
import { getClassById, getShowHumanReadable } from '@@selectors';
import * as Controls from './Controls';
import * as ModelState from '@@app-state/model/state';
import { dispatch, getState } from '@@app-state';
import { translated } from '@@localization';
import { getPropertiesByTarget } from '@@app-state/model/state';

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
      // FIXME: @reference
      varName: props.entity.varName
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // FIXME: @reference
    const varName = this.props.entity.varName;

    if (varName !== prevState.varName && (prevState.varName === this.state.varName)) {
      this.setState({varName});
    }
  }

  onNameChange = e => this.setState({varName: e.target.value});

  toggleExpanded = () => this.setState(s => ({expanded: !s.expanded}));

  getToggleIcon = () => this.state.expanded ? <DownOutlined /> : <RightOutlined />

  getControls = () => {
    const {id, entity} = this.props;
    const {toggleSelected, toggleHidden, updateName, deleteClass} = dispatchProps;
    const {selected, hidden, dummy} = entity;
    const {varName} = this.state;
    return (
      <ControlsContainer>
        <Space>
          <Input
            type="text"
            value={varName}
            onChange={this.onNameChange}
            onBlur={() => updateName(id, varName)}
            onPressEnter={() => updateName(id, varName)}
          />
          <Tooltip title={`${selected ? 'Hide' : 'Show'} entity in the result set`}>
            <Checkbox
              onChange={e => toggleSelected(id, e.target.checked)}
              name="Select"
              checked={selected}
            />
          </Tooltip>
          {
            dummy ?
              <Controls.Toggle
                flag={true}
                tooltipTextOn="Delete entity"
                onClick={() => deleteClass(id)}
                OnIcon={DeleteOutlined}
              />
              :
              <Controls.Toggle
                flag={!hidden}
                tooltipTextOn="Hide entity in the graph"
                tooltipTextOff="Show entity in the graph"
                onClick={() => toggleHidden(id, !hidden)}
                OnIcon={EyeOutlined}
                OffIcon={EyeInvisibleOutlined}
              />
          }
        </Space>
      </ControlsContainer>
    );
  }

  getInfoIcon = description => description && <Tooltip title={description}>
    <InfoCircleOutlined />
  </Tooltip>;

  getTitle = label => label ? <Tooltip
    title={<PrefixedText.Unwrapped title={this.props.entity.type}/>}
  >{label}</Tooltip> : <PrefixedText title={this.props.entity.type}/>;

  render() {
    const {entity, showHumanReadable} = this.props;
    const {propertyIds, info} = entity;

    // FIXME: @reference to entity fields
    let toShow = pick(['label', 'description'], info);
    if (!showHumanReadable) {
      toShow = {};
    }

    return (
      <Container
        type="inner"
        title={<ExpandIconContainer onClick={this.toggleExpanded}>
          <Space>
            {this.getToggleIcon()}
            {this.getTitle(toShow.label)}
            {this.getInfoIcon(toShow.description)}
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
  showHumanReadable: getShowHumanReadable(appState)
});

// TODO: @dispatch rewrite
const dispatchProps = {
  toggleHidden: pipe(ModelState.toggleClassHidden, dispatch),
  toggleSelected: (id, selected) => {
    dispatch(ModelState.toggleClassSelected(id, selected));
    if (selected) {
      const properties = getPropertiesByTarget(id, getState());
      const selected = filter(prop('selected'), properties);

      if (Object.keys(properties).length && Object.keys(selected).length === 0) {
        message.warning(translated('No path found for the selected entity. This might result in querying a cartesian product.'))
      }
    }
  },
  updateName: pipe(ModelState.updateClassName, dispatch),
  deleteClass: pipe(ModelState.deleteClass, dispatch)
};

export const EntityEntry = connect(mapStateToProps, null)(EntityEntryComponent);
