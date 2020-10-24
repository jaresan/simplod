import { invoker, memoizeWith, pick, assocPath, path, identity, map, filter } from 'ramda';
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
    this.children = group.getChildren().reduce((acc, ch) => Object.assign(acc, {[ch.get('name')]: ch}), {});
    this.childrenWrappers = filter(identity, map(ch => ch.get('wrapper'), this.children));
    this.propertyWrappers = filter(w => (w instanceof Property) || (w instanceof Method), this.childrenWrappers);
    this.defaultChildAttrs = {};
    this.toggleProperties(false);
  }

  getEdges() {
    if (!this.edges) {
      const container = this.childrenWrappers['node-container'].getContainerNode();
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
    if (!this.propertyWrappers[target.get('name')]) {
      this.state.hover = false;
      this.updateHighlight(false);
      this.getEdges().forEach(e => e.onBlur());
    }
    return propagate(target, 'onBlur');
  }

  updateHighlight() {
    this.state.selected = Object.values(this.childrenWrappers).some(w => w.state.selected) || this.getEdges().some(e => e.state.selected);
    const shouldHighlight = this.state.selected || this.state.hover;

    const nodesAffected = ['node-container', 'property-container', 'select-all-container', 'expand-icon-container'];
    const updateStyle = shouldHighlight ? this.applyStyle.bind(this) : this.cancelStyle.bind(this);
    nodesAffected.forEach(name => updateStyle(this.children[name], ['titleOutline']));
    if (shouldHighlight) {
      this.group.toFront();
    }
  }

  togglePropertiesSelected(target, selected) {
    Object.values(this.propertyWrappers).forEach(p => {
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

    const isProperty = p => p.get('name').match(/^property/);
    this.group.getChildren().filter(isProperty).forEach(method)
  }

  swapExpandIcon() {
    const icon = this.children['expand-icon'];
    const collapseIconPath = 'images/collapse.png';
    const expandIconPath = 'images/expand.png';

    if (icon.attrs.img.src.match(collapseIconPath)) {
      icon.attrs.img.src = expandIconPath;
    } else {
      icon.attrs.img.src = collapseIconPath;
    }
  }

  selectAllProperties() {
    Object.values(this.propertyWrappers).forEach(p => p.onToggleSelect(true));
    this.toggleProperties(true);
  }

  onClick(target) {
    const name = target.get('name');

    if (['node-container', 'expand-icon-container', 'node-title', 'expand-icon'].includes(name)) {
      this.toggleProperties();
      this.swapExpandIcon()
    } else if (name.match(/select-all/)) {
      this.selectAllProperties();
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
