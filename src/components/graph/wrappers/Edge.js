import {Wrapper} from './Wrapper';
import { path } from 'ramda';

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

  constructor(edge) {
    const {source, target, predicate} = edge.getModel();
    const id = `${source}-${predicate}-${target}`;

    super(id);
    Object.assign(this, {
      id,
      target: edge,
      model: {
        source,
        predicate,
        target
      },
    });

    // Have to subscribe again because of the constructor override
    this.handler.subscribeToChanges(id, this);
  }

  updateStyles = () => {
    this.target
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
}
