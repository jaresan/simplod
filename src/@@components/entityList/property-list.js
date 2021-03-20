import React from 'react';
import { PropertyEntry } from '@@components/entityList/PropertyEntry';
import { Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { dispatch, dispatchSet } from '@@app-state';
import { selectedEdgePropertyIds } from '@@app-state/controls/state';
import { keys, groupBy, pipe, prop, map, head } from 'ramda';
import { unhighlightEdges } from '@@app-state/model/state';
import styled from '@emotion/styled';

const GroupHeader = styled.h3`
  text-decoration: underline;
  margin-bottom: 0;
`;

export const PropertyList = ({properties, entities}) => {
  const propIds = keys(properties);
  const {source, target} = properties[propIds[0]];

  const sourceVar = `?${entities[source].varName}`;
  const targetVar = `?${entities[target].varName}`
  const pIdsBySource = map(map(head), groupBy(pipe(prop(1), prop('source')), Object.entries(properties)));

  return <Card title={<span>Properties: {sourceVar} &larr;&rarr; {targetVar}</span>} extra={<CloseOutlined onClick={dispatchProps.deselectEdge} />}>
    <GroupHeader>{sourceVar} &rarr; {targetVar}</GroupHeader>
    {pIdsBySource[source].map(id => <PropertyEntry key={id} id={id} />)}
    <GroupHeader>{targetVar} &rarr; {sourceVar}</GroupHeader>
    {pIdsBySource[target].map(id => <PropertyEntry key={id} id={id} />)}
  </Card>
}

const dispatchProps = {
  deselectEdge: () => {
    dispatch(unhighlightEdges);
    dispatchSet(selectedEdgePropertyIds, []);
  }
};
