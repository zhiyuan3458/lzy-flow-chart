import React, { useCallback, useRef } from 'react';

function DraggableNode (props) {
  const dragRef = useRef(null);
  const { node, dropNode, onMoveNode, canDragCanvas } = props;

  const onMouseDown = useCallback((e, node) => {
    e.stopPropagation();
    e.preventDefault();
    const initX = e.clientX;
    const initY = e.clientY;
    const nodeX = node.x;
    const nodeY = node.y;
    let b = null;
    let r = null;

    const onMouseMove = e => {
      const curX = e.clientX;
      const curY = e.clientY;
      let x = nodeX + (curX - initX);
      let y = nodeY + (curY - initY);
      if (!canDragCanvas) {
        if (x < 0) x = 0;
        if (y < 0) y = 0;
      }

      r = x + node.width;
      b = y + node.height;
      onMoveNode({ ...node, x, y, b, r }, e);
    };
    const onMouseUp = e => {
      document.onmousemove = null;
      document.onmouseup = null;

      const curX = e.clientX;
      const curY = e.clientY;
      let x = nodeX + (curX - initX);
      let y = nodeY + (curY - initY);
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      r = x + node.width;
      b = y + node.height;
      dropNode({ ...node, x, y, b, r }, e);
    };
    setTimeout(() => {
      document.onmousemove = null;
      document.onmouseup = null;
      document.onmousemove = onMouseMove;
      document.onmouseup = onMouseUp;
    }, 20);
  }, [dropNode, onMoveNode]);

  return (
    <div
      ref={ dragRef }
      style={{
        position: 'absolute',
        transform: `translate(${ node.x }px, ${ node.y }px)`
      }}
      onMouseDown={ e => onMouseDown(e, node) }
    >
      { props.children }
    </div>
  );
}

export default DraggableNode;
