import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const { nodes, edges, moveEdges, guideLines, dropNode, dragLine, onCanvasMouseUp, addEdge, onMoveNode } = props;

  const onMouseMove = e => {
    const { top: rightPanelTop, left: rightPanelLeft } = rightPanel.current.getBoundingClientRect();
    const x = e.clientX - rightPanelLeft;
    const y = e.clientY - rightPanelTop - arrowHei;
    props.onMouseMoveInRight({ x, y });
  };

  const onMouseUp = e => {
    onCanvasMouseUp(e);
  };

  return (
    <div
      ref={ rightPanel }
      id={ containerId }
      className={ Styles.rightPanel  }
      onMouseMove={ onMouseMove }
      onMouseUp={ onMouseUp }
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
              node={ node }
              dragLine={ dragLine }
              addEdge={ addEdge }
            />
          </DraggableNode>
        ))
      }
      <svg className={ Styles.canvas } xmlns="http://www.w3.org/2000/svg" version="1.1">
        {
          edges.map(edge => (
            <FlowLine
              key={ edge.id }
              edge={ edge }
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
