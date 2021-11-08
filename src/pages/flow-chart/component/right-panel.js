import React, { useEffect, useRef, useState } from 'react';
import DraggableNode from '@/pages/flow-chart/component/draggable-node';
import Node from '@/pages/flow-chart/component/node';
import Styles from '../index.less';
import { containerId, flowLineCont, arrowHei, relativeRect } from '@/pages/flow-chart/utils';
import FlowLine from '@/pages/flow-chart/component/flow-line';
import MoveLine from '@/pages/flow-chart/component/move-line';
import GuideLine from './guide-line';
import relativeRectInstance from '@/pages/flow-chart/class/RelativeRect';

function RightPanel (props) {
  const rightPanel = useRef(null);
  const { martix, nodes, edges, moveEdges,
    guideLines, dropNode, dragLine,
    onCanvasMouseUp, addEdge, onMoveNode,
    clickNode, chooseEdge
  } = props;

  const [rPanelWH, setRPanelWH] = useState({ w: 0, h: 0 });

  useEffect(() => {
    setRPanelWH({ w: rightPanel.current.offsetWidth, h: rightPanel.current.offsetHeight });
  }, []);

  const onMouseDown = e => {
    e.target.style.cursor = 'grabbing';
    const startX = e.clientX;
    const startY = e.clientY;
    const prevX = relativeRectInstance.l;
    const prevY = relativeRectInstance.t;

    document.onmousemove = e => {
      const curX = e.clientX;
      const curY = e.clientY;
      const disX = curX - startX + prevX;
      const disY = curY - startY + prevY;
      relativeRectInstance.setTransform(disX, disY);
    };

    document.onmouseup = e => {
      e.target.style.cursor = 'auto';
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  const onMouseMove = e => {
    const { top: rightPanelTop, left: rightPanelLeft } = rightPanel.current.getBoundingClientRect();
    const x = e.clientX - rightPanelLeft - relativeRectInstance.l;
    const y = e.clientY - rightPanelTop - arrowHei - relativeRectInstance.t;
    props.onMouseMoveInRight({ x, y });
  };

  const onMouseUp = e => {
    onCanvasMouseUp(e);
  };

  return (
    <div
      ref={ rightPanel }
      id={ containerId }
      className={ Styles.rightPanel }
      onMouseDown={ onMouseDown }
      onMouseMove={ onMouseMove }
      onMouseUp={ onMouseUp }
    >
      <div
        id={ relativeRect }
        className={ Styles.relativeRect }
      >
        {
          nodes.map(node => (
            <DraggableNode
              container={ rightPanel.current }
              key={ node.id }
              node={ node }
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
          className={ Styles.canvas }
          style={{ width: rPanelWH.w, height: rPanelWH.h }}
          xmlns="http://www.w3.org/2000/svg" version="1.1"
      >
        <g id={ flowLineCont }>
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
        </g>
      </svg>
    </div>
  );
}

export default RightPanel;
