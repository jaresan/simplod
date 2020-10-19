import {invoker} from 'ramda';

class Group {
  constructor(group) {
    this.group = group;
    this.toggleProperties(false);
  }

  // FIXME: Add all wrapper events here and propagate from here to the rest :lenny:
  toggleProperties(show) {
    this.group.toFront();
    this.showProperties = typeof show === 'undefined' ? !this.showProperties : show;
    const method = this.showProperties ? invoker(0, 'show') : invoker(0, 'hide');

    // FIXME: Dynamic lookup instead of slice(2)
    this.group.getChildren().slice(2).forEach(method)
  }

  onClick(target) {
    if (target.get('name') === 'node-title') {
      this.toggleProperties();
    }
    this.group.toFront();
  }
}

export default Group;
