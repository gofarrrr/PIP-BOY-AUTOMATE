import React from 'react';
import { FlowEdge, FlowNode } from '../types';

interface GraphEdgeProps {
  edge: FlowEdge;
  fromNode: FlowNode;
  toNode: FlowNode;
  onClick: (edge: FlowEdge) => void;
  isSelected: boolean;
  renderPart?: 'path' | 'label'; // New prop to control layering
}

const GraphEdge: React.FC<GraphEdgeProps> = ({ edge, fromNode, toNode, onClick, isSelected, renderPart = 'path' }) => {
  const startX = fromNode.x * 10;
  const startY = fromNode.y * 10;
  const endX = toNode.x * 10;
  const endY = toNode.y * 10;

  // Calculate path
  let d = '';
  
  if (edge.controlPoints && edge.controlPoints.length > 0) {
    if (edge.controlPoints.length === 1) {
       const [cp1x, cp1y] = edge.controlPoints[0];
       d = `M ${startX} ${startY} Q ${cp1x * 10} ${cp1y * 10} ${endX} ${endY}`;
    } else if (edge.controlPoints.length === 2) {
       const [cp1x, cp1y] = edge.controlPoints[0];
       const [cp2x, cp2y] = edge.controlPoints[1];
       d = `M ${startX} ${startY} C ${cp1x * 10} ${cp1y * 10}, ${cp2x * 10} ${cp2y * 10}, ${endX} ${endY}`;
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
       const cpX = cp[0]*10; const cpY = cp[1]*10;
       labelX = (1-t)*(1-t)*startX + 2*(1-t)*t*cpX + t*t*endX;
       labelY = (1-t)*(1-t)*startY + 2*(1-t)*t*cpY + t*t*endY;
     } else if (edge.controlPoints.length === 2) {
       // Cubic bezier
       const cp1 = edge.controlPoints[0]; const cp2 = edge.controlPoints[1];
       const p0x=startX; const p1x=cp1[0]*10; const p2x=cp2[0]*10; const p3x=endX;
       const p0y=startY; const p1y=cp1[1]*10; const p2y=cp2[1]*10; const p3y=endY;
       labelX = Math.pow(1-t,3)*p0x + 3*Math.pow(1-t,2)*t*p1x + 3*(1-t)*Math.pow(t,2)*p2x + Math.pow(t,3)*p3x;
       labelY = Math.pow(1-t,3)*p0y + 3*Math.pow(1-t,2)*t*p1y + 3*(1-t)*Math.pow(t,2)*p2y + Math.pow(t,3)*p3y;
     }
  } else {
    // Linear
    labelX = startX + (endX - startX) * t;
    labelY = startY + (endY - startY) * t;
  }

  // Apply manual offsets (Only use for micro-adjustments, not large moves)
  if (edge.labelOffset) {
    labelX += edge.labelOffset.x * 10;
    labelY += edge.labelOffset.y * 10;
  }

  const strokeColor = isSelected ? '#ffb000' : '#33ff00';
  const strokeWidth = isSelected ? 4 : 2;
  const opacity = isSelected ? 1 : 0.6;

  return (
    <g 
      className="group cursor-pointer" 
      onClick={(e) => {
        e.stopPropagation();
        onClick(edge);
      }}
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
            opacity={opacity}
            markerEnd={`url(#arrowhead-${isSelected ? 'selected' : 'normal'})`}
            className="transition-all duration-300 group-hover:stroke-[#ffb000] group-hover:opacity-100 group-hover:stroke-[3px]"
          />
        </>
      )}

      {renderPart === 'label' && edge.label && (
        <g transform={`translate(${labelX}, ${labelY})`}>
          {/* Label Background - Opaque Black to hide crossing lines */}
          <rect 
            x="-26" y="-18" width="52" height="36" 
            fill="#0a0a0a" 
            stroke={isSelected ? "#ffb000" : "#33ff00"} 
            strokeWidth="2"
            rx="4"
            className="group-hover:stroke-[#ffb000] transition-colors"
          />
          <text 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fill={isSelected ? "#ffb000" : "#33ff00"} 
            fontSize="24"
            fontWeight="bold"
            className="font-vt323 select-none group-hover:fill-[#ffb000] pointer-events-none"
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
