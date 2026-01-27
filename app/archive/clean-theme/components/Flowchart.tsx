import React, { useEffect, useRef } from 'react';
import { SelectedItem, FlowNode, FlowEdge } from '../types';
import GraphNode from './GraphNode';
import type { NodeHighlightType } from './GraphNode';
import GraphEdge from './GraphEdge';
import ZoomControls from './ZoomControls';
import { useZoom } from '../hooks/useZoom';
import type { VisibilityState } from '../hooks/useProgressiveReveal';
import { useTheme } from '../context/ThemeContext';

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
  nodeVisibility?: Record<string, VisibilityState>;
  edgeVisibility?: Record<string, VisibilityState>;
  startNodeId?: string | null; // Auto-zoom to this node on load
  nodeHighlights?: Record<string, NodeHighlightType>; // Highlight states for nodes
}

const Flowchart: React.FC<FlowchartProps> = ({
  nodes,
  edges,
  onSelect,
  selectedItem,
  visitedNodes = [],
  visitedEdges = [],
  currentNodeId = null,
  zoomArea = null,
  nodeVisibility,
  edgeVisibility,
  startNodeId = null,
  nodeHighlights = {},
}) => {
  const { theme } = useTheme();
  const isCleanTheme = theme === 'clean';

  const {
    viewBox,
    zoomLevel,
    zoomIn,
    zoomOut,
    zoomToNode,
    zoomToArea,
    resetZoom,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    isPanning,
  } = useZoom(isCleanTheme);

  // Handle auto-zoom from props
  useEffect(() => {
    if (zoomArea) {
      zoomToArea(zoomArea);
    }
  }, [zoomArea, zoomToArea]);

  // Track if we've auto-zoomed to prevent re-triggering on nodes array changes
  const hasAutoZoomedRef = useRef<string | null>(null);

  // Auto-zoom to start node when entering progressive reveal mode (only once per startNodeId)
  useEffect(() => {
    if (startNodeId && hasAutoZoomedRef.current !== startNodeId) {
      const startNode = nodes.find(n => n.id === startNodeId);
      if (startNode) {
        hasAutoZoomedRef.current = startNodeId;
        // Small delay to ensure component is mounted and visible
        const timer = setTimeout(() => {
          zoomToNode(startNode);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [startNodeId, nodes, zoomToNode]);

  const handleNodeClick = (node: FlowNode) => {
    onSelect({ type: 'node', data: node });
    zoomToNode(node);
  };

  const viewBoxString = `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;

  return (
    <div className={`w-full h-full flex items-center justify-center overflow-hidden p-4 relative ${isCleanTheme ? 'bg-[#FAFAF8]' : 'bg-[#0a0a0a]'
      }`}>
      {/* SVG Flowchart */}
      <svg
        viewBox={viewBoxString}
        className="w-full h-full max-w-[1200px] max-h-[1200px]"
        preserveAspectRatio="xMidYMid meet"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isPanning ? 'grabbing' : (zoomLevel > 0 ? 'grab' : 'default') }}
      >
        <defs>
          {/* Pip-Boy Mode Arrows */}
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

          {/* Clean Mode Arrows */}
          <marker
            id="arrowhead-clean"
            markerWidth="12"
            markerHeight="8"
            refX="10"
            refY="4"
            orient="auto"
          >
            <polygon points="0 0, 12 4, 0 8" fill="#2D3748" />
          </marker>
          <marker
            id="arrowhead-clean-selected"
            markerWidth="12"
            markerHeight="8"
            refX="10"
            refY="4"
            orient="auto"
          >
            <polygon points="0 0, 12 4, 0 8" fill="#F59E0B" />
          </marker>
        </defs>

        {/* 1. Edges Paths Layer */}
        {edges.map(edge => {
          const from = nodes.find(n => n.id === edge.from);
          const to = nodes.find(n => n.id === edge.to);
          if (!from || !to) return null;
          const isSelected = selectedItem?.type === 'edge' && selectedItem.data.id === edge.id;
          const isVisited = visitedEdges.includes(edge.id);
          const visibility = edgeVisibility?.[edge.id] || 'revealed';
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
              visibilityState={visibility}
            />
          );
        })}

        {/* 2. Nodes Layer */}
        {nodes.map(node => {
          const isSelected = selectedItem?.type === 'node' && selectedItem.data.id === node.id;
          const isVisited = visitedNodes.includes(node.id);
          const isCurrent = currentNodeId === node.id;
          const visibility = nodeVisibility?.[node.id] || 'revealed';
          const highlight = nodeHighlights[node.id] || null;
          return (
            <GraphNode
              key={node.id}
              node={node}
              onClick={handleNodeClick}
              isSelected={isSelected || isCurrent}
              isVisited={isVisited && !isCurrent}
              visibilityState={visibility}
              highlightType={highlight}
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
          const visibility = edgeVisibility?.[edge.id] || 'revealed';
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
              visibilityState={visibility}
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
