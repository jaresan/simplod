import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { prop } from 'ramda';
import { connect } from 'react-redux';
import { getProperties, getEntities, getSelectionOrder } from 'src/selectors';
import ModelActions from 'src/actions/model';
import InteractionActions from 'src/actions/interactions';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItems = (items, selectionOrder) => items.filter(p => p.get('selected')).map((p, id) => ({
  id,
  content: `${p.get('varName')}`,
})).sort(({id: id1}, {id: id2}) => selectionOrder.indexOf(id1) < selectionOrder.indexOf(id2) ? -1 : 1).valueSeq().toJS();

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
    const items = getItems(entities.merge(properties), selectionOrder);
    this.setState({items });
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

    this.props.updateSelectionOrder(items.map(prop('id')));
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
  properties: getProperties(appState),
  entities: getEntities(appState),
  selectionOrder: getSelectionOrder(appState)
});

const mapDispatchToProps = {
  updateSelectionOrder: ModelActions.Creators.r_updateSelectionOrder,
  dataChanged: InteractionActions.Creators.s_dataChanged
};

export const ColumnList = connect(mapStateToProps, mapDispatchToProps)(ColumnListComponent);
