import React from 'react';
import { FlowEdge, FlowNode } from '../types';
import type { VisibilityState } from '../hooks/useProgressiveReveal';
import { useTheme } from '../context/ThemeContext';

interface GraphEdgeProps {
  edge: FlowEdge;
  fromNode: FlowNode;
  toNode: FlowNode;
  onClick: (edge: FlowEdge) => void;
  isSelected: boolean;
  isVisited?: boolean;
  renderPart?: 'path' | 'label'; // New prop to control layering
  visibilityState?: VisibilityState;
}

const GraphEdge: React.FC<GraphEdgeProps> = ({
  edge,
  fromNode,
  toNode,
  onClick,
  isSelected,
  isVisited = false,
  renderPart = 'path',
  visibilityState = 'revealed'
}) => {
  const { theme } = useTheme();
  const isCleanTheme = theme === 'clean';

  const isHidden = visibilityState === 'hidden';
  const isTeaser = visibilityState === 'teaser';

  // Grid scaling - must match GraphNode logic
  const GRID_SCALE = isCleanTheme ? 22 : 10;

  const startX = fromNode.x * GRID_SCALE;
  const startY = fromNode.y * GRID_SCALE;
  const endX = toNode.x * GRID_SCALE;
  const endY = toNode.y * GRID_SCALE;

  // Check if this is a self-loop (edge from node to itself)
  const isSelfLoop = edge.from === edge.to;

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

  // Label Positioning
  // Use edge.labelPosition if available, otherwise default to center (0.5)
  // 0.5 is safer to keep labels on the main part of the curve and away from nodes.
  const t = edge.labelPosition !== undefined ? edge.labelPosition : 0.5;
  let labelX = 0;
  let labelY = 0;

  if (edge.controlPoints && edge.controlPoints.length > 0) {
    if (edge.controlPoints.length === 1) {
      // Quadratic bezier
      const cp = edge.controlPoints[0];
      const cpX = cp[0] * GRID_SCALE; const cpY = cp[1] * GRID_SCALE;
      labelX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * cpX + t * t * endX;
      labelY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * cpY + t * t * endY;
    } else if (edge.controlPoints.length === 2) {
      // Cubic bezier
      const cp1 = edge.controlPoints[0]; const cp2 = edge.controlPoints[1];
      const p0x = startX; const p1x = cp1[0] * GRID_SCALE; const p2x = cp2[0] * GRID_SCALE; const p3x = endX;
      const p0y = startY; const p1y = cp1[1] * GRID_SCALE; const p2y = cp2[1] * GRID_SCALE; const p3y = endY;
      labelX = Math.pow(1 - t, 3) * p0x + 3 * Math.pow(1 - t, 2) * t * p1x + 3 * (1 - t) * Math.pow(t, 2) * p2x + Math.pow(t, 3) * p3x;
      labelY = Math.pow(1 - t, 3) * p0y + 3 * Math.pow(1 - t, 2) * t * p1y + 3 * (1 - t) * Math.pow(t, 2) * p2y + Math.pow(t, 3) * p3y;
    }
  } else {
    // Linear
    labelX = startX + (endX - startX) * t;
    labelY = startY + (endY - startY) * t;
  }

  // Special positioning for self-loops: label sits directly at node's right edge
  if (isSelfLoop) {
    // Position label at the right edge of the node (like a badge)
    const nodeHalfWidth = isCleanTheme ? 80 : 60;
    labelX = startX + nodeHalfWidth + 30; // Just outside the right edge
    labelY = startY; // Centered vertically with the node
  } else if (edge.labelOffset) {
    // Apply manual offsets (Only use for micro-adjustments, not large moves)
    labelX += edge.labelOffset.x * GRID_SCALE;
    labelY += edge.labelOffset.y * GRID_SCALE;
  } else if (isCleanTheme) {
    // Move labels lower for Clean theme (below the line)
    labelY += 15;
  }

  // Calculate styles based on visibility state and theme
  let strokeColor: string;
  let strokeWidth: number;
  let opacity: number;
  let strokeDasharray: string | undefined;
  let labelBgColor: string;
  let labelBorderColor: string;
  let labelTextColor: string;
  let arrowMarkerId: string;

  if (isCleanTheme) {
    // Clean Mode Colors
    const cleanColors = {
      line: '#2D3748',         // Dark gray for lines
      lineHidden: '#E2E8F0',   // Light gray for hidden
      lineSelected: '#F59E0B', // Orange for selected
      lineVisited: '#10B981',  // Green for visited
      labelBg: '#FFFFFF',
      labelBorder: '#2D3748',
      labelText: '#1E293B',
    };

    if (isHidden) {
      strokeColor = cleanColors.lineHidden;
      strokeWidth = 1;
      opacity = 0.1;
      strokeDasharray = undefined;
    } else if (isTeaser) {
      strokeColor = '#94A3B8';
      strokeWidth = 2;
      opacity = 0.5;
      strokeDasharray = '6 4';
    } else {
      strokeColor = isSelected ? cleanColors.lineSelected : (isVisited ? cleanColors.lineVisited : cleanColors.line);
      strokeWidth = isSelected ? 3 : (isVisited ? 2.5 : 2);
      opacity = isSelected ? 1 : (isVisited ? 1 : 0.7);
      strokeDasharray = undefined;
    }

    labelBgColor = cleanColors.labelBg;
    labelBorderColor = isTeaser ? '#94A3B8' : (isSelected ? cleanColors.lineSelected : cleanColors.labelBorder);
    labelTextColor = isTeaser ? '#94A3B8' : (isSelected ? cleanColors.lineSelected : cleanColors.labelText);
    arrowMarkerId = isSelected ? 'arrowhead-clean-selected' : 'arrowhead-clean';
  } else {
    // Pip-Boy Mode Colors (original)
    if (isHidden) {
      strokeColor = '#33ff00';
      strokeWidth = 1;
      opacity = 0.05;
      strokeDasharray = undefined;
    } else if (isTeaser) {
      strokeColor = '#33ff00';
      strokeWidth = 2;
      opacity = 0.4;
      strokeDasharray = '8 4';
    } else {
      strokeColor = isSelected ? '#ffb000' : (isVisited ? '#33ff00' : '#33ff00');
      strokeWidth = isSelected ? 4 : (isVisited ? 3 : 2);
      opacity = isSelected ? 1 : (isVisited ? 1 : 0.6);
      strokeDasharray = undefined;
    }

    labelBgColor = '#0a0a0a';
    labelBorderColor = isTeaser ? '#33ff00' : (isSelected ? '#ffb000' : '#33ff00');
    labelTextColor = isTeaser ? '#33ff0088' : (isSelected ? '#ffb000' : '#33ff00');
    arrowMarkerId = isSelected ? 'arrowhead-selected' : 'arrowhead-normal';
  }

  // Don't render clickable area for hidden edges
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

  const hoverClass = isCleanTheme
    ? 'group-hover:stroke-[#F59E0B] group-hover:opacity-100'
    : 'group-hover:stroke-[#ffb000] group-hover:opacity-100 group-hover:stroke-[3px]';

  return (
    <g
      className="group cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onClick(edge);
      }}
      style={{ transition: 'opacity 0.5s ease-out' }}
    >
      {renderPart === 'path' && !isSelfLoop && (
        <path
          d={d}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          opacity={opacity}
          markerEnd={isHidden ? undefined : `url(#${arrowMarkerId})`}
          className={`transition-all duration-300 ${hoverClass}`}
        />
      )}

      {renderPart === 'label' && edge.label && (
        <g
          transform={`translate(${labelX}, ${labelY})`}
          style={{ opacity: isTeaser ? 0.6 : 1 }}
        >
          {/* Label Background */}
          <rect
            x={isCleanTheme ? "-30" : "-26"}
            y={isCleanTheme ? "-20" : "-18"}
            width={isCleanTheme ? "60" : "52"}
            height={isCleanTheme ? "40" : "36"}
            fill={labelBgColor}
            stroke={labelBorderColor}
            strokeWidth={isCleanTheme ? '2' : '2'}
            strokeDasharray={isTeaser ? "4 2" : undefined}
            rx={isCleanTheme ? '12' : '4'}
            className={isCleanTheme
              ? 'group-hover:stroke-[#F59E0B] transition-colors drop-shadow-md'
              : 'group-hover:stroke-[#ffb000] transition-colors'
            }
          />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill={labelTextColor}
            fontSize={isCleanTheme ? '22' : '24'}
            fontWeight={isCleanTheme ? '600' : 'bold'}
            className={`select-none pointer-events-none ${isCleanTheme
              ? 'font-body group-hover:fill-[#F59E0B]'
              : 'font-vt323 group-hover:fill-[#ffb000]'
              }`}
            dy="2" // Visual centering adjustment
          >
            {edge.label}
          </text>
        </g>
      )}
    </g>
  );
};

export default GraphEdge;
