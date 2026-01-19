import React, { useEffect } from 'react';
import { SelectedItem, FlowNode, FlowEdge } from '../types';
import GraphNode from './GraphNode';
import GraphEdge from './GraphEdge';
import ZoomControls from './ZoomControls';
import { useZoom } from '../hooks/useZoom';

interface FlowchartProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  onSelect: (item: SelectedItem) => void;
  selectedItem: SelectedItem | null;
  onZoomToNode?: (node: FlowNode) => void;
  visitedNodes?: string[];
  visitedEdges?: string[];
  currentNodeId?: string | null;
  zoomArea?: { x: number; y: number; width: number; height: number } | null;
}

const Flowchart: React.FC<FlowchartProps> = ({
  nodes,
  edges,
  onSelect,
  selectedItem,
  visitedNodes = [],
  visitedEdges = [],
  currentNodeId = null,
  zoomArea = null
}) => {
  const {
    viewBox,
    zoomLevel,
    zoomIn,
    zoomOut,
    zoomToNode,
    zoomToArea,
    resetZoom,
    handleWheel,
  } = useZoom();

  // Handle auto-zoom from props
  useEffect(() => {
    if (zoomArea) {
      zoomToArea(zoomArea);
    }
  }, [zoomArea, zoomToArea]);

  const handleNodeClick = (node: FlowNode) => {
    onSelect({ type: 'node', data: node });
    zoomToNode(node);
  };

  const viewBoxString = `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden p-4 bg-[#0a0a0a] relative">
      {/* SVG Flowchart */}
      <svg
        viewBox={viewBoxString}
        className="w-full h-full max-w-[1200px] max-h-[1200px]"
        preserveAspectRatio="xMidYMin meet"
        onWheel={handleWheel}
        style={{ cursor: zoomLevel > 0 ? 'grab' : 'default' }}
      >
        <defs>
          <marker
            id="arrowhead-normal"
            markerWidth="12"
            markerHeight="8"
            refX="10"
            refY="4"
            orient="auto"
          >
            <polygon points="0 0, 12 4, 0 8" fill="#33ff00" />
          </marker>
          <marker
            id="arrowhead-selected"
            markerWidth="12"
            markerHeight="8"
            refX="10"
            refY="4"
            orient="auto"
          >
            <polygon points="0 0, 12 4, 0 8" fill="#ffb000" />
          </marker>
        </defs>

        {/* 1. Edges Paths Layer */}
        {edges.map(edge => {
          const from = nodes.find(n => n.id === edge.from);
          const to = nodes.find(n => n.id === edge.to);
          if (!from || !to) return null;
          const isSelected = selectedItem?.type === 'edge' && selectedItem.data.id === edge.id;
          const isVisited = visitedEdges.includes(edge.id);
          return (
            <GraphEdge
              key={`path-${edge.id}`}
              edge={edge}
              fromNode={from}
              toNode={to}
              onClick={(e) => onSelect({ type: 'edge', data: e })}
              isSelected={isSelected}
              isVisited={isVisited}
              renderPart="path"
            />
          );
        })}

        {/* 2. Nodes Layer */}
        {nodes.map(node => {
          const isSelected = selectedItem?.type === 'node' && selectedItem.data.id === node.id;
          const isVisited = visitedNodes.includes(node.id);
          const isCurrent = currentNodeId === node.id;
          return (
            <GraphNode
              key={node.id}
              node={node}
              onClick={handleNodeClick}
              isSelected={isSelected || isCurrent}
              isVisited={isVisited && !isCurrent}
            />
          );
        })}

        {/* 3. Edges Labels Layer (On top of everything) */}
        {edges.map(edge => {
          const from = nodes.find(n => n.id === edge.from);
          const to = nodes.find(n => n.id === edge.to);
          if (!from || !to) return null;
          const isSelected = selectedItem?.type === 'edge' && selectedItem.data.id === edge.id;
          const isVisited = visitedEdges.includes(edge.id);
          return (
            <GraphEdge
              key={`label-${edge.id}`}
              edge={edge}
              fromNode={from}
              toNode={to}
              onClick={(e) => onSelect({ type: 'edge', data: e })}
              isSelected={isSelected}
              isVisited={isVisited}
              renderPart="label"
            />
          );
        })}
      </svg>

      {/* Zoom Controls */}
      <ZoomControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={resetZoom}
        zoomLevel={zoomLevel}
        maxLevel={4}
      />
    </div>
  );
};

export default Flowchart;
