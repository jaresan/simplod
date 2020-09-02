import G6 from '@antv/g6';
import { always } from 'ramda';

componentDidMount2() {
  let data = {
    // The array of nodes
    nodes: [
      {
        id: 'node1', // String, unique and required
        x: 100, // Number, the x coordinate
        y: 200, // Number, the y coordinate
        label: 'Source' // The label of the node
      },
      {
        id: 'node2',
        x: 300,
        y: 200,
        label: 'Target'
      }
    ],
    // The array of edges
    edges: [
      // An edge links from node1 to node2
      {
        source: 'node1', // String, required, the id of the source node
        target: 'node2', // String, required, the id of the target node
        label: 'I am an edge' // The label of the edge
      }
    ]
  };

  // Instantiate the Minimap
  const minimap = new G6.Minimap({
    size: [100, 100],
    className: 'minimap',
    type: 'delegate',
  });

  const styles = {
    defaultNode: {
      size: 30, // The size of nodes
      // ...                 // The other properties
      // The style properties of nodes
      style: {
        fill: 'steelblue', // The filling color of nodes
        stroke: '#666', // The stroke color of nodes
        lineWidth: 1, // The line width of the stroke of nodes
      },
      // The properties for label of nodes
      labelCfg: {
        // The style properties for the label
        style: {
          fill: '#fff', // The color of the text
        },
      },
    },
    // The style properties and other properties for all the edges in the default state
    defaultEdge: {
      // ...                 // The other properties
      // The style properties of edges
      style: {
        opacity: 0.6, // The opacity of edges
        stroke: 'grey', // The color of the edges
        lineWidth: 3,
      },
      // The properties for label of edges
      labelCfg: {
        autoRotate: true, // Whether to rotate the label according to the edges
      },
    }
  };

  const stateStyles = {
    nodeStateStyles: {
      // The node style when the state 'hover' is true
      hover: {
        fill: 'lightsteelblue'
      },
      // The node style when the state 'click' is true
      selected: {
        fill: 'green',
        stroke: '#000',
        lineWidth: 3
      },
      relations: {
        fill: 'red',
        stroke: '#000',
        lineWidth: 3
      }
    },
    // The edge styles in different states
    edgeStateStyles: {
      // The edge style when the state 'click' is true
      selected: {
        stroke: 'steelblue'
      },
      relations: {
        stroke: 'black'
      }
    }
  };

  fetch('https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json')
    .then(r => r.json())
    .then(data => {
      // data.edges = data.edges.slice(5);
      const graph = new G6.Graph({
        container: 'mountNode', // String | HTMLElement, required, the id of DOM element or an HTML node
        width: 800, // Number, required, the width of the graph
        height: 500, // Number, required, the height of the graph
        // fitView: true,
        fitViewPadding: [20, 40, 50, 20],
        layout: {
          type: 'dagre',
          rankdir: 'TB',
          align: 'UL',
          workerEnabled: true
        },
        modes: {
          default: [
            {
              type: 'activate-relations',
              trigger: 'click',
              activeState: 'relations'
            },
            'drag-canvas', 'zoom-canvas', 'drag-node',
            {
              type: 'tooltip', // Tooltip
              formatText(model) {
                // The content of tooltip
                return 'label: ' + model.label + '<br/> class: ' + model.class;
              }
            },
            {
              type: 'edge-tooltip', // Edge tooltip
              formatText(model) {
                console.log(model);
                // The content of the edge tooltip
                const text =
                  'source: ' +
                  model.source +
                  '<br/> target: ' +
                  model.target +
                  '<br/> weight: ' +
                  model.weight;
                return text;
              },
            }
          ] // Allow users to drag canvas, zoom canvas, and drag nodes
        },
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: 200,
          workerEnabled: true
        },
        ...stateStyles,
        ...styles,
        plugins: [minimap]
      });

      graph.on('canvas:click', e => {
        graph.findAll('node', always(true)).forEach(edge => graph.setItemState(edge, 'selected', false));
        graph.findAll('edge', always(true)).forEach(edge => graph.setItemState(edge, 'selected', false));
      });
      //
      // // Mouse enter a node
      graph.on('node:mouseenter', e => {
        const nodeItem = e.item; // Get the target item
        graph.setItemState(nodeItem, 'hover', true); // Set the state 'hover' of the item to be true
      });
      //
      // // Mouse leave a node
      graph.on('node:mouseleave', e => {
        const nodeItem = e.item; // Get the target item
        graph.setItemState(nodeItem, 'hover', false); // Set the state 'hover' of the item to be false
      });
      //
      // // Click a node
      graph.on('node:click', e => {
        // Swich the 'click' state of the node to be false
        const nodeItem = e.item; // et the clicked item
        graph.setItemState(nodeItem, 'selected', true); // Set the state 'click' of the item to be true
      });
      //
      // // Click an edge
      graph.on('edge:click', e => {
        // Swich the 'click' state of the edge to be false
        const edgeItem = e.item; // Get the clicked item
        graph.setItemState(edgeItem, 'selected', true); // Set the state 'click' of the item to be true
      });
      graph.data(data); // Load the data defined in Step 2
      graph.render(); // Render the graph
    });
}
