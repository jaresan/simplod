import {Wrapper} from '@@graph/wrappers/Wrapper';
import {path} from 'ramda';
import {Edge as EdgeHandler} from '@@graph/handlers';

const styles = {
  hover: {
    'edge-shape': {
      lineWidth: 3,
      opacity: 0.8
    }
  },
  selected: {
    'edge-shape': {
      stroke: 'steelblue',
      lineWidth: 3,
      opacity: 1
    },
    'text-shape': {
      stroke: 'black',
      opacity: 1
    }
  }
};

const defaultStyle = {
  'edge-shape': {
    stroke: '#666',
    lineWidth: 3,
    opacity: 0.2
  },
  'text-shape': {
    opacity: 0.4,
    lineWidth: 1,
    stroke: '#666'
  }
};

export class Edge extends Wrapper {
  styles = styles;
  defaultStyle = defaultStyle;
  handler = EdgeHandler;

  constructor(edge) {
    const {source, target, propertyIds} = edge.getModel();
    const id = `edge_${source}-${target}`;

    super(id);
    Object.assign(this, {
      id,
      edge,
      sourceGroup: edge.getSource().getContainer().get('wrapper'),
      targetGroup: edge.getTarget().getContainer().get('wrapper'),
      model: {
        source,
        target,
        propertyIds
      },
    });

    this.handler.subscribeToChanges(id, this);
    this.updateStyles();
  }

  updateStyles = () => {
    this.edge
      .getContainer()
      .getChildren()
      .forEach(shape => {
        const name = shape.get('name');
        const style = Object
          .entries(this.state)
          .reduce((acc, [key, value]) =>
              Object.assign(acc, value ? path([key, name], this.styles) : {}),
            {...this.defaultStyle[name]}
          );
        shape.attr(style);
      });
  };

  setState(state) {
    const {selected} = this.state;
    Object.assign(this.state, state);
    if (selected !== state.selected) {
      this.updateNodeHighlights();
      this.updateStyles();
    }
  };

  updateNodeHighlights() {
    this.sourceGroup.updateHighlight();
    this.targetGroup.updateHighlight();
  }

  onClick() {
    this.handler.onClick(this);
  };

  hide() {
    this.edge.hide();
  }

  show() {
    if (this.sourceGroup.isVisible() && this.targetGroup.isVisible()) {
      this.edge.show();
    }
  }

  remove() {
    this.edge.destroy();
    this.sourceGroup.recalculateEdges();
    this.targetGroup.recalculateEdges();
  }

  onHover() {
    this.setState({hover: true});
    this.sourceGroup.updateHighlight(true);
    this.targetGroup.updateHighlight(true);
  }
}
