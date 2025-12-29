import React from 'react';
import { NODES, EDGES } from '../constants';
import { SelectedItem, FlowNode } from '../types';
import GraphNode from './GraphNode';
import GraphEdge from './GraphEdge';
import ZoomControls from './ZoomControls';
import { useZoom } from '../hooks/useZoom';

interface FlowchartProps {
  onSelect: (item: SelectedItem) => void;
  selectedItem: SelectedItem | null;
  onZoomToNode?: (node: FlowNode) => void;
}

const Flowchart: React.FC<FlowchartProps> = ({ onSelect, selectedItem }) => {
  const {
    viewBox,
    zoomLevel,
    zoomIn,
    zoomOut,
    zoomToNode,
    resetZoom,
    handleWheel,
  } = useZoom();

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
        {EDGES.map(edge => {
          const from = NODES.find(n => n.id === edge.from);
          const to = NODES.find(n => n.id === edge.to);
          if (!from || !to) return null;
          const isSelected = selectedItem?.type === 'edge' && selectedItem.data.id === edge.id;
          return (
            <GraphEdge
              key={`path-${edge.id}`}
              edge={edge}
              fromNode={from}
              toNode={to}
              onClick={(e) => onSelect({ type: 'edge', data: e })}
              isSelected={isSelected}
              renderPart="path"
            />
          );
        })}

        {/* 2. Nodes Layer */}
        {NODES.map(node => {
          const isSelected = selectedItem?.type === 'node' && selectedItem.data.id === node.id;
          return (
            <GraphNode
              key={node.id}
              node={node}
              onClick={handleNodeClick}
              isSelected={isSelected}
            />
          );
        })}

        {/* 3. Edges Labels Layer (On top of everything) */}
        {EDGES.map(edge => {
          const from = NODES.find(n => n.id === edge.from);
          const to = NODES.find(n => n.id === edge.to);
          if (!from || !to) return null;
          const isSelected = selectedItem?.type === 'edge' && selectedItem.data.id === edge.id;
          return (
            <GraphEdge
              key={`label-${edge.id}`}
              edge={edge}
              fromNode={from}
              toNode={to}
              onClick={(e) => onSelect({ type: 'edge', data: e })}
              isSelected={isSelected}
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

