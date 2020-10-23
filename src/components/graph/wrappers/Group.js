import { invoker, memoizeWith, pick, assocPath, path, identity } from 'ramda';
import {Property, Method} from './index';

const getWrapper = memoizeWith(t => t.get('id'), target => target.get('wrapper'));
function propagate(target, key) {
  const wrapper = getWrapper(target);
  return wrapper && wrapper[key] && wrapper[key]();
}

const styles = {
  titleOutline: {
    stroke: 'cyan',
    lineWidth: 3
  }
}

class GroupController {
  state = {
    selected: false,
    hover: false
  };

  constructor(group) {
    this.group = group;
    this.children = group.getChildren();
    this.childrenWrappers = this.children.map(ch => ch.get('wrapper')).filter(identity);
    this.propertyWrappers = this.childrenWrappers.filter(w => (w instanceof Property) || (w instanceof Method));
    this.defaultChildAttrs = {};
    this.toggleProperties(false);
  }

  getEdges() {
    if (!this.edges) {
      const container = this.childrenWrappers[0].getContainerNode();
      this.edges = container.getOutEdges().concat(container.getInEdges()).map(e => e.get('wrapper'));
    }

    return this.edges;
  }

  // FIXME: Apply styles as an array so that multiple different effects can take place at once and cancelling them
  // wouldn't mess up styles applied later
  applyStyle(target, stylePath) {
    if (!path([target.get('id'), ...stylePath], this.defaultChildAttrs)) {
      this.defaultChildAttrs = assocPath([target.get('id'), ...stylePath], pick(Object.keys(path(stylePath, styles)), target.attrs), this.defaultChildAttrs);
    }

    target.attr(path(stylePath, styles));
  }

  cancelStyle(target, stylePath) {
    target.attr(path([target.get('id'), ...stylePath], this.defaultChildAttrs));
  }

  onHover(target) {
    this.state.hover = true;
    this.updateHighlight(true);
    this.getEdges().forEach(e => e.onHover());
    this.group.toFront();
    return propagate(target, 'onHover');
  }

  onBlur(target) {
    if (!this.propertyWrappers.includes(target)) {
      this.state.hover = false;
      this.updateHighlight(false);
      this.getEdges().forEach(e => e.onBlur());
    }
    return propagate(target, 'onBlur');
  }

  updateHighlight() {
    this.state.selected = this.childrenWrappers.some(w => w.state.selected) || this.getEdges().some(e => e.state.selected);
    const shouldHighlight = this.state.selected || this.state.hover;

    if (!shouldHighlight) {
      this.cancelStyle(this.children[0], ['titleOutline'])
      this.cancelStyle(this.children[2], ['titleOutline'])
    } else {
      this.applyStyle(this.children[0], ['titleOutline'])
      this.applyStyle(this.children[2], ['titleOutline'])
    }
  }

  togglePropertiesSelected(target, selected) {
    this.propertyWrappers.forEach(p => {
      if (p.state.target === target) {
        p.onToggleSelect(selected);
      }
    })
  }

  toggleProperties(show) {
    this.group.toFront();
    // FIXME: Leave selected properties expanded --> have to change the container size
    this.showProperties = typeof show === 'undefined' ? !this.showProperties : show;
    const method = this.showProperties ? invoker(0, 'show') : invoker(0, 'hide');

    // FIXME: Dynamic lookup instead of slice(2)
    this.group.getChildren().slice(2).forEach(method)
  }

  onClick(target) {
    if (this.children.indexOf(target) < 2) {
      this.toggleProperties();
    } else {
      propagate(target, 'onClick');
    }

    this.group.toFront();
  }

  stateChanged({target, state, lastState}) {
    if (state.selected !== lastState.selected) {
      this.updateHighlight(state.selected);
    }
  }
}

const Group = new Proxy(
  GroupController,
  {
    get(group, key, receiver) {
      if (typeof group[key] === 'function') {
        return group[key];
      } else if (group.hasOwnProperty(key)) {
        return group[key];
      } else {
        return target => {
          const wrapper = getWrapper(target);
          if (wrapper && typeof wrapper[key] == 'function') {
            return wrapper[key]()
          }
        }
      }
    }
  }
);

export default Group;
