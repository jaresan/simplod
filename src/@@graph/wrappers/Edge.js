import {Wrapper} from '@@graph/wrappers/Wrapper';
import {path, view, filter, prop, isEmpty} from 'ramda';
import {Edge as EdgeHandler} from '@@graph/handlers';
import { propertiesByIds } from '@@app-state/model/state';
import { getState } from '@@app-state';
import {Graph} from '@@graph/Graph';

const styles = {
  optional: {
    'edge-shape': {
      lineDash: [3]
    }
  },
  hover: {
    'edge-shape': {
      lineWidth: 3,
      opacity: 0.8
    },
    position: 0 // Determines style overriding priorities
  },
  highlighted: {
    'edge-shape': {
      stroke: '#15d03f',
      opacity: 0.5
    },
    position: 1
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
    },
    position: 2
  }
};

const defaultStyle = {
  'edge-shape': {
    stroke: '#666',
    lineWidth: 3,
    opacity: 0.2,
    lineDash: null
  },
  'text-shape': {
    opacity: 0.4,
    lineWidth: 1,
    stroke: '#666'
  },
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
          .sort(([key1], [key2]) => this.styles[key2].position - this.styles[key1].position)
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

    this.state.selected = this.isSelected();
    if (selected !== this.state.selected) {
      this.updateNodeHighlights();
    }
    this.state.optional = this.isOptional();
    this.updateStyles();
  };

  getProperties() {
    return view(propertiesByIds(this.model.propertyIds), getState());
  }

  isOptional() {
    return !isEmpty(filter(p => p.selected && p.optional, this.getProperties()));
  }

  isSelected() {
    return !isEmpty(filter(prop('selected'), this.getProperties()));
  }

  updateSelected() {
    this.setState({
      selected: this.isSelected()
    });
  }

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
    Graph.removeItem(this.edge);
    this.sourceGroup.recalculateEdges();
    this.targetGroup.recalculateEdges();
  }

  onBlur() {
    this.setState({hover: false});
    this.sourceGroup.updateHighlight(false);
    this.targetGroup.updateHighlight(false);
  }

  onHover() {
    this.setState({hover: true});
    this.sourceGroup.updateHighlight(true);
    this.targetGroup.updateHighlight(true);
  }
}
