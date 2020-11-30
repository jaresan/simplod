import React from 'react';
import { List, Card, Space, Checkbox, Tooltip, Input } from 'antd';
import {connect} from 'react-redux';
import {PropertyEntry} from './PropertyEntry';
import {PrefixedText} from './PrefixedText';
import {RightOutlined, DownOutlined, EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';
import { getEntityById } from '../../selectors';
import Actions from 'src/actions/model';
import * as Controls from './Controls';

const ExpandIconContainer = styled.div`
  display: inline-block;
  width: 100%;
`;

const Container = styled(Card)`
  width: 100%;
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
      expanded: false
    };
  }

  toggleExpanded = () => this.setState(s => ({expanded: !s.expanded}));

  getToggleIcon = () => this.state.expanded ? <DownOutlined /> : <RightOutlined />

  getControls = () => {
    const {id, entity, toggleSelected, toggleHidden, updateName} = this.props;
    const {selected, hidden, varName} = entity.toJS();
    return (
      <ControlsContainer>
        <Space>
          <Input
            type="text"
            defaultValue={varName}
            onBlur={e => updateName(id, e.target.value)}
            onPressEnter={e => updateName(id, e.target.value)}
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

  render() {
    const {id, entity} = this.props;
    const {propertyIds} = entity.toJS();

    return (
      <Container
        type="inner"
        title={<ExpandIconContainer onClick={this.toggleExpanded}>
          <Space>
            {this.getToggleIcon()}
            <PrefixedText title={id}/>
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
  entity: getEntityById(appState, id)
});

const mapDispatchToProps = {
  toggleHidden: Actions.Creators.r_toggleEntityHidden,
  toggleSelected: Actions.Creators.r_toggleEntitySelected,
  updateName: Actions.Creators.r_updateEntityName
};

export const EntityEntry = connect(mapStateToProps, mapDispatchToProps)(EntityEntryComponent);
