import {Property, Method, Edge, Node, Canvas} from '../handlers';

export class Wrapper {
  defaultStyle = {};
  styles = {};
  state = {style: {}};
  handler = Canvas;

  constructor(id) {
    this.id = id;
    this.handler.subscribeToChanges(id, this);
  }

  onHover = () => {
    this.setState({hover: true});
  };

  onBlur = () => {
    this.setState({hover: false});
  };

  setState = keys => {
    Object.assign(this.state.style, keys);
    this.updateStyles();
  };

  resetStyle = () => this.target.attr(this.defaultStyle);

  updateTargetStyle = style => this.target.attr(style);

  updateStyles = () => {
    const style = Object.entries(this.state.style).reduce((acc, [key, value]) => Object.assign(acc, value ? this.styles[key] : {}), {...this.defaultStyle});
    this.updateTargetStyle(style);
  };

  setTarget = target => {
    this.target = target;
  };

  onClick = () => {
    console.log(`Clicked ${this.constructor.name} -`, this.target, this.id);
  };

  onStateChanged = state => {
    this.setState(state);
    // console.log('state changed', state);
  };
}
