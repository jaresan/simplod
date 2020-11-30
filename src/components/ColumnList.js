import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { prop } from 'ramda';
import { connect } from 'react-redux';
import { getProperties } from 'src/selectors';
import ModelActions from 'src/actions/model';
import InteractionActions from 'src/actions/interactions';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItems = properties => properties.filter(p => p.get('selected')).sort((p1, p2) => p1.get('position') < p2.get('position') ? -1 : 1).map((p, id) => ({
  id,
  content: `${p.get('name')}`,
})).valueSeq().toJS();

class ColumnListComponent extends Component {
  constructor(props) {
    super(props);
    const items = getItems(props.properties);

    this.state = {items};
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.properties !== this.props.properties) {
      this.setState({items: getItems(this.props.properties)});
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

    this.props.updatePropertyPositions(items.map(prop('id')));
    this.props.dataChanged();
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

const mapDispatchToProps = {
  updatePropertyPositions: ModelActions.Creators.r_updatePropertyPositions,
  dataChanged: InteractionActions.Creators.s_dataChanged
};

export const ColumnList = connect(mapStateToProps, mapDispatchToProps)(ColumnListComponent);
