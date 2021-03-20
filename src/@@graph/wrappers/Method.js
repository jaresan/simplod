import {Wrapper} from '@@graph/wrappers/Wrapper';
import {Property as PropertyHandler} from '@@graph/handlers';
import { measureText, PROP_LINE_HEIGHT } from '@@graph/Node';
import { prop } from 'ramda';

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
    const {target} = this.getNode().get('data');
    return this
      .getContainerNode()
      .getContainer()
      .get('objectProperties')
      .filter(m => m.data.target === target)
  }

  getEdge() {
    if (this.edge) {
      return this.edge && this.edge.get('wrapper');
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

    return this.edge && this.edge.get('wrapper');
  }

  onToggleSelect(selected) {
    this.state.selected = typeof selected === 'undefined' ? !this.state.selected : selected;
    this.handler.onToggleSelect(this.id, this.state.selected);
    const groupController = this.getGroupController();
    groupController.updatePropertyContainer()
  }

  setIndex = i => {
    this.node.setAttr('y', PROP_LINE_HEIGHT * (i+1) + PROP_LINE_HEIGHT - 2);
  };

  show() {
    this.node.show();
  }

  hide() {
    this.node.hide();
  }

  remove() {
    this.node.remove();
  }

  updateText({predicate, targetType, varName}) {
    const text = `${predicate}: ${targetType} --> ?${varName}`;
    const {width} = measureText(this.node, text);
    this.node.setAttr('width', width + 8);
    this.node.setAttr('text', text);
    this.getGroupController().updatePropertyContainer();
  }

  setState(newState) {
    const shouldUpdateText = newState.predicate && [prop('predicate'), prop('targetType'), prop('varName')].some(p => p(newState) !== p(this.state));
    if (shouldUpdateText) {
      this.updateText(newState);
    }
    super.setState(newState);
    if (this.getEdge()) {
      this.getEdge().updateSelected();
    }
  }
}
