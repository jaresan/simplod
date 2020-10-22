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
  'hover': {stroke: 'white', lineWidth: 1},
  'selected': {fill: 'cyan'},
};

export class Method extends Wrapper {
  static nodeType = 'text';
  defaultStyle = defaultStyle;
  styles = styles;
  handler = PropertyHandler;

  getSameTargetProperties() {
    return this
      .getContainerNode()
      .getContainer()
      .get('methods')
      .filter(m => m.data.target === this.getNode().get('data').target)
  }

  findEdge() {
    if (this.edge) {
      return;
    }

    const model = this.getNode().get('data');
    const containerNode = this.getContainerNode();
    this.edge = containerNode.getOutEdges()
      .concat(containerNode.getInEdges())
      .find(e => {
        const {target, source} = e.getModel();
        // Edges are bidirectional
        return (model.target === target && model.source === source) || (model.source === target && model.target === source);
      })
  }

  toggleSelectOutgoingEdge(select) {
    if (this.edge) {
      this.edge.get('wrapper').onToggleSelect(select)
    }
  }

  onToggleSelect(...args) {
    super.onToggleSelect(...args);

    this.findEdge();
    const similarProps = this.getSameTargetProperties();
    this.toggleSelectOutgoingEdge(similarProps.some(p => p.wrapper.state.selected));
  }
}
