import { invoker, memoizeWith, pick, assocPath, path } from 'ramda';

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
  constructor(group) {
    window.group = group;
    this.group = group;
    this.children = group.getChildren();
    this.defaultChildrenAttrs = {};
    this.toggleProperties(false);
  }

  // FIXME: Apply styles as an array so that multiple different effects can take place at once and cancelling them
  // wouldn't mess up styles applied later
  applyStyle(target, stylePath) {
    if (!path([target.get('id'), ...stylePath], this.defaultChildrenAttrs)) {
      this.defaultChildrenAttrs = assocPath([target.get('id'), ...stylePath], pick(Object.keys(path(stylePath, styles)), target.attrs), this.defaultChildrenAttrs);
    }

    target.attr(path(stylePath, styles));
  }

  cancelStyle(target, stylePath) {
    target.attr(path([target.get('id'), ...stylePath], this.defaultChildrenAttrs));
  }

  onHover(target) {
    // FIXME: Named references instead of array indexes
    this.applyStyle(this.children[0], ['titleOutline'])
    this.applyStyle(this.children[2], ['titleOutline'])
    return propagate(target, 'onHover');
  }

  onBlur(target) {
    this.cancelStyle(this.children[0], ['titleOutline'])
    this.cancelStyle(this.children[2], ['titleOutline'])
    return propagate(target, 'onBlur');
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
