import { invoker, memoizeWith, pick, assocPath, path, identity, map, filter } from 'ramda';
import {Property, Method} from './index';
import { Handler } from '../handlers/Handler';
import { PROP_LINE_HEIGHT } from '../Node';

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
  handler = Handler;
  state = {
    selected: false,
    hover: false,
    hidden: false
  };

  constructor(entityId, group) {
    this.group = group;
    this.entityId = entityId;
    this.children = group.getChildren().reduce((acc, ch) => Object.assign(acc, {[ch.get('name')]: ch}), {});
    this.childrenWrappers = filter(identity, map(ch => ch.get('wrapper'), this.children));
    this.propertyWrappers = filter(w => (w instanceof Property) || (w instanceof Method), this.childrenWrappers);
    this.propertyContainer = this.children['property-container'];
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

    const nodesAffected = ['node-container', 'property-container', 'select-all-container', 'expand-icon-container', 'hide-icon-container'];
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
    this.toggleProperties(selected);
  }

  toggleProperties(show) {
    this.group.toFront();
    this.showProperties = typeof show === 'undefined' ? !this.showProperties : show;

    this.updatePropertyContainer();
  }

  updatePropertyContainer() {
    let i = 0;
    let maxWidth = 0;
    Object.values(this.propertyWrappers)
      .forEach(wrapper => {
        if (this.showProperties || wrapper.state.selected) {
          wrapper.show();
          wrapper.setIndex(i++);
          maxWidth = Math.max(maxWidth, wrapper.node.attr('width'));
        } else {
          wrapper.hide();
        }
      });

    if (i) {
      this.propertyContainer.setAttr('height', i * PROP_LINE_HEIGHT + 6);
      this.propertyContainer.setAttr('width', maxWidth);
      this.propertyContainer.show();
    } else {
      this.propertyContainer.hide();
    }
  }


  // TODO: Take dynamically from the object (save the paths to the attrs)
  swapExpandIcon() {
    const icon = this.children['expand-icon'];
    const collapseIconPath = 'images/collapse.png';
    const expandIconPath = 'images/expand.png';

    icon.attrs.img.src = this.showProperties ? collapseIconPath : expandIconPath;
  }

  isVisible = () => this.group.get('visible');

  toggleHidden(show) {
    this.state.hidden = typeof show === 'undefined' ? !this.state.hidden : show;
    const method = this.state.hidden ? 'hide' : 'show';

    this.group[method]();
    this.getEdges().forEach(e => e[method]());
    this.handler.toggleEntityHidden(this.entityId, this.state.hidden);
  }

  selectAllProperties() {
    this.handler.startSelectBatch();
    Object.values(this.propertyWrappers).forEach(p => p.onToggleSelect(true));
    this.handler.stopSelectBatch();
    this.toggleProperties(true);
  }

  onClick(target) {
    const name = target.get('name');

    if (['node-container', 'expand-icon-container', 'node-title', 'expand-icon'].includes(name)) {
      this.toggleProperties();
      this.swapExpandIcon()
    } else if (name.includes('select-all')) {
      this.selectAllProperties();
    } else if (name.includes('hide')) {
      this.toggleHidden();
    } else {
      propagate(target, 'onClick');
    }
    this.group.toFront();
  }

  stateChanged({target, state, lastState}) {
    if (!!state.selected !== !!lastState.selected) {
      this.updateHighlight(state.selected);
      this.updatePropertyContainer();
    }
    if (!!state.hidden !== !!lastState.hidden) {
      this.toggleHidden(state.hidden);
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
