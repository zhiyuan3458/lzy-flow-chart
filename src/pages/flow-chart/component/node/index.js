import React, { useRef } from 'react';
import Styles from '@/pages/flow-chart/index.less';
import { getUUID } from '@/pages/flow-chart/utils';
import { arrowHei } from '../../utils';

function Node (props) {
  const nodeRef = useRef(null);
  const { node } = props;

  const onMouseDown = (e, node) => {
    e.preventDefault();
    e.stopPropagation();
    const initX = node.x + e.target.offsetLeft + 1;
    const initY = node.y + e.target.offsetTop + 1;
    const line = {
      id: getUUID(),
      fromNodeId: node.id,
      nodeName: node.name,
      fromPos: {
        x: initX,
        y: initY
      },
      toPos: {
        x: initX,
        y: initY
      }
    };
    props.dragLine(line);
  };

  const onMouseUp = (e, node) => {
    const toPos = {
      x: node.x + Math.floor(node.width / 2),
      y: node.y - arrowHei
    };
    props.addEdge({ toPos, toNodeId: node.id }, e);
  };

  return (
    <div
      ref={ nodeRef }
      id={ node.id }
      className={ `${ Styles.rect } ${ Styles.rightRect }` }
      style={ node.style }
      onMouseUp={ e => onMouseUp(e, node) }
    >
      <span
        className={ `${ Styles.point } ${ Styles.upPoint }` }
        onMouseDown={ (e) => e.stopPropagation() }
      >
      </span>
      { node.name }
      <span
        className={ `${ Styles.point } ${ Styles.downPoint }` }
        onMouseDown={ (e) => onMouseDown(e, node) }
      >
      </span>
    </div>
  );
}

export default Node;
