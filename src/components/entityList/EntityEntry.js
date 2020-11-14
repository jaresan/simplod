import React from 'react';
import {List, Card, Checkbox, Space} from 'antd';
import {connect} from 'react-redux';
import {PropertyEntry} from './PropertyEntry';
import {PrefixedText} from './PrefixedText';
import { getPropertiesForEntity } from 'src/selectors';
import Actions from 'src/actions/model';
import { entityTypes } from 'src/constants/entityTypes';
import {RightOutlined, DownOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';

const ExpandIconContainer = styled.div`
  display: inline-block;
  width: 100%;
`;

const renderPropertyEntry = callbacks => ([id, p]) => (
  <PropertyEntry
    id={id}
    property={p}
    {...callbacks}
  />
);


class EntityEntryComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: props.properties.toJS(),
      expanded: false
    };

    this.propertyCallbacks = {
      onSetAsVariable: this.setPropertyAttr('asVariable'),
      onSetName: this.setPropertyAttr('name'),
      onSetOptional: this.setPropertyAttr('optional'),
      onSelect: this.setPropertyAttr('selected')
    };
  }

  toggleExpanded = () => this.setState(s => ({expanded: !s.expanded}));

  setProperty = (id, newData, afterSetState) => {
    const {properties} = this.state;
    const p = properties[id];
    this.setState({properties: {...properties, [id]: {...p, ...newData}}}, afterSetState);
  }

  setPropertyAttr = key => (id, value) => {
    this.setProperty(id, {[key]: value}, this.updateProperties);
  }

  updateProperties = () => this.props.updateProperties(this.state.properties);

  getToggleIcon = () => this.state.expanded ? <DownOutlined /> : <RightOutlined />

  render() {
    const {id} = this.props;
    const {properties} = this.state;

    return (
      <Card
        title={<ExpandIconContainer onClick={this.toggleExpanded}>
          <Space>
            {this.getToggleIcon()}
            <PrefixedText title={id}/>
          </Space>
        </ExpandIconContainer>}
        size="small"
        // extra={<Checkbox onChange={this.toggleExpanded}/>}
      >
        {this.state.expanded && <List
          dataSource={Object.entries(properties)}
          renderItem={renderPropertyEntry(this.propertyCallbacks)}
        />}
      </Card>
    );
  }
}


const mapStateToProps = (appState, {id}) => ({
  properties: getPropertiesForEntity(appState, id)
});

const mapDispatchToProps = {
  updateProperties: properties => Actions.Creators.r_updateEntities({[entityTypes.property]: properties})
};

export const EntityEntry = connect(mapStateToProps, mapDispatchToProps)(EntityEntryComponent);
