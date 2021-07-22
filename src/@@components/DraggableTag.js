/**
 * @file AntD tag draggable wrapper
 * @module @@components/DraggableTag
 */
import React from 'react';
import { Tag } from 'antd';
import {DragOutlined} from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

export const DraggableTag = ({title}) => {
  return <Draggable draggableId="draggable-1" index={0}>
    <Tag>{title} <DragOutlined /></Tag>
  </Draggable>
};
