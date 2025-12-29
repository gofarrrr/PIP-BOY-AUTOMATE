import React from 'react';
import { FlowNode } from '../types';

interface GraphNodeProps {
  node: FlowNode;
  onClick: (node: FlowNode) => void;
  isSelected: boolean;
}

const GraphNode: React.FC<GraphNodeProps> = ({ node, onClick, isSelected }) => {
  // Increased sizes for "Bigger" requirement
  const width = node.type === 'decision' ? 160 : 180;
  const height = node.type === 'decision' ? 160 : 100;
  
  // Terminal colors mapping
  const colors = {
    blue: '#33ff00', 
    green: '#33ff00',
    yellow: '#ffb000',
    red: '#ff3333'
  };

  const baseColor = colors[node.color || 'blue'];
  const strokeColor = isSelected ? '#ffffff' : baseColor;
  const fillColor = isSelected ? `${baseColor}44` : '#000000'; // 44 is hex alpha
  const shadow = isSelected ? `drop-shadow(0 0 15px ${baseColor})` : `drop-shadow(0 0 5px ${baseColor}66)`;
  const strokeWidth = isSelected ? 4 : 3;

  return (
    <g 
      onClick={(e) => {
        e.stopPropagation();
        onClick(node);
      }} 
      style={{ cursor: 'pointer', filter: shadow }}
      transform={`translate(${node.x * 10}, ${node.y * 10})`} // Scale 0-100 to 0-1000
      className="group"
    >
      {node.type === 'decision' ? (
        // Diamond Shape
        <path
          d={`M 0 -${height/2} L ${width/2} 0 L 0 ${height/2} L -${width/2} 0 Z`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          className="transition-all duration-300"
        />
      ) : (
        // Rectangle Shape
        <rect
          x={-width/2}
          y={-height/2}
          width={width}
          height={height}
          rx="10" 
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          className="transition-all duration-300"
        />
      )}
      
      {/* Text Label */}
      <foreignObject x={-width/2} y={-height/2} width={width} height={height}>
        <div className="w-full h-full flex items-center justify-center text-center p-2 pointer-events-none">
          <span 
            className="text-2xl leading-tight font-vt323 font-bold tracking-wider" 
            style={{ color: isSelected ? '#fff' : baseColor }}
          >
            {node.label}
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

export default GraphNode;
