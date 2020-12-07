export const containerId = 'RIGHT_PANEL';

export const arrowHei = 10;

/* 拖拽的dom的id */
export const DRAG_DOM_ID = 'DRAG-DOM';

/* 拖拽的样式 */
export const DRAG_DOM_STYLE = {
  position: 'absolute',
  opacity: 0.6,
  filter: 'alpha(opacity=60)'
};

export function getUUID () {
  return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(32);
  });
}

/* 解析transform的x,y值 */
export const parseTransForm = (transform) => {
  const regex1 = /0|-?[1-9][0-9]*/g;
  if (typeof transform === 'string') {
    const pos = transform.match(regex1);
    return Array.isArray(pos) ? pos.map(item => Number(item)) : [0, 0];
  } else {
    return [0, 0];
  }
};

/* 计算曲线曲率 */
export function computeAbs(y1, y2) {
  const abs = (Math.abs(y2 - y1) * 9) / 16;
  return abs > 25 ? abs : 25;
}

function fliterRepeatLine (lines, moveNode, { x, y }) {
  let _lines = lines.map(node => {
    if (node.fromPos) {
      switch (node.dire) {
        case 'll': { return { ...node, toPos: { x, y: y + moveNode.height } }; break; }
        case 'tt': { return { ...node, toPos: { x: x + moveNode.width, y } }; break; }
        case 'bb': { return { ...node, toPos: { x: x + moveNode.width, y: y + moveNode.height } }; break; }
        case 'rr': { return { ...node, toPos: { x: x + moveNode.width, y: y + moveNode.height } }; break; }
        case 'lr': { return { ...node, toPos: { x, y: y + moveNode.height } }; break; }
        case 'rl': { return { ...node, toPos: { x: x + moveNode.width, y: y + moveNode.height } }; break; }
        case 'tb': { return { ...node, toPos: { x: x + moveNode.width, y } }; break; }
        case 'bt': { return { ...node, toPos: { x: x + moveNode.width, y: y + moveNode.height } }; break; }
}
    } else {
      switch (node.dire) {
        case 'll': { return { ...node, fromPos: { x, y } }; break; }
        case 'tt': { return { ...node, fromPos: { x, y } }; break; }
        case 'bb': { return { ...node, fromPos: { x, y: y + moveNode.height } }; break; }
        case 'rr': { return { ...node, fromPos: { x: x + moveNode.width, y: y } }; break; }
        case 'lr': { return { ...node, fromPos: { x, y } }; break; }
        case 'rl': { return { ...node, fromPos: { x: x + moveNode.width, y } }; break; }
        case 'tb': { return { ...node, fromPos: { x, y } }; break; }
        case 'bt': { return { ...node, fromPos: { x, y: y + moveNode.height } }; break; }
      }
    }
  });
  _lines = _lines.filter(line => line.toPos.x === line.fromPos.x
                                 || line.toPos.y === line.fromPos.y);
  return _lines;
}

/* 设置辅助线 */
// export function setGuideLine (moveNode = {}, nodes = [], moveDom) {
//   if (Array.isArray(nodes) && nodes.length <= 0 || !moveDom) return [];
//   let newNodes = [];
//   let curMoveNodeX = null;
//   let curMoveNodeY = null;
//   const {
//     x: moveNodeX, y: moveNodeY,
//     r: moveNodeR, b: moveNodeB
//   } = moveNode;
//
//   nodes.forEach(item => {
//     if (Math.abs(moveNodeX - item.x) <= 5) {
//       curMoveNodeX = item.x;
//       const itemY = item.y;
//       if (moveNodeY > itemY) {
//         const fromPos = { x: item.x, y: item.y };
//         newNodes.push({ id: getUUID(), fromPos, dire: 'll' });
//       } else {
//         const toPos = { x: item.x, y: item.b };
//         newNodes.push({ id: getUUID(), toPos, dire: 'll' });
//       }
//     }
//     if (Math.abs(moveNodeY - item.y) <= 5) {
//       curMoveNodeY = item.y;
//       const itemX = item.x;
//       if (moveNodeX > itemX) {
//         const fromPos = { x: item.x, y: item.y };
//         newNodes.push({ id: getUUID(), fromPos, dire: 'tt' });
//       } else {
//         const toPos = { x: item.r, y: item.y };
//         newNodes.push({ id: getUUID(), toPos, dire: 'tt' });
//       }
//     }
//
//     if (Math.abs(moveNodeB - item.b) <= 5) {
//       curMoveNodeY = item.b - moveNode.height;
//       if (moveNodeX > item.x) {
//         const fromPos = { x: item.x, y: item.b };
//         newNodes.push({ id: getUUID(), fromPos, dire: 'bb' });
//       } else {
//         const toPos = { x: item.r, y: item.b };
//         newNodes.push({ id: getUUID(), toPos, dire: 'bb' });
//       }
//     }
//
//     if (Math.abs(moveNodeR - item.r) <= 5) {
//       curMoveNodeX = item.r - moveNode.width;
//       if (moveNodeY > item.y) {
//         const fromPos = { x: item.r, y: item.y };
//         newNodes.push({ id: getUUID(), fromPos, dire: 'rr' });
//       } else {
//         const toPos = { x: item.r, y: item.b };
//         newNodes.push({ id: getUUID(), toPos, dire: 'rr' });
//       }
//     }
//
//     if (Math.abs(moveNodeX - item.r) <= 5) {
//       curMoveNodeX = item.r;
//       if (moveNodeY > item.y) {
//         const fromPos = { x: item.r, y: item.y };
//         newNodes.push({ id: getUUID(), fromPos, dire: 'lr' });
//       } else {
//         const toPos = { x: item.r, y: item.b };
//         newNodes.push({ id: getUUID(), toPos, dire: 'lr' });
//       }
//     }
//
//     if (Math.abs(moveNodeR - item.x) <= 5) {
//       curMoveNodeX = item.x - moveNode.width;
//       if (moveNodeY > item.y) {
//         const fromPos = { x: item.x, y: item.y };
//         newNodes.push({ id: getUUID(), fromPos, dire: 'rl' });
//       } else {
//         const toPos = { x: item.x, y: item.b };
//         newNodes.push({ id: getUUID(), toPos, dire: 'rl' });
//       }
//     }
//
//     if (Math.abs(moveNodeY - item.b) <= 5) {
//       curMoveNodeY = item.b;
//       if (moveNodeX > item.x) {
//         const fromPos = { x: item.x, y: item.b };
//         newNodes.push({ id: getUUID(), fromPos, dire: 'tb' });
//       } else {
//         const toPos = { x: item.r, y: item.b };
//         newNodes.push({ id: getUUID(), toPos, dire: 'tb' });
//       }
//     }
//
//     if (Math.abs(moveNodeB - item.y) <= 5) {
//       curMoveNodeY = item.y - moveNode.height;
//       if (moveNodeX > item.x) {
//         const fromPos = { x: item.x, y: item.y };
//         newNodes.push({ id: getUUID(), fromPos, dire: 'bt' });
//       } else {
//         const toPos = { x: item.r, y: item.y };
//         newNodes.push({ id: getUUID(), toPos, dire: 'bt' });
//       }
//     }
//   });
//
//   const x = curMoveNodeX ? curMoveNodeX : moveNodeX;
//   const y = curMoveNodeY ? curMoveNodeY : moveNodeY;
//   newNodes = fliterRepeatLine(newNodes, moveNode, { x, y });
//
//   moveDom.style.transform = `translate(${ x }px, ${ y }px)`;
//   return newNodes;
// }

/* 设置辅助线 */
export function setGuideLine (moveNode = {}, nodes = []) {
  if (Array.isArray(nodes) && nodes.length <= 0) return [];
  let guideLines = [];
  let curMoveNodeX = null;
  let curMoveNodeY = null;
  const {
    x: moveNodeX, y: moveNodeY,
    r: moveNodeR, b: moveNodeB
  } = moveNode;

  const _node = nodes.filter(node => node.id !== moveNode.id);

  _node.forEach(item => {
    if (Math.abs(moveNodeX - item.x) <= 5) {
      curMoveNodeX = item.x;
      const itemY = item.y;
      if (moveNodeY > itemY) {
        const fromPos = { x: item.x, y: item.y };
        guideLines.push({ id: getUUID(), fromPos, dire: 'll' });
      } else {
        const toPos = { x: item.x, y: item.b };
        guideLines.push({ id: getUUID(), toPos, dire: 'll' });
      }
    }
    if (Math.abs(moveNodeY - item.y) <= 5) {
      curMoveNodeY = item.y;
      const itemX = item.x;
      if (moveNodeX > itemX) {
        const fromPos = { x: item.x, y: item.y };
        guideLines.push({ id: getUUID(), fromPos, dire: 'tt' });
      } else {
        const toPos = { x: item.r, y: item.y };
        guideLines.push({ id: getUUID(), toPos, dire: 'tt' });
      }
    }

    if (Math.abs(moveNodeB - item.b) <= 5) {
      curMoveNodeY = item.b - moveNode.height;
      if (moveNodeX > item.x) {
        const fromPos = { x: item.x, y: item.b };
        guideLines.push({ id: getUUID(), fromPos, dire: 'bb' });
      } else {
        const toPos = { x: item.r, y: item.b };
        guideLines.push({ id: getUUID(), toPos, dire: 'bb' });
      }
    }

    if (Math.abs(moveNodeR - item.r) <= 5) {
      curMoveNodeX = item.r - moveNode.width;
      if (moveNodeY > item.y) {
        const fromPos = { x: item.r, y: item.y };
        guideLines.push({ id: getUUID(), fromPos, dire: 'rr' });
      } else {
        const toPos = { x: item.r, y: item.b };
        guideLines.push({ id: getUUID(), toPos, dire: 'rr' });
      }
    }

    if (Math.abs(moveNodeX - item.r) <= 5) {
      curMoveNodeX = item.r;
      if (moveNodeY > item.y) {
        const fromPos = { x: item.r, y: item.y };
        guideLines.push({ id: getUUID(), fromPos, dire: 'lr' });
      } else {
        const toPos = { x: item.r, y: item.b };
        guideLines.push({ id: getUUID(), toPos, dire: 'lr' });
      }
    }

    if (Math.abs(moveNodeR - item.x) <= 5) {
      curMoveNodeX = item.x - moveNode.width;
      if (moveNodeY > item.y) {
        const fromPos = { x: item.x, y: item.y };
        guideLines.push({ id: getUUID(), fromPos, dire: 'rl' });
      } else {
        const toPos = { x: item.x, y: item.b };
        guideLines.push({ id: getUUID(), toPos, dire: 'rl' });
      }
    }

    if (Math.abs(moveNodeY - item.b) <= 5) {
      curMoveNodeY = item.b;
      if (moveNodeX > item.x) {
        const fromPos = { x: item.x, y: item.b };
        guideLines.push({ id: getUUID(), fromPos, dire: 'tb' });
      } else {
        const toPos = { x: item.r, y: item.b };
        guideLines.push({ id: getUUID(), toPos, dire: 'tb' });
      }
    }

    if (Math.abs(moveNodeB - item.y) <= 5) {
      curMoveNodeY = item.y - moveNode.height;
      if (moveNodeX > item.x) {
        const fromPos = { x: item.x, y: item.y };
        guideLines.push({ id: getUUID(), fromPos, dire: 'bt' });
      } else {
        const toPos = { x: item.r, y: item.y };
        guideLines.push({ id: getUUID(), toPos, dire: 'bt' });
      }
    }
  });

  const x = curMoveNodeX ? curMoveNodeX : moveNodeX;
  const y = curMoveNodeY ? curMoveNodeY : moveNodeY;
  const r = x + moveNode.width;
  const b = y + moveNode.height;
  guideLines = fliterRepeatLine(guideLines, moveNode, { x, y });
  const newNodes = nodes.map(item => item.id === moveNode.id ? { ...item, x, y, b, r } : item);
  const newNode = { ...moveNode, x, y, r, b };

  return { newNodes, guideLines, newNode };
}
