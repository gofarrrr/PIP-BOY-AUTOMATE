import React from 'react';
import { FlowNode } from '../types';

interface GraphNodeProps {
  node: FlowNode;
  onClick: (node: FlowNode) => void;
  isSelected: boolean;
}

const GraphNode: React.FC<GraphNodeProps> = ({ node, onClick, isSelected }) => {
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
  const strokeColor = isSelected ? '#ffffff' : baseColor;
  const fillColor = isSelected ? `${baseColor}44` : '#0a0a0a';
  const shadow = isSelected ? `drop-shadow(0 0 15px ${baseColor})` : `drop-shadow(0 0 5px ${baseColor}66)`;
  const strokeWidth = isSelected ? 4 : 3;

  // Parse label for line breaks (handles \\n notation)
  const labelLines = node.label.split(/\\n/);
  const fontSize = node.type === 'decision' ? 18 : 20;
  const lineHeight = fontSize * 1.3;
  // Calculate starting Y so text is vertically centered
  const startY = -(labelLines.length - 1) * lineHeight / 2;

  return (
    <g
      onClick={(e) => {
        e.stopPropagation();
        onClick(node);
      }}
      style={{ cursor: 'pointer', filter: shadow }}
      transform={`translate(${node.x * 10}, ${node.y * 10})`}
      className="group"
    >
      {node.type === 'decision' ? (
        // Diamond Shape
        <path
          d={`M 0 -${height / 2} L ${width / 2} 0 L 0 ${height / 2} L -${width / 2} 0 Z`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
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
          className="transition-all duration-300"
        />
      )}

      {/* Text Label - using SVG text with tspan for proper line breaks */}
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fill={isSelected ? '#ffffff' : baseColor}
        fontSize={fontSize}
        fontWeight="bold"
        className="font-vt323 select-none pointer-events-none"
        style={{ letterSpacing: '0.05em' }}
      >
        {labelLines.map((line, i) => (
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
