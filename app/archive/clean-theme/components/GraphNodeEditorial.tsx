import React from 'react';
import { FlowNode } from '../types';
import type { VisibilityState } from '../hooks/useProgressiveReveal';
import type { NodeHighlightType } from './GraphNode';
import '../themes/editorial.css';

interface GraphNodeEditorialProps {
  node: FlowNode;
  onClick: (node: FlowNode) => void;
  isSelected: boolean;
  isVisited?: boolean;
  visibilityState?: VisibilityState;
  highlightType?: NodeHighlightType;
}

const GraphNodeEditorial: React.FC<GraphNodeEditorialProps> = ({
  node,
  onClick,
  isSelected,
  isVisited = false,
  visibilityState = 'revealed',
  highlightType = null
}) => {
  const isHidden = visibilityState === 'hidden';
  const isTeaser = visibilityState === 'teaser';

  // Node sizing - rectangular for all nodes in editorial theme
  const width = node.type === 'decision' ? 220 : 260;
  const height = node.type === 'decision' ? 100 : 90;

  // Editorial theme colors
  const colors = {
    cream: '#F5F2ED',
    terracotta: '#C87941',
    terracottaDark: '#B5683A',
    darkBg: '#1A1916',
    darkText: '#1A1916',
    lightText: '#F5F2ED',
    borderDark: '#333333',
    borderMedium: '#666666',
  };

  // Determine colors based on state
  let fillColor: string;
  let strokeColor: string;
  let textColor: string;
  let strokeWidth: number;
  let opacity: number;
  let strokeDasharray: string | undefined;

  if (isHidden) {
    fillColor = colors.darkBg;
    strokeColor = colors.borderDark;
    textColor = `${colors.cream}22`;
    strokeWidth = 1;
    opacity = 0.15;
    strokeDasharray = undefined;
  } else if (isTeaser) {
    fillColor = colors.darkBg;
    strokeColor = colors.borderMedium;
    textColor = `${colors.cream}88`;
    strokeWidth = 1.5;
    opacity = 0.6;
    strokeDasharray = '6 4';
  } else if (highlightType === 'issue') {
    fillColor = '#FEE2E2';
    strokeColor = '#EF4444';
    textColor = '#DC2626';
    strokeWidth = 2;
    opacity = 1;
    strokeDasharray = undefined;
  } else if (highlightType === 'solution') {
    fillColor = colors.terracotta;
    strokeColor = colors.terracottaDark;
    textColor = colors.darkText;
    strokeWidth = 2;
    opacity = 1;
    strokeDasharray = undefined;
  } else if (highlightType === 'healthy') {
    fillColor = '#D1FAE5';
    strokeColor = '#10B981';
    textColor = '#059669';
    strokeWidth = 2;
    opacity = 1;
    strokeDasharray = undefined;
  } else {
    // Normal revealed state
    const isDecisionNode = node.type === 'decision';
    const isResultNode = node.label.toLowerCase().includes('automate') ||
      node.label.toLowerCase().includes('bits') ||
      node.label.toLowerCase().includes('hybrid');

    if (isSelected) {
      fillColor = isResultNode ? colors.terracotta : colors.cream;
      strokeColor = colors.terracottaDark;
      textColor = isResultNode ? colors.lightText : colors.darkText;
      strokeWidth = 2.5;
    } else if (isVisited) {
      fillColor = `${colors.terracotta}44`;
      strokeColor = colors.terracotta;
      textColor = colors.lightText;
      strokeWidth = 2;
    } else {
      fillColor = isResultNode ? colors.terracotta : colors.cream;
      strokeColor = colors.borderMedium;
      textColor = isResultNode ? colors.lightText : colors.darkText;
      strokeWidth = 1.5;
    }
    opacity = 1;
    strokeDasharray = undefined;
  }

  // Parse label for line breaks
  const labelLines = node.label.split(/\\n/);
  const fontSize = 18;
  const lineHeight = fontSize * 1.2;
  const startY = -(labelLines.length - 1) * lineHeight / 2;

  const displayLines = isTeaser
    ? [labelLines[0] + (labelLines.length > 1 ? '...' : '')]
    : labelLines;

  const GRID_SCALE = 14;

  return (
    <g
      onClick={(e) => {
        e.stopPropagation();
        if (!isHidden) {
          onClick(node);
        }
      }}
      style={{
        cursor: isHidden ? 'default' : 'pointer',
        opacity,
        transition: 'opacity 0.3s ease-out, transform 0.15s ease-out',
      }}
      transform={`translate(${node.x * GRID_SCALE}, ${node.y * GRID_SCALE})`}
      className={`group ${isHidden ? 'pointer-events-none' : ''}`}
    >
      {/* Rectangle Shape - all nodes are rectangular in editorial theme */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx={0}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        className="transition-all duration-300"
      />

      {/* Text Label - Playfair Display for editorial theme */}
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textColor}
        fontSize={fontSize}
        fontWeight="400"
        fontFamily="Playfair Display, serif"
        fontStyle="italic"
        className="select-none pointer-events-none"
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

export default GraphNodeEditorial;
