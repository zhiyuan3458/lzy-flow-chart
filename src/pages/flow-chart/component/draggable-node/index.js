import React, { useCallback, useRef } from 'react';
import Styles from '@/pages/flow-chart/index.less';
import { containerId } from '@/pages/flow-chart/utils';
import { parseTransForm } from '../../utils';

function DraggableNode (props) {
  const dragRef = useRef(null);
  const { node, dropNode, container, onMoveNode } = props;
  let dragDOM = null;
  const createDrag = (e) => {
    dragDOM = e.target.cloneNode(true);
    dragDOM.className = e.target.className;
    dragDOM.style.position = 'absolute';
    dragDOM.style.transform = `translate(${ node.x }px, ${ node.y }px)`;
    dragDOM.style.opacity = 0.6;
    dragDOM.style.filter = 'alpha(opacity=60)';
    if (container) {
      container.appendChild(dragDOM);
    }
  };

  const onMouseDown = useCallback((e, node) => {
    e.preventDefault();
    const initX = e.clientX;
    const initY = e.clientY;
    const nodeX = node.x;
    const nodeY = node.y;
    // createDrag(e);
    let b = null;
    let r = null;
    const onMouseMove = e => {
      const curX = e.clientX;
      const curY = e.clientY;
      let x = nodeX + (curX - initX);
      let y = nodeY + (curY - initY);
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      // dragDOM.style.transform = `translate(${ x }px, ${ y }px)`;

      r = x + node.width;
      b = y + node.height;
      // onMoveNode({ ...node, x, y, b, r }, dragDOM);
      onMoveNode({ ...node, x, y, b, r });
    };
    const onMouseUp = e => {
      document.onmousemove = null;
      document.onmouseup = null;
      // let lastPos = null;
      // if (dragDOM) {
      //   lastPos = parseTransForm(dragDOM.style.transform);
      // }
      // if (dragDOM && container) {
      //   container.removeChild(dragDOM);
      //   dragDOM = null;
      // }
      const curX = e.clientX;
      const curY = e.clientY;
      let x = nodeX + (curX - initX);
      let y = nodeY + (curY - initY);
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      // dragRef.current.style.transform = `translate(${ lastPos[0] }px, ${ lastPos[1] }px)`;
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
