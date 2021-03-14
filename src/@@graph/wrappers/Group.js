import { pick, assocPath, path, identity, map, filter, prop, forEachObjIndexed } from 'ramda';
import {Property, Method} from '@@graph/wrappers/index';
import { Handler } from '@@graph/handlers/Handler';
import { measureText, PROP_LINE_HEIGHT } from '@@graph/Node';
import { entityTypes } from '@@model/entity-types';

const getWrapper = target => target.get('wrapper');
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
    hidden: false,
    expanded: false
  };

  constructor(entityId, group) {
    this.group = group;
    this.entityId = entityId;
    this.children = group.getChildren().reduce((acc, ch) => Object.assign(acc, {[ch.get('name')]: ch}), {});
    this.childrenWrappers = filter(identity, map(ch => ch.get('wrapper'), this.children));
    this.propertyWrappers = filter(w => (w instanceof Property) || (w instanceof Method), this.childrenWrappers);
    this.propertyContainer = this.children['property-container'];
    this.defaultChildAttrs = {};
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

  onLoad() {
    this.updateExpandIcon();
  }

  onHover(target) {
    this.state.hover = true;
    this.updateHighlight(true);
    this.getEdges().forEach(e => e.onHover());
    this.group.toFront();
    return propagate(target, 'onHover');
  }

  onBlur(target) {
    this.state.hover = false;
    this.updateHighlight(false);
    this.getEdges().forEach(e => e.onBlur());
    return propagate(target, 'onBlur');
  }

  updateHighlight(shouldHighlight) {
    const nodesAffected = ['copy-node-container', 'node-container', 'property-container', 'select-all-container', 'expand-icon-container', 'hide-icon-container'];
    const updateStyle = shouldHighlight ? this.applyStyle.bind(this) : this.cancelStyle.bind(this);
    nodesAffected.forEach(name => updateStyle(this.children[name], ['titleOutline']));
    if (shouldHighlight) {
      this.group.toFront();
      forEachObjIndexed(this.propertyWrappers, p => p.toFront());
    }
  }

  togglePropertiesSelected(target, selected) {
    Object.values(this.propertyWrappers).forEach(p => {
      if (p.state.target === target) {
        p.onToggleSelect(selected);
      }
    })
  }

  toggleExpanded(expand) {
    this.group.toFront();
    this.state.expanded = typeof expand === 'undefined' ? !this.state.expanded : expand;

    this.updatePropertyContainer();
    this.updateExpandIcon();
    this.handler.toggleEntityExpanded(this.entityId, this.state.expanded);
  }

  updatePropertyContainer() {
    let i = 0;
    let maxWidth = 0;
    Object.values(this.propertyWrappers)
      .forEach(wrapper => {
        if (this.state.expanded || wrapper.state.selected) {
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
  updateExpandIcon() {
    const icon = this.children['expand-icon'];
    const collapseIconPath = 'images/collapse.png';
    const expandIconPath = 'images/expand.png';

    if (typeof icon.attrs.img !== 'string') {
      icon.attrs.img.src = this.state.expanded ? collapseIconPath : expandIconPath;
    }
  }

  isVisible = () => this.group.get('visible');

  toggleHidden(show) {
    this.state.hidden = typeof show === 'undefined' ? !this.state.hidden : show;
    const method = this.state.hidden ? 'hide' : 'show';

    this.group[method]();
    this.getEdges().forEach(e => e[method]());
  }

  selectAllProperties() {
    this.handler.batchSelect(entityTypes.property, Object.values(this.propertyWrappers).map(prop('id')));
    // FIXME: Select edges as well / select them through properties? / add the highlight logic in edge wrappers directly? --> check any property selected
    this.updatePropertyContainer();
    this.toggleExpanded(true);
  }

  onClick(target) {
    const name = target.get('name');

    if (['node-container', 'expand-icon-container', 'node-title', 'expand-icon'].includes(name)) {
      this.toggleExpanded(!this.state.expanded);
    } else if (name.includes('select-all')) {
      this.selectAllProperties();
    } else if (name.includes('hide')) {
      this.handler.toggleEntityHidden(this.entityId, !this.state.hidden);
    } else {
      propagate(target, 'onClick');
    }
    this.group.toFront();
  }

  updateClassType(type) {
    // this.children['node-container'].get('fns').updateTitle(type);
    // this.children['node-title'].get('fns').updateTitle(type);
    const container = this.children['node-container'];
    const title = this.children['node-title'];
    const expandContainer = this.children['expand-icon-container'];
    const expandIcon = this.children['expand-icon'];
    const width = measureText(container, type).width + 8;
    container.setAttr('width', width);
    title.setAttr('x', width / 2);
    title.setAttr('text', type);
    expandContainer.setAttr('x', width);
    expandIcon.setAttr('x', width + 3);
  }

  stateChanged({target, state, lastState}) {
    if (state.selected !== lastState.selected) {
      this.updateHighlight(state.selected);
      this.updatePropertyContainer();
    }
    if (state.hidden !== lastState.hidden) {
      this.toggleHidden(state.hidden);
    }
    if (state.expanded !== lastState.expanded) {
      this.toggleExpanded(state.expanded);
    }
    if (state.type && state.type !== lastState.type) {
      this.updateClassType(state.type);
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
