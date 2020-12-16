import React, { useRef, useState, useEffect } from 'react';
import DraggableNode from '@/pages/flow-chart/component/draggable-node';
import Node from '@/pages/flow-chart/component/node';
import Styles from '../index.less';
import { containerId } from '@/pages/flow-chart/utils';
import FlowLine from '@/pages/flow-chart/component/flow-line';
import MoveLine from '@/pages/flow-chart/component/move-line';
import { arrowHei } from '../utils';
import GuideLine from './guide-line';

function RightPanel (props) {
  const rightPanel = useRef(null);
  const smallRectRef = useRef(null);
  const [times, setTimes] = useState(1);
  const { martix, nodes, edges, moveEdges,
    guideLines, dropNode, dragLine,
    onCanvasMouseUp, addEdge, onMoveNode,
    clickNode, chooseEdge, canDragCanvas
  } = props;

  useEffect(() => {
    smallRectRef.current.style.transform = `scale(${ times })`;
  }, [times]);

  const onMouseDown = e => {
    if (!canDragCanvas) return false;
    const initX = e.clientX;
    const initY = e.clientY;
    const initLeft = smallRectRef.current.offsetLeft;
    const initTop = smallRectRef.current.offsetTop;

    function _onMouseMove (e) {
      const curX = e.clientX;
      const curY = e.clientY;
      const disX = initLeft + curX - initX;
      const disY = initTop + curY - initY;
      smallRectRef.current.style.left = `${ disX }px`;
      smallRectRef.current.style.top = `${ disY }px`;
    }

    function _onMounseUp (e) {
      document.removeEventListener('mousemove', _onMouseMove);
      document.removeEventListener('mouseup', _onMounseUp);
    }

    setTimeout(() => {
      document.addEventListener('mousemove', _onMouseMove);
      document.addEventListener('mouseup', _onMounseUp);
    });
  };

  const onMouseMove = e => {
    const { top: rightPanelTop, left: rightPanelLeft } = rightPanel.current.getBoundingClientRect();
    const x = e.clientX - rightPanelLeft;
    const y = e.clientY - rightPanelTop - arrowHei;
    props.onMouseMoveInRight({ x, y });
  };

  const onMouseUp = e => {
    onCanvasMouseUp(e);
  };

  const onWheel = e => {
    const wheelDelta = e?.nativeEvent?.wheelDelta;
    if (wheelDelta) {
      setTimes(times => wheelDelta > 0 ? times + 0.1 : times - 0.1);
    }
    // smallRectRef.current.style.zoom = '2';
  };

  /* 鼠标滚动缩放 */
  // const onMouseWheel = e => {
  //   const scaleSize = 0.05;
  //   const initMouX = e.clientX;
  //   const initMouY = e.clientY;
  //   const smallRect = document.getElementById(SMALL_RECT);
  //   const { width: contWid, top: contTop, left: contLeft } = smallRect.getBoundingClientRect();
  //   const disX = initMouX - contLeft;
  //   const disY = initMouY - contTop;
  //   const xPercent = disX * 100 / contWid;
  //   const yPercent = disY * 100 / contWid;
  //   const delta = e?.nativeEvent?.wheelDelta || e?.nativeEvent?.detail;
  //   e.stopPropagation();
  //   if (delta > 0) {
  //     let newSize = Math.floor(this.state.size * 100) / 100 + scaleSize;
  //     if (newSize > 2) {
  //       newSize = 2;
  //       this.setState(state => ({ ...state, size: newSize }));
  //       return false;
  //     }
  //     this.setState(state => ({ ...state, size: newSize }));
  //     this.smallRect.current.style.transform = `scale(${ newSize })`;
  //     this.smallRect.current.style.webkitTransformOrigin = `${ xPercent }% ${ yPercent }%`;
  //   } else {
  //     let newSize = Math.floor(this.state.size * 100) / 100 - scaleSize;
  //     if (newSize <= 0.4) {
  //       newSize = 0.4;
  //       this.setState(state => ({ ...state, size: newSize }));
  //       return false;
  //     }
  //     newSize = newSize.toFixed(2);
  //     this.setState(state => ({ ...state, size: newSize }));
  //     this.smallRect.current.style.transform = `scale(${ newSize })`;
  //     this.smallRect.current.style.webkitTransformOrigin = `${ xPercent }% ${ yPercent }%`;
  //   }
  // };

  return (
    <div
      ref={ rightPanel }
      id={ containerId }
      className={ Styles.rightPanel }
      onMouseDown={ onMouseDown }
      onMouseMove={ onMouseMove }
      onMouseUp={ onMouseUp }
      onWheel={ onWheel }
    >
      <div
        ref={ smallRectRef }
        className={ Styles.smallReact }
        style={{
          transformOrigin: '500% 500%'
        }}
      >
        {
          nodes.map(node => (
            <DraggableNode
              container={ rightPanel.current }
              key={ node.id }
              node={ node }
              canDragCanvas={ canDragCanvas }
              onMoveNode={ onMoveNode }
              dropNode={ dropNode }
            >
              <Node
                martix={ martix }
                node={ node }
                dragLine={ dragLine }
                addEdge={ addEdge }
                clickNode={ clickNode }
              />
            </DraggableNode>
          ))
        }
        <svg className={ Styles.canvas } xmlns="http://www.w3.org/2000/svg" version="1.1">
          {
            edges.map(edge => (
              <FlowLine
                key={ edge.id }
                martix={ martix }
                edge={ edge }
                chooseEdge={ chooseEdge }
              />
            ))
          }
          {
            moveEdges.map(edge => (
              <MoveLine key={ edge.id } edge={ edge } />
            ))
          }
          {
            guideLines.map(edge => (
              <GuideLine key={ edge.id } edge={ edge } />
            ))
          }
        </svg>
      </div>
    </div>
  );
}

export default RightPanel;
