import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { connect } from 'react-redux';
import { getProperties } from 'src/selectors';

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class ColumnListComponent extends Component {
  constructor(props) {
    super(props);
    const items = this.getItems(props.properties);

    this.state = {items};
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  getItems = properties => properties.filter(p => p.get('selected')).map((p, id) => ({
      id,
      content: `${p.get('name')}`,
    })).valueSeq().toJS();

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.properties !== this.props.properties) {
      this.setState({items: this.getItems(this.props.properties)});
    }
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // FIXME: Dispatch action to reorder in reducer
    // FIXME: Change sparql select from * to selected variables
    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <div>
        Result column order:
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  display: 'flex',
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
  properties: getProperties(appState)
});

export const ColumnList = connect(mapStateToProps, null)(ColumnListComponent);
