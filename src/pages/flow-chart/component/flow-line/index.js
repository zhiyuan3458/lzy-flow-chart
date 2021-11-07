import React from 'react';
import { computeAbs } from '@/pages/flow-chart/utils';
import Styles from '@/pages/flow-chart/index.less';

function FlowLine (props) {
  const { edge, martix, chooseEdge } = props;
  if (!edge.gPath || !`${ edge.gPath.x1 }`) return null;
  const { x1, y1, x2, y2 } = edge.gPath;

  const abs = computeAbs(y1, y2);

  /* 点击连线触发 */
  const onClickEdge = (edge, e) => {
    e.stopPropagation();
    e.preventDefault();
    chooseEdge(edge, e);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className={ Styles.flowLineCont }
      style={{
        width: edge.w,
        height: edge.h,
        transform: `translate(${ edge.l }px, ${ edge.t }px)`
      }}
    >
      <g className={ martix.id === edge.id ? `${ Styles.flowLine } ${ Styles.clicked }` : `${ Styles.flowLine }` } onClick={ e => onClickEdge(edge, e) }>
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
    </svg>
  );
}

export default FlowLine;
