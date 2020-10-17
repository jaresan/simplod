import {Wrapper} from './Wrapper';
import {path} from 'ramda';
import {Edge as EdgeHandler} from '../handlers';

const styles = {
  hover: {
    'edge-shape': {
      lineWidth: 1.5,
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
    lineWidth: 1,
    opacity: 0.4
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
    const {source, target, predicate} = edge.getModel();
    const id = `edge_${source}-${predicate}-${target}`;

    super(id);
    Object.assign(this, {
      id,
      edge,
      model: {
        source,
        predicate,
        target
      },
    });

    this.handler.subscribeToChanges(id, this);
  }

  updateStyles = () => {
    this.edge
      .getContainer()
      .getChildren()
      .forEach(shape => {
        const name = shape.get('name');
        const style = Object
          .entries(this.state.style)
          .reduce((acc, [key, value]) =>
            Object.assign(acc, value ? path([key, name], this.styles) : {}),
            {...this.defaultStyle[name]}
          );
        shape.attr(style);
      });
  };

  togglePropertiesSelected(flag) {
    this.edge.getSource()
      .getContainer()
      .getChildren()
      .filter(ch => ch.get('data') && ch.get('data').target === this.model.target)
      .forEach(prop => prop.get('wrapper').onToggleSelect(flag));
  }

  onClick() {
    this.onToggleSelect();
    this.togglePropertiesSelected(this.selected);
  };
}
