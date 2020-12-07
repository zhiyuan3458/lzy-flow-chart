import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Styles from '../index.less';
import { dragGrp } from '@/pages/flow-chart/mock';
import { getUUID } from '@/pages/flow-chart/utils';
import { DRAG_DOM_ID } from '../utils';

function LeftPanel (props) {
  const [isExpand, setIsExpand] = useState(false);
  const leftPanel = useRef(null);
  let dragDOM = null;

  const createDrag = (e) => {
    dragDOM = e.target.cloneNode(true);
    dragDOM.className = e.target.className;
    dragDOM.style.opacity = 0.6;
    dragDOM.style.position = 'fixed';
    dragDOM.style.filter = 'alpha(opacity=60)';
    dragDOM.style.left = e.target.offsetLeft + 'px';
    dragDOM.style.top = e.target.offsetTop + 'px';
    document.body.appendChild(dragDOM);
  };

  /* 开始拖拽时 */
  const onMouseDown = (e, node) => {
    e.preventDefault();

    setIsExpand(false);
    let flag = false;
    // createDrag(e);
    const leftPanelTop = leftPanel.current.offsetTop;
    // const leftPanelWidth = leftPanel.current.offsetWidth;
    const tempX = e.clientX - e.target.offsetLeft;
    const tempY = e.clientY - e.target.offsetTop;
    const width = e.target.offsetWidth;
    const height = e.target.offsetHeight;

    function isInRight (e) {
      const left = e.clientX - tempX;
      const top = e.clientY - tempY - leftPanelTop;
      return left > 0 && top > 0;
    }

    const move = e => {
      const curX = e.clientX;
      const curY = e.clientY;
      const x = curX -tempX;
      const y = curY - tempY;
      // dragDOM.style.left = `${ x }px`;
      // dragDOM.style.top = `${ y }px`;
      // dragDOM.style.borderColor = isInRight(e) ? 'green' : 'red';
      const _node = { ...node, id: DRAG_DOM_ID, x, y, r: x + width, b: y + height, width, height };
      props.moveFromLeft(_node, dragDOM);
    };

    const mouseup = e => {
      e.preventDefault();
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', mouseup);
      // if (dragDOM && !flag) {
      //   document.body.removeChild(dragDOM);
      //   dragDOM = null;
      // }
      if (!isInRight(e)) {
        return false;
      }
      const x = e.clientX - tempX;
      const y = e.clientY - tempY - leftPanelTop;
      const r = x + width;
      const b = y + height;
      const _node = { ...node, id: getUUID(), x, y, r, b, width, height };
      props.dropNode(_node);
    };

    setTimeout(() => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', mouseup);
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', mouseup);
    }, 20);
  };

  const onmouseenter = e => {
    e.stopPropagation();
    e.preventDefault();
    setIsExpand(true);
  };

  const onmouseleave = e => {
    e.stopPropagation();
    e.preventDefault();
    setIsExpand(false);
  };

  return (
    <div
      ref={ leftPanel }
      className={ Styles.leftPanel }
      style={{ width: isExpand ? 300 : 0 }}
      onMouseEnter={ onmouseenter }
      onMouseLeave={ onmouseleave }
    >
      <div className={ Styles.wrapper }>
        {
          dragGrp.map(item => (
            <div
              className={ Styles.rect }
              key={ item.id }
              onMouseDown={ e => onMouseDown(e, item) }
            >
              { item.name }
            </div>
          ))
        }
      </div>
      <div className={ Styles.arrow }></div>
    </div>
  );
}

export default LeftPanel;
