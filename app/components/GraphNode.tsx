import React from 'react';
import { FlowNode } from '../types';
import type { VisibilityState } from '../hooks/useProgressiveReveal';

export type NodeHighlightType = 'issue' | 'healthy' | 'solution' | null;

interface GraphNodeProps {
  node: FlowNode;
  onClick: (node: FlowNode) => void;
  isSelected: boolean;
  isVisited?: boolean;
  visibilityState?: VisibilityState;
  highlightType?: NodeHighlightType;
}

const GraphNode: React.FC<GraphNodeProps> = ({
  node,
  onClick,
  isSelected,
  isVisited = false,
  visibilityState = 'revealed',
  highlightType = null
}) => {
  // Don't render at all if completely hidden (for performance)
  // But we still want to render a ghost for visual context
  const isHidden = visibilityState === 'hidden';
  const isTeaser = visibilityState === 'teaser';

  // Larger sizes for better readability
  const width = node.type === 'decision' ? 200 : 220;
  const height = node.type === 'decision' ? 200 : 90;

  // Terminal colors mapping
  const colors = {
    blue: '#33ff00',
    green: '#33ff00',
    yellow: '#ffb000',
    red: '#ff3333'
  };

  const baseColor = colors[node.color || 'blue'];

  // Adjust colors based on visibility state
  let strokeColor: string;
  let fillColor: string;
  let shadow: string;
  let strokeWidth: number;
  let opacity: number;
  let strokeDasharray: string | undefined;

  if (isHidden) {
    // Ghost state - very faint, blurred
    strokeColor = baseColor;
    fillColor = '#0a0a0a';
    shadow = 'none';
    strokeWidth = 1;
    opacity = 0.08;
    strokeDasharray = undefined;
  } else if (isTeaser) {
    // Teaser state - visible but muted, dashed border
    strokeColor = baseColor;
    fillColor = '#0a0a0a';
    shadow = `drop-shadow(0 0 3px ${baseColor}33)`;
    strokeWidth = 2;
    opacity = 0.5;
    strokeDasharray = '8 4';
  } else if (highlightType === 'issue') {
    // Issue highlight - red glow for problem areas
    strokeColor = '#ff3333';
    fillColor = 'rgba(255, 51, 51, 0.15)';
    shadow = 'drop-shadow(0 0 12px rgba(255, 51, 51, 0.7))';
    strokeWidth = 3;
    opacity = 1;
    strokeDasharray = undefined;
  } else if (highlightType === 'solution') {
    // Solution highlight - yellow pulsing glow
    strokeColor = '#ffb000';
    fillColor = 'rgba(255, 176, 0, 0.15)';
    shadow = 'drop-shadow(0 0 15px rgba(255, 176, 0, 0.8))';
    strokeWidth = 3;
    opacity = 1;
    strokeDasharray = undefined;
  } else if (highlightType === 'healthy') {
    // Healthy highlight - bright green glow
    strokeColor = '#33ff00';
    fillColor = 'rgba(51, 255, 0, 0.2)';
    shadow = 'drop-shadow(0 0 10px rgba(51, 255, 0, 0.6))';
    strokeWidth = 3;
    opacity = 1;
    strokeDasharray = undefined;
  } else {
    // Revealed state - normal behavior
    strokeColor = isSelected ? '#ffffff' : (isVisited ? '#33ff00' : baseColor);
    fillColor = isSelected ? `${baseColor}44` : (isVisited ? `${baseColor}22` : '#0a0a0a');
    shadow = isSelected ? `drop-shadow(0 0 15px ${baseColor})` : (isVisited ? `drop-shadow(0 0 10px ${baseColor}44)` : `drop-shadow(0 0 5px ${baseColor}66)`);
    strokeWidth = isSelected ? 4 : (isVisited ? 3 : 2);
    opacity = 1;
    strokeDasharray = undefined;
  }

  // Parse label for line breaks (handles \\n notation)
  const labelLines = node.label.split(/\\n/);
  const fontSize = node.type === 'decision' ? 22 : 26;
  const lineHeight = fontSize * 1.25;
  // Calculate starting Y so text is vertically centered
  const startY = -(labelLines.length - 1) * lineHeight / 2;

  // For teaser nodes, only show first line with "?"
  const displayLines = isTeaser
    ? [labelLines[0] + (labelLines.length > 1 ? '...' : '')]
    : labelLines;

  return (
    <g
      onClick={(e) => {
        e.stopPropagation();
        // Only allow clicking revealed or teaser nodes
        if (!isHidden) {
          onClick(node);
        }
      }}
      style={{
        cursor: isHidden ? 'default' : 'pointer',
        filter: shadow,
        opacity,
        transition: 'opacity 0.5s ease-out, filter 0.5s ease-out',
      }}
      transform={`translate(${node.x * 10}, ${node.y * 10})`}
      className={`group ${isHidden ? 'pointer-events-none' : ''}`}
    >
      {node.type === 'decision' ? (
        // Diamond Shape
        <path
          d={`M 0 -${height / 2} L ${width / 2} 0 L 0 ${height / 2} L -${width / 2} 0 Z`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          className="transition-all duration-300"
        />
      ) : (
        // Rectangle Shape
        <rect
          x={-width / 2}
          y={-height / 2}
          width={width}
          height={height}
          rx="10"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          className="transition-all duration-300"
        />
      )}

      {/* Text Label - using SVG text with tspan for proper line breaks */}
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fill={isHidden ? `${baseColor}15` : (isTeaser ? `${baseColor}88` : (isSelected ? '#ffffff' : baseColor))}
        fontSize={fontSize}
        fontWeight="bold"
        className="font-vt323 select-none pointer-events-none"
        style={{ letterSpacing: '0.05em' }}
      >
        {displayLines.map((line, i) => (
          <tspan
            key={i}
            x="0"
            dy={i === 0 ? startY : lineHeight}
          >
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

export default GraphNode;
