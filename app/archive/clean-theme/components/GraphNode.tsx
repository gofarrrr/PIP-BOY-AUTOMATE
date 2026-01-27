import React from 'react';
import { FlowNode } from '../types';
import type { VisibilityState } from '../hooks/useProgressiveReveal';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();
  const isCleanTheme = theme === 'clean';

  // Don't render at all if completely hidden (for performance)
  // But we still want to render a ghost for visual context
  const isHidden = visibilityState === 'hidden';
  const isTeaser = visibilityState === 'teaser';

  // Optimized sizes for better spacing and readability
  // Clean Mode gets larger nodes for better text fit
  const width = node.type === 'decision'
    ? (isCleanTheme ? 200 : 180)
    : (isCleanTheme ? 260 : 220);
  const height = node.type === 'decision'
    ? (isCleanTheme ? 200 : 180)
    : (isCleanTheme ? 100 : 90);

  // Colors based on theme
  let strokeColor: string;
  let fillColor: string;
  let shadow: string;
  let strokeWidth: number;
  let opacity: number;
  let strokeDasharray: string | undefined;
  let textColor: string;

  if (isCleanTheme) {
    // Clean Mode Colors
    const cleanColors = {
      primary: '#2D3748',      // Dark gray for borders
      yellow: '#FFDE59',       // Pop yellow for decisions
      blue: '#60A5FA',         // Soft blue for results
      white: '#FFFFFF',        // White fill
      text: '#1E293B',         // Dark text
      visited: '#34D399',      // Green for visited
    };

    // Determine node accent color based on type or position
    const isDecisionNode = node.type === 'decision';
    const isResultNode = node.label.toLowerCase().includes('result') ||
      node.label.toLowerCase().includes('blueprint') ||
      node.label.toLowerCase().includes('automate') ||
      node.label.toLowerCase().includes('augment');

    const accentColor = isDecisionNode ? cleanColors.yellow : (isResultNode ? cleanColors.blue : cleanColors.white);

    if (isHidden) {
      strokeColor = '#E2E8F0';
      fillColor = '#F8FAFC';
      shadow = 'none';
      strokeWidth = 1;
      opacity = 0.15;
      strokeDasharray = undefined;
      textColor = '#CBD5E1';
    } else if (isTeaser) {
      strokeColor = '#94A3B8';
      fillColor = '#F8FAFC';
      shadow = 'drop-shadow(2px 3px 0 rgba(0,0,0,0.05))';
      strokeWidth = 2;
      opacity = 0.6;
      strokeDasharray = '6 4';
      textColor = '#94A3B8';
    } else if (highlightType === 'issue') {
      strokeColor = '#EF4444';
      fillColor = '#FEE2E2';
      shadow = 'drop-shadow(2px 3px 0 rgba(239,68,68,0.2))';
      strokeWidth = 2.5;
      opacity = 1;
      strokeDasharray = undefined;
      textColor = '#DC2626';
    } else if (highlightType === 'solution') {
      strokeColor = '#F59E0B';
      fillColor = '#FEF3C7';
      shadow = 'drop-shadow(2px 3px 0 rgba(245,158,11,0.2))';
      strokeWidth = 2.5;
      opacity = 1;
      strokeDasharray = undefined;
      textColor = '#D97706';
    } else if (highlightType === 'healthy') {
      strokeColor = '#10B981';
      fillColor = '#D1FAE5';
      shadow = 'drop-shadow(2px 3px 0 rgba(16,185,129,0.2))';
      strokeWidth = 2.5;
      opacity = 1;
      strokeDasharray = undefined;
      textColor = '#059669';
    } else {
      // Normal revealed state - Clean Mode
      const isActiveState = isSelected || isVisited;
      strokeColor = isSelected ? cleanColors.primary : (isVisited ? cleanColors.visited : cleanColors.primary);
      fillColor = isSelected ? accentColor : (isVisited ? `${cleanColors.visited}22` : accentColor);
      shadow = isSelected
        ? 'drop-shadow(3px 4px 0 rgba(0,0,0,0.12))'
        : 'drop-shadow(2px 3px 0 rgba(0,0,0,0.08))';
      strokeWidth = isSelected ? 3 : 2.5;
      opacity = 1;
      strokeDasharray = undefined;
      textColor = cleanColors.text;
    }
  } else {
    // Pip-Boy Mode Colors (original)
    const colors = {
      blue: '#33ff00',
      green: '#33ff00',
      yellow: '#ffb000',
      red: '#ff3333'
    };
    const baseColor = colors[node.color || 'blue'];

    if (isHidden) {
      strokeColor = baseColor;
      fillColor = '#0a0a0a';
      shadow = 'none';
      strokeWidth = 1;
      opacity = 0.08;
      strokeDasharray = undefined;
      textColor = `${baseColor}15`;
    } else if (isTeaser) {
      strokeColor = baseColor;
      fillColor = '#0a0a0a';
      shadow = `drop-shadow(0 0 3px ${baseColor}33)`;
      strokeWidth = 2;
      opacity = 0.5;
      strokeDasharray = '8 4';
      textColor = `${baseColor}88`;
    } else if (highlightType === 'issue') {
      strokeColor = '#ff3333';
      fillColor = 'rgba(255, 51, 51, 0.15)';
      shadow = 'drop-shadow(0 0 12px rgba(255, 51, 51, 0.7))';
      strokeWidth = 3;
      opacity = 1;
      strokeDasharray = undefined;
      textColor = '#ff3333';
    } else if (highlightType === 'solution') {
      strokeColor = '#ffb000';
      fillColor = 'rgba(255, 176, 0, 0.15)';
      shadow = 'drop-shadow(0 0 15px rgba(255, 176, 0, 0.8))';
      strokeWidth = 3;
      opacity = 1;
      strokeDasharray = undefined;
      textColor = '#ffb000';
    } else if (highlightType === 'healthy') {
      strokeColor = '#33ff00';
      fillColor = 'rgba(51, 255, 0, 0.2)';
      shadow = 'drop-shadow(0 0 10px rgba(51, 255, 0, 0.6))';
      strokeWidth = 3;
      opacity = 1;
      strokeDasharray = undefined;
      textColor = '#33ff00';
    } else {
      // Revealed state - normal Pip-Boy behavior
      strokeColor = isSelected ? '#ffffff' : (isVisited ? '#33ff00' : baseColor);
      fillColor = isSelected ? `${baseColor}44` : (isVisited ? `${baseColor}22` : '#0a0a0a');
      shadow = isSelected ? `drop-shadow(0 0 15px ${baseColor})` : (isVisited ? `drop-shadow(0 0 10px ${baseColor}44)` : `drop-shadow(0 0 5px ${baseColor}66)`);
      strokeWidth = isSelected ? 4 : (isVisited ? 3 : 2);
      opacity = 1;
      strokeDasharray = undefined;
      textColor = isSelected ? '#ffffff' : baseColor;
    }
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

  // Clean mode uses rounded corners more prominently
  const borderRadius = isCleanTheme ? 16 : 10;

  // Grid scaling - spread nodes out more in Clean Mode to prevent overlap
  const GRID_SCALE = isCleanTheme ? 22 : 10;

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
        transition: 'opacity 0.3s ease-out, filter 0.3s ease-out, transform 0.15s ease-out',
      }}
      transform={`translate(${node.x * GRID_SCALE}, ${node.y * GRID_SCALE})`}
      className={`group ${isHidden ? 'pointer-events-none' : ''}`}
    >
      {/* 
        Shape Logic:
        - Pip-Boy Mode: Decision = Diamond, Default = Rectangle
        - Clean Mode: ALWAYS Rectangle (Rounded) to maximize text space
      */}
      {(!isCleanTheme && node.type === 'decision') ? (
        // Diamond Shape (Only for Pip-Boy)
        <path
          d={`M 0 -${height / 2} L ${width / 2} 0 L 0 ${height / 2} L -${width / 2} 0 Z`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          className="transition-all duration-300"
        />
      ) : (
        // Rectangle Shape (Used for everything in Clean Mode)
        <rect
          x={-width / 2}
          y={-height / 2}
          width={width}
          height={height}
          rx={borderRadius}
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
        fill={textColor}
        fontSize={fontSize}
        fontWeight={isCleanTheme ? '600' : 'bold'}
        className={`select-none pointer-events-none ${isCleanTheme ? 'font-body' : 'font-vt323'}`}
        style={{ letterSpacing: isCleanTheme ? '0' : '0.05em' }}
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
