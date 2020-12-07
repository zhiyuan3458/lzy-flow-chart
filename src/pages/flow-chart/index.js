import React, { useRef, useState } from 'react';
import LeftPanel from './component/left-panel';
import RightPanel from './component/right-panel';
import Styles from './index.less';
import { getUUID } from '@/pages/flow-chart/utils';
import { arrowHei, DRAG_DOM_ID, setGuideLine, DRAG_DOM_STYLE } from './utils';

function initMartix () {
  return {
    nodeId: ''
  };
}

function FlowChart () {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [moveEdges, setMoveEdges] = useState([]);
  const [guideLines, setGuideLines] = useState([]);
  const [curMove, setCurMove] = useState(null);
  const [martix, setMartix] = useState(initMartix());
  const latestEdges = useRef({});
  const latestNodes = useRef({});
  latestEdges.current = edges;
  latestNodes.current = nodes;

  /* 从左边栏拖拽出一个节点进行添加 */
  const addNode = (node) => {
    // const guideLines = setGuideLine(node, latestNodes.current, dragDOM);
    setNodes(nodes => {
      const dragVNode = nodes.find(item => item.id === DRAG_DOM_ID);
      if (dragVNode) {
        const { x, y, b, r } = dragVNode;
        node = { ...node, x, y, b, r };
      }
      return [...nodes, node].filter(item => item.id !== DRAG_DOM_ID);
    });
    setGuideLines([]);
  };

  /* 从左边栏拉出一个box（鼠标还没释放）,一直拖动中 */
  const moveFromLeft = (node) => {
    // const guideLines = setGuideLine(node, latestNodes.current, dragDOM);
    // setGuideLines(guideLines);
    const nodes = latestNodes.current;
    const dragVNode = { ...node, id: DRAG_DOM_ID, style: DRAG_DOM_STYLE };
    if (nodes.find(item => item.id === dragVNode.id)) {
      setNodes(nodes => nodes.map(item => item.id === dragVNode.id ? dragVNode : item));
    } else {
      setNodes(nodes => [...nodes, dragVNode]);
    }
    const { newNodes, guideLines } = setGuideLine(dragVNode, latestNodes.current);
    setNodes(newNodes);
    setGuideLines(guideLines);
  };

  /* 在右边编辑器中，拖动节点之后，释放鼠标后触发 */
  const dropNode = (node, e) => {
    setMoveEdges([]);
    const nodes = latestNodes.current;
    const edges = latestEdges.current;
    let dragVNode = nodes.find(item => item.id === DRAG_DOM_ID);
    const edgesTemp = edges.map(item => {
      if (item.fromNodeId === node.id) {
        return {
          ...item,
          id: getUUID(),
          fromPos: { x: dragVNode.x + Math.floor(dragVNode.width / 2), y: dragVNode.y + dragVNode.height }
        };
      } else if (item.toNodeId === node.id) {
        return {
          ...item,
          id: getUUID(),
          toPos: { x: dragVNode.x + Math.floor(dragVNode.width / 2), y: dragVNode.y - arrowHei }
        };
      } else {
        return item;
      }
    });
    setEdges(edgesTemp);
    setNodes(nodes => {
      const { x, y, b, r } = dragVNode;
      node = { ...node, x, y, b, r };
      return nodes.filter(item => item.id !== DRAG_DOM_ID).map(item => item.id === node.id ? node : item)
    });
    setGuideLines([]);
  };

  /* 拖拽节点的线（相当于出发了某个节点的下面的端点的onmousedown事件） */
  const dragLine = (edge) => {
    setCurMove(edge);
    setEdges(edges => [...edges, edge]);
    setMartix({ nodeId: edge.fromNodeId });
  };

  /* 在右侧编辑器移动节点的时候，调整正在移动节点的线的位置 */
  const onMouseMoveInRight = ({ x, y }) => {
    if (!curMove || !martix.nodeId) return false;
    setEdges(edges => edges.map(edge => edge.id === curMove.id ? { ...edge, toPos: { x, y } } : edge));
  };

  /* 在右侧编辑器移动节点之后释放鼠标按键触发 */
  const onCanvasMouseUp = e => {
    setEdges(edges.filter(item => !!item.toNodeId));
    setMartix(initMartix());
    setGuideLines([]);
  };

  /* 连接两个节点后触发 */
  const addEdge = ({ toPos, toNodeId }, e) => {
    e.preventDefault();
    e.stopPropagation();
    const edgesTemp = edges.filter(edge => toNodeId && edge.fromNodeId !== toNodeId).map(edge => {
      if (!edge.toNodeId) {
        return { ...edge, toPos, toNodeId };
      }
      return edge;
    });
    setEdges(edgesTemp);
    setMartix(initMartix());
  };

  /* 移动节点时触发 */
  const onMoveNode = (node) => {
    const nodes = latestNodes.current;
    const edges = latestEdges.current;
    let dragVNode = { ...node, id: DRAG_DOM_ID, style: DRAG_DOM_STYLE };

    if (nodes.find(item => item.id === dragVNode.id)) {
      setNodes(nodes => nodes.map(item => item.id === dragVNode.id ? dragVNode : item));
    } else {
      setNodes(nodes => [...nodes, dragVNode]);
    }
    const { newNodes, guideLines, newNode } = setGuideLine(dragVNode, latestNodes.current);
    setNodes(newNodes);
    setGuideLines(guideLines);
    let relateEdges = edges.filter(item => item.toNodeId === node.id || item.fromNodeId === node.id);
    relateEdges = relateEdges.map(item => item.fromNodeId === node.id ? ({
        ...item,
        id: getUUID(),
        fromPos: { x: newNode.x + Math.floor(newNode.width / 2), y: newNode.y + newNode.height }
      })
      :
      ({
        ...item,
        id: getUUID(),
        toPos: { x: newNode.x + Math.floor(newNode.width / 2), y: newNode.y - arrowHei }
      })
    );
    setMoveEdges(relateEdges);
  };

  return (
    <div className={ Styles.flowChart }>
      <LeftPanel
        dropNode={ addNode }
        moveFromLeft={ moveFromLeft }
      />
      <RightPanel
        nodes={ nodes }
        edges={ edges }
        moveEdges={ moveEdges }
        guideLines={ guideLines }
        dropNode={ dropNode }
        dragLine={ dragLine }
        onMouseMoveInRight={ onMouseMoveInRight }
        onCanvasMouseUp={ onCanvasMouseUp }
        addEdge={ addEdge }
        onMoveNode={ onMoveNode }
      />
    </div>
  );
}

export default FlowChart;
