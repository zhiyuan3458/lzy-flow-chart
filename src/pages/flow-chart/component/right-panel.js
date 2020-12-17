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
  const [transformOrigin, setTransformOrigin] = useState({ x: 0, y: 0 });
  const { martix, nodes, edges, moveEdges,
    guideLines, dropNode, dragLine,
    onCanvasMouseUp, addEdge, onMoveNode,
    clickNode, chooseEdge, canDragCanvas,
    onCanvasMove,
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
      onCanvasMove({ x: disX, y: disY }, e);
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
    const { top: rightPanelTop, left: rightPanelLeft } = smallRectRef.current.getBoundingClientRect();
    const x = e.clientX - rightPanelLeft;
    const y = e.clientY - rightPanelTop - arrowHei;
    props.onMouseMoveInRight({ x, y });
  };

  const onMouseUp = e => {
    onCanvasMouseUp(e);
  };

  /* 鼠标滚轮触发缩放 */
  const onWheel = e => {
    e.preventDefault();
    e.stopPropagation();
    const initMouX = e.clientX;
    const initMouY = e.clientY;
    const smallRectWidth = smallRectRef.current.offsetWidth;
    const smallRectHeight = smallRectRef.current.offsetHeight;
    const smallRectTop = smallRectRef.current.offsetTop;
    const smallRectLeft = smallRectRef.current.offsetLeft;
    const disX = initMouX - smallRectLeft;
    const disY = initMouY - smallRectTop;
      const xPercent = disX * 100 / smallRectWidth;
      const yPercent = disY * 100 / smallRectHeight;
    const wheelDelta = e?.nativeEvent?.wheelDelta;
    if (wheelDelta) {
      setTimes(times => wheelDelta > 0 ? times + 0.1 : times - 0.1);
      setTransformOrigin({ x: xPercent, y: yPercent });
    }
  };

  const rightPanelWid = rightPanel?.current?.offsetWidth;
  const rightPanelHei = rightPanel?.current?.offsetHeight;

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
        id="SMALLRECT"
        ref={ smallRectRef }
        className={ Styles.smallReact }
        style={{
          transformOrigin: `${ transformOrigin.x }% ${ transformOrigin.y }%`
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
      </div>
      <svg
        style={{
          width: rightPanelWid,
          height: rightPanelHei
        }}
        className={ Styles.canvas }
        xmlns="http://www.w3.org/2000/svg" version="1.1"
      >
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
  );
}

export default RightPanel;
