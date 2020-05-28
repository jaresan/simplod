import {Canvas} from '../handlers';

export class Wrapper {
  // nodeType denotes the type of the node from AntD to use when rendering this object --> e.g. wrapped as a text
  static nodeType = 'text';

  // Default styling of components to be applied for this wrapper
  defaultStyle = {};
  styles = {};
  state = {style: {}};
  handler = Canvas;

  constructor(id) {
    this.id = id;
    this.handler.subscribeToChanges(id, this);
  }

  setTarget = target => {
    this.target = target;
    this.resetStyle();
    this.handler.registerResource(target.get('data'), this.id);
  };

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

  onClick = () => {
    // console.log(`Clicked ${this.constructor.name} -`, this.target, this.id);
    this.handler.onSelect(this.id);
  };

  onStateChanged = state => {
    this.setState(state);
  };
}
