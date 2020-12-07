import React from 'react';

function GuideLine (props) {
  const { edge } = props;
  const { x: x1, y: y1 } = edge.fromPos;
  const { x: x2, y: y2 } = edge.toPos;
  return (
    <line
      style={{ zIndex: 5 }}
      x1={ x1 }
      y1={ y1 }
      x2={ x2 }
      y2={ y2 }
      stroke="red"
      strokeWidth="1px"
    >
    </line>
  );
}

export default GuideLine;
