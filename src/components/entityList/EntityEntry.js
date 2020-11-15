import React from 'react';
import {List, Card, Space} from 'antd';
import {connect} from 'react-redux';
import {PropertyEntry} from './PropertyEntry';
import {PrefixedText} from './PrefixedText';
import {RightOutlined, DownOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';
import { getPropertyIdsByEntityId } from '../../selectors';

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
    const {id, propertyIds} = this.props;

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
        // extra={<Checkbox onChange={this.toggleExpanded}/>}
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
  propertyIds: getPropertyIdsByEntityId(appState, id)
});

export const EntityEntry = connect(mapStateToProps, null)(EntityEntryComponent);
