import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { prop, path, mergeRight } from 'ramda';
import { connect } from 'react-redux';
import { getProperties, getClasses, getSelectionOrder } from '@@selectors';
import {dispatchSet} from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import {dataChanged} from '@@actions/lifecycle';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// FIXME: @reference 'selected' 'bound' 'varName'
const getItems = (items, selectionOrder) => selectionOrder
  .filter(id => path([id, 'selected'], items))
  .filter(id => !path([id, 'bound'], items))
  .map(id => ({
    id,
    content: `${path([id, 'varName'], items)}`
  }));

class ColumnListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {items: []};
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.updateItems();
  }

  updateItems() {
    const {entities, properties, selectionOrder} = this.props;
    const items = getItems(mergeRight(entities, properties), selectionOrder);
    this.setState({items});
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    const {entities, properties, selectionOrder} = this.props;
    if (prevProps.properties !== properties || prevProps.entities !== entities || prevProps.selectionOrder !== selectionOrder) {
      this.updateItems();
    }
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    dispatchProps.updateSelectionOrder(items.map(prop('id')));
    dataChanged();
  }

  getEmptyMessage = () => {
    return <h3>
      You can reorder the result set columns here after selecting some properties.
    </h3>
  };

  render() {
    if (!this.state.items.length) {
      return this.getEmptyMessage();
    }

    return (
      <div>
        Result column order:
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" direction="vertical">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  padding: 4,
                  overflow: 'auto',
                }}
                {...provided.droppableProps}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Tag>{index + 1}: {item.content} <DragOutlined /></Tag>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = appState => ({
  properties: getProperties(appState),
  entities: getClasses(appState),
  selectionOrder: getSelectionOrder(appState)
});

// TODO: @dispatch
const dispatchProps = {
  updateSelectionOrder: dispatchSet(ModelState.selectionOrder)
};

export const ColumnList = connect(mapStateToProps, null)(ColumnListComponent);
