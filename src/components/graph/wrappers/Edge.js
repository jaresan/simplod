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
    this.edge
      .getSource()
      .getContainer()
      .get('wrapper')
      .togglePropertiesSelected(this.model.target, flag);

    this.edge
      .getTarget()
      .getContainer()
      .get('wrapper')
      .togglePropertiesSelected(this.model.source, flag);
  }

  onClick() {
    this.onToggleSelect();
    this.togglePropertiesSelected(this.state.selected);
  };
}
