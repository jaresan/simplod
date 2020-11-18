import {Wrapper} from './Wrapper';
import {path} from 'ramda';
import {Edge as EdgeHandler} from '../handlers';

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
    const {source, target} = edge.getModel();
    const id = `edge_${source}-${target}`;

    super(id);
    Object.assign(this, {
      id,
      edge,
      sourceGroup: edge.getSource().getContainer().get('wrapper'),
      targetGroup: edge.getTarget().getContainer().get('wrapper'),
      model: {
        source,
        target
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

  togglePropertiesSelected(flag) {
    this.sourceGroup.togglePropertiesSelected(this.model.target, flag);
    this.targetGroup.togglePropertiesSelected(this.model.source, flag);
  }

  setState(state) {
    super.setState(state);
    if (this.lastState.selected !== state.selected) {
      this.updateNodeHighlights();
    }
  };

  updateNodeHighlights() {
    this.sourceGroup.updateHighlight();
    this.targetGroup.updateHighlight();
  }

  onClick() {
    this.onToggleSelect();
    this.togglePropertiesSelected(this.state.selected);
  };

  hide() {
    this.edge.hide();
  }

  show() {
    this.edge.show();
  }
}
