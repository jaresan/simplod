import React from 'react';
import { PropertyEntry } from '@@components/entityList/PropertyEntry';
import { Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { dispatchSet } from '@@app-state';
import { selectedEdgePropertyIds } from '@@app-state/controls/state';

export const PropertyList = ({propertyIds, entities: [source, target]}) => {

  return <Card title={`?${source.varName} <---> ?${target.varName}`} extra={<CloseOutlined onClick={dispatchProps.deselectEdge} />}>
    {propertyIds.map(id => <PropertyEntry key={id} id={id} />)}
  </Card>
}

const dispatchProps = {
  deselectEdge: () => dispatchSet(selectedEdgePropertyIds, [])
};
