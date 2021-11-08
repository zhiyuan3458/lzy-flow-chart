import React from 'react';
import { computeAbs } from '@/pages/flow-chart/utils';
import Styles from '@/pages/flow-chart/index.less';

function FlowLine (props) {
  const { edge, martix, chooseEdge } = props;
  const { fromPos, toPos } = edge;
  const { x: x1, y: y1 } = fromPos;
  const { x: x2, y: y2 } = toPos;

  const abs = computeAbs(y1, y2);

  /* 点击连线触发 */
  const onClickEdge = (edge, e) => {
    e.stopPropagation();
    e.preventDefault();
    chooseEdge(edge, e);
  };

  return (
    <g
      className={ martix.id === edge.id ? `${ Styles.flowLine } ${ Styles.clicked }` : `${ Styles.flowLine }` }
      onClick={ e => onClickEdge(edge, e) }
    >
      <path
        d={ `M ${ x1 },${ y1 } C ${ x1 },${ y1 + abs } ${ x2 },${ y2 - abs } ${ x2 },${ y2 }` }
        fill="none"
      >
      </path>
      <path
        className={ Styles.pathArrow }
        d={`M ${x2},${y2} l 5 0 l -5 10 l -5 -10 Z`}
      />
    </g>
  );
}

export default FlowLine;
