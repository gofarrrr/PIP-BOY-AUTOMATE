import React from 'react';
import { FlowEdge, FlowNode } from '../types';
import type { VisibilityState } from '../hooks/useProgressiveReveal';
import '../themes/editorial.css';

interface GraphEdgeEditorialProps {
  edge: FlowEdge;
  fromNode: FlowNode;
  toNode: FlowNode;
  onClick: (edge: FlowEdge) => void;
  isSelected: boolean;
  isVisited?: boolean;
  renderPart?: 'path' | 'label';
  visibilityState?: VisibilityState;
}

const GraphEdgeEditorial: React.FC<GraphEdgeEditorialProps> = ({
  edge,
  fromNode,
  toNode,
  onClick,
  isSelected,
  isVisited = false,
  renderPart = 'path',
  visibilityState = 'revealed'
}) => {
  const isHidden = visibilityState === 'hidden';
  const isTeaser = visibilityState === 'teaser';

  const GRID_SCALE = 14;

  const startX = fromNode.x * GRID_SCALE;
  const startY = fromNode.y * GRID_SCALE;
  const endX = toNode.x * GRID_SCALE;
  const endY = toNode.y * GRID_SCALE;

  // Calculate path
  let d = '';

  if (edge.controlPoints && edge.controlPoints.length > 0) {
    if (edge.controlPoints.length === 1) {
      const [cp1x, cp1y] = edge.controlPoints[0];
      d = `M ${startX} ${startY} Q ${cp1x * GRID_SCALE} ${cp1y * GRID_SCALE} ${endX} ${endY}`;
    } else if (edge.controlPoints.length === 2) {
      const [cp1x, cp1y] = edge.controlPoints[0];
      const [cp2x, cp2y] = edge.controlPoints[1];
      d = `M ${startX} ${startY} C ${cp1x * GRID_SCALE} ${cp1y * GRID_SCALE}, ${cp2x * GRID_SCALE} ${cp2y * GRID_SCALE}, ${endX} ${endY}`;
    }
  } else if (edge.pathType === 'curved') {
    const midY = (startY + endY) / 2;
    d = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
  } else {
    d = `M ${startX} ${startY} L ${endX} ${endY}`;
  }

  // Label positioning
  const t = edge.labelPosition !== undefined ? edge.labelPosition : 0.5;
  let labelX = 0;
  let labelY = 0;

  if (edge.controlPoints && edge.controlPoints.length > 0) {
    if (edge.controlPoints.length === 1) {
      const cp = edge.controlPoints[0];
      const cpX = cp[0] * GRID_SCALE; const cpY = cp[1] * GRID_SCALE;
      labelX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * cpX + t * t * endX;
      labelY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * cpY + t * t * endY;
    } else if (edge.controlPoints.length === 2) {
      const cp1 = edge.controlPoints[0]; const cp2 = edge.controlPoints[1];
      const p0x = startX; const p1x = cp1[0] * GRID_SCALE; const p2x = cp2[0] * GRID_SCALE; const p3x = endX;
      const p0y = startY; const p1y = cp1[1] * GRID_SCALE; const p2y = cp2[1] * GRID_SCALE; const p3y = endY;
      labelX = Math.pow(1 - t, 3) * p0x + 3 * Math.pow(1 - t, 2) * t * p1x + 3 * (1 - t) * Math.pow(t, 2) * p2x + Math.pow(t, 3) * p3x;
      labelY = Math.pow(1 - t, 3) * p0y + 3 * Math.pow(1 - t, 2) * t * p1y + 3 * (1 - t) * Math.pow(t, 2) * p2y + Math.pow(t, 3) * p3y;
    }
  } else {
    labelX = startX + (endX - startX) * t;
    labelY = startY + (endY - startY) * t;
  }

  if (edge.labelOffset) {
    labelX += edge.labelOffset.x * GRID_SCALE;
    labelY += edge.labelOffset.y * GRID_SCALE;
  }

  // Editorial theme colors
  const colors = {
    line: '#666666',
    lineSelected: '#C87941',
    lineVisited: '#B5683A',
    lineHidden: '#333333',
    labelBg: '#1A1916',
    labelBorder: '#666666',
    labelText: '#F5F2ED',
  };

  let strokeColor: string;
  let strokeWidth: number;
  let opacity: number;
  let strokeDasharray: string | undefined;
  let labelBgColor: string;
  let labelBorderColor: string;
  let labelTextColor: string;

  if (isHidden) {
    strokeColor = colors.lineHidden;
    strokeWidth = 1;
    opacity = 0.1;
    strokeDasharray = undefined;
  } else if (isTeaser) {
    strokeColor = colors.line;
    strokeWidth = 1.5;
    opacity = 0.5;
    strokeDasharray = '6 4';
  } else {
    strokeColor = isSelected ? colors.lineSelected : (isVisited ? colors.lineVisited : colors.line);
    strokeWidth = isSelected ? 2 : (isVisited ? 2 : 1.5);
    opacity = isSelected ? 1 : (isVisited ? 1 : 0.7);
    strokeDasharray = undefined;
  }

  labelBgColor = colors.labelBg;
  labelBorderColor = isTeaser ? colors.line : (isSelected ? colors.lineSelected : colors.labelBorder);
  labelTextColor = isTeaser ? `${colors.labelText}88` : (isSelected ? colors.lineSelected : colors.labelText);

  if (isHidden) {
    return (
      <g style={{ opacity, transition: 'opacity 0.5s ease-out' }}>
        {renderPart === 'path' && (
          <path
            d={d}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            opacity={opacity}
            className="pointer-events-none"
          />
        )}
      </g>
    );
  }

  return (
    <g
      className="group cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onClick(edge);
      }}
      style={{ transition: 'opacity 0.5s ease-out' }}
    >
      {renderPart === 'path' && (
        <>
          {/* Invisible thick path for easier clicking */}
          <path
            d={d}
            fill="none"
            stroke="transparent"
            strokeWidth="40"
          />

          {/* Visible Path */}
          <path
            d={d}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            opacity={opacity}
            markerEnd={isHidden ? undefined : 'url(#arrowhead-editorial)'}
            className="transition-all duration-300 group-hover:stroke-[#C87941] group-hover:opacity-100"
          />
        </>
      )}

      {renderPart === 'label' && edge.label && (
        <g
          transform={`translate(${labelX}, ${labelY})`}
          style={{ opacity: isTeaser ? 0.6 : 1 }}
        >
          {/* Label Background */}
          <rect
            x="-30"
            y="-20"
            width="60"
            height="40"
            fill={labelBgColor}
            stroke={labelBorderColor}
            strokeWidth="1"
            strokeDasharray={isTeaser ? "4 2" : undefined}
            rx="0"
            className="group-hover:stroke-[#C87941] transition-colors"
          />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill={labelTextColor}
            fontSize="14"
            fontWeight="500"
            fontFamily="Inter, sans-serif"
            className="select-none pointer-events-none group-hover:fill-[#C87941]"
            dy="2"
          >
            {edge.label}
          </text>
        </g>
      )}
    </g>
  );
};

export default GraphEdgeEditorial;
