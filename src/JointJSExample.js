import React from 'react';
import joint from 'jointjs';

export default () => {
  const GraphBBox = joint.layout.DirectedGraph.layout({
    "My element": ["b", "c"],
    "b": ["f"],
    "c": ["e", "d"],
    "d": [],
    "e": [],
    "f": ["g"],
    "g": []
  }, {
    nodeSep: 50,
    edgeSep: 80,
    rankDir: "TB"
  });

  return <GraphBBox/>;
}
