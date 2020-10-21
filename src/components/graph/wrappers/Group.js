import { invoker, memoizeWith, prop } from 'ramda';

const getWrapper = memoizeWith(t => t.get('id'), target => console.log(target.get('id')) || target.get('wrapper') || (target.getModel && target.getModel().wrapper));
function propagate(target, key) {
  const wrapper = getWrapper(target);
  return wrapper && wrapper[key] && wrapper[key]();
}

class GroupController {
  constructor(group) {
    this.group = group;
    this.toggleProperties(false);
  }

  onHover(target) {
    return propagate(target, 'onHover');
  }

  onBlur(target) {
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
    if (target.get('name') === 'node-title') {
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
