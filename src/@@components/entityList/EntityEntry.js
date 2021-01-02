import React from 'react';
import {path, paths} from 'ramda';
import { List, Card, Space, Checkbox, Tooltip, Input } from 'antd';
import {connect} from 'react-redux';
import {PropertyEntry} from './PropertyEntry';
import {PrefixedText} from './PrefixedText';
import {RightOutlined, DownOutlined, EyeInvisibleOutlined, EyeOutlined, InfoCircleOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';
import { getClassById, getShowHumanReadable } from '@@selectors';
import Actions from '@@actions/model';
import * as Controls from './Controls';

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
      varName: props.entity.get('varName')
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const varName = this.props.entity.get('varName');

    if (varName !== prevState.varName && (prevState.varName === this.state.varName)) {
      this.setState({varName});
    }
  }

  onNameChange = e => this.setState({varName: e.target.value});

  toggleExpanded = () => this.setState(s => ({expanded: !s.expanded}));

  getToggleIcon = () => this.state.expanded ? <DownOutlined /> : <RightOutlined />

  getControls = () => {
    const {id, entity, toggleSelected, toggleHidden, updateName} = this.props;
    const {selected, hidden} = entity.toJS();
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

  getTitle = label => label ? <Tooltip
    title={<PrefixedText.Unwrapped title={this.props.id}/>}
  >{label}</Tooltip> : <PrefixedText title={this.props.id}/>;

  render() {
    const {id, entity, showHumanReadable} = this.props;
    const {propertyIds, info} = entity.toJS();

    if (!showHumanReadable) {
      info.label = '';
      info.description = '';
    }

    return (
      <Container
        type="inner"
        title={<ExpandIconContainer onClick={this.toggleExpanded}>
          <Space>
            {this.getToggleIcon()}
            {this.getTitle(info.label)}
            {this.getInfoIcon(info.description)}
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

const mapDispatchToProps = {
  toggleHidden: Actions.Creators.r_toggleEntityHidden,
  toggleSelected: Actions.Creators.r_toggleEntitySelected,
  updateName: Actions.Creators.r_updateEntityName
};

export const EntityEntry = connect(mapStateToProps, mapDispatchToProps)(EntityEntryComponent);
