import React from 'react';
import { computeAbs } from '@/pages/flow-chart/utils';
import Styles from '@/pages/flow-chart/index.less';

function MoveLine (props) {
  const { edge } = props;
  const { x: x1, y: y1 } = edge.fromPos;
  const { x: x2, y: y2 } = edge.toPos;
  const abs = computeAbs(y1, y2);

  return (
    <g>
      <path
        d={ `M ${ x1 },${ y1 } C ${ x1 },${ y1 + abs } ${ x2 },${ y2 - abs } ${ x2 },${ y2 }` }
        fill="none"
        stroke="#567bff"
        opacity="0.3"
        strokeWidth={ 1 }
      >
      </path>
      <path
        className={ Styles.pathArrow }
        opacity="0.3"
        d={`M ${x2},${y2} l 5 0 l -5 10 l -5 -10 Z`}
      />
    </g>
  );
}

export default MoveLine;
