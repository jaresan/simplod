import {Wrapper} from './Wrapper';
import {Property as PropertyHandler} from '../handlers';

const defaultStyle = {
  opacity: 1,
  lineWidth: 1,
  lineAppendWidth: 0,
  strokeOpacity: 1,
  fillOpacity: 1,
  fontSize: 12,
  fontFamily: "sans-serif",
  textAlign: "left",
  textBaseline: "top",
  fill: "#000",
  stroke: 'transparent',
  font: "normal normal normal 12px sans-serif"
};

const styles = {
  'hover': {stroke: 'white', strokeWidth: 1},
  'selected': {fill: 'cyan'},
};

export class Method extends Wrapper {
  static nodeType = 'text';
  defaultStyle = defaultStyle;
  styles = styles;
  handler = PropertyHandler;

  highlightOutgoingEdges = () => {
    const model = this.getNode().get('data');
    this
      .getContainerNode()
      .getOutEdges()
      .filter(e => {
        const {target} = e.getModel();
        return model.target === target;
      })
      .forEach(e => e.get('wrapper').highlight());
  }

  onClick = () => {
    this.onToggleSelect();
    if (this.selected) {
      this.highlightOutgoingEdges();
    }
  };
}
