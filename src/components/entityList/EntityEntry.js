import React from 'react';
import {List, Card, Space} from 'antd';
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

  render() {
    const {id, entity, toggleHidden} = this.props;
    const {propertyIds, hidden} = entity.toJS();

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
        extra={<Controls.Toggle
          flag={!hidden}
          tooltipTextOn="Hide entity in the graph"
          tooltipTextOff="Show entity in the graph"
          onClick={() => toggleHidden(id, !hidden)}
          OnIcon={EyeOutlined}
          OffIcon={EyeInvisibleOutlined}
        />}
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
  toggleHidden: Actions.Creators.r_toggleEntityHidden
};

export const EntityEntry = connect(mapStateToProps, mapDispatchToProps)(EntityEntryComponent);
