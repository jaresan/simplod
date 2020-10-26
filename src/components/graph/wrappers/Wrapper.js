import {Canvas} from '../handlers';

export class Wrapper {
  // nodeType denotes the type of the node from AntD to use when rendering this object --> e.g. wrapped as a text
  static nodeType = 'text';

  // Default styling of components to be applied for this wrapper
  defaultStyle = {};
  styles = {};
  state = {selected: false};
  lastState = {};
  style = {};
  handler = Canvas;

  constructor(id) {
    this.id = id;
  }


  /**
   * Sets the wrappers node in the graph (the graph's representation of the node).
   * @param node
   */
  setNode(node) {
    this.node = node;
    this.resetStyle();
    this.handler.preregisterResource(node.get('data'), this.id);
    this.handler.subscribeToChanges(this.id, this);
  };

  getNode() {
    return this.node;
  }

  /**
   * Sets container node --> properties & other wrappers can reference the container they are a part of.
   * @param containerNode
   */
  setContainerNode(containerNode) {
    this.containerNode = containerNode;
  }

  getContainerNode() {
    return this.containerNode;
  }

  getGroupController() {
    return this.containerNode && this.containerNode.getContainer().get('wrapper');
  }

  onHover() {
    this.setState({hover: true});
  }

  onBlur() {
    this.setState({hover: false});
  }

  setState(state) {
    Object.assign(this.state, state);
    this.callOnParent('stateChanged', {target: this, state, lastState: this.lastState});
    this.updateStyles();
  }

  resetStyle() {
    this.getNode().attr(this.defaultStyle);
  }

  updateTargetStyle(style) {
    this.getNode().attr(style);
  }

  updateStyles = () => {
    const style = Object.entries(this.state).reduce((acc, [key, value]) => Object.assign(acc, value ? this.styles[key] : {}), {...this.defaultStyle});
    this.updateTargetStyle(style);
  }

  onClick() {
    this.onToggleSelect(!this.state.selected);
  }

  onToggleSelect(selected) {
    this.state.selected = typeof selected === 'undefined' ? !this.state.selected : selected;
    this.handler.onToggleSelect(this.id, this.state.selected);
  }

  callOnParent(methodName, ...args) {
    const controller = this.getGroupController();
    if (controller && controller[methodName]) {
      controller[methodName](...args);
    }
  }

  onStateChanged(state) {
    this.setState(state);
  };
}
