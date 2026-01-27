import React from 'react';
import { FlowEdge, FlowNode } from '../types';
import type { VisibilityState } from '../hooks/useProgressiveReveal';
import '../themes/optimistic.css';

interface GraphEdgeProps {
    edge: FlowEdge;
    fromNode: FlowNode;
    toNode: FlowNode;
    onClick: (edge: FlowEdge) => void;
    isSelected: boolean;
    isVisited?: boolean;
    renderPart?: 'path' | 'label';
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
    const isHidden = visibilityState === 'hidden';
    const isTeaser = visibilityState === 'teaser';

    const GRID_SCALE = 22;

    const startX = fromNode.x * GRID_SCALE;
    const startY = fromNode.y * GRID_SCALE;
    const endX = toNode.x * GRID_SCALE;
    const endY = toNode.y * GRID_SCALE;

    // Calculate path (same logic as editorial, standard Bezier)
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

    // Label positioning logic (reused)
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
    } else {
        // Default offset for wider nodes to prevent overlaps - move lower
        labelY += 15;
    }

    // Optimistic Theme Colors
    const colors = {
        line: '#1E3D2F',         // Dark Green
        lineSelected: '#FF6B4A', // Coral
        lineVisited: '#4A6359',  // Light Green
        lineHidden: '#D1CDC7',   // Greyish
        labelBg: '#FFFFFF',
        labelBorder: '#1E3D2F',
        labelText: '#1E3D2F',
    };

    let strokeColor: string;
    let strokeWidth: number;
    let opacity: number;
    let strokeDasharray: string | undefined;

    if (isHidden) {
        strokeColor = colors.lineHidden;
        strokeWidth = 1;
        opacity = 0.2;
        strokeDasharray = undefined;
    } else if (isTeaser) {
        strokeColor = colors.line;
        strokeWidth = 2;
        opacity = 0.4;
        strokeDasharray = '8 4';
    } else {
        strokeColor = isSelected ? colors.lineSelected : (isVisited ? colors.line : colors.line);
        strokeWidth = isSelected ? 4 : (isVisited ? 3 : 2.5); // Thicker lines for woodblock feel
        opacity = 1;
        strokeDasharray = undefined;
    }

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
                <path
                    d={d}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    opacity={opacity}
                    strokeLinecap="round"
                    markerEnd={isHidden || isTeaser ? undefined : 'url(#arrowhead-optimistic)'}
                    className="transition-all duration-300 group-hover:stroke-[#FF6B4A]"
                />
            )}

            {renderPart === 'label' && edge.label && (
                <g
                    transform={`translate(${labelX}, ${labelY})`}
                    style={{ opacity: isTeaser ? 0.6 : 1 }}
                >
                    {/* Label Card */}
                    <rect
                        x="-40"
                        y="-20"
                        width="80"
                        height="40"
                        fill={colors.labelBg}
                        stroke={colors.labelBorder}
                        strokeWidth="2"
                        rx="20" // Pill shape for labels
                        className="group-hover:stroke-[#FF6B4A] transition-colors shadow-sm"
                    />
                    <text
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={colors.labelText}
                        fontSize="14"
                        fontWeight="600"
                        fontFamily="Outfit, sans-serif"
                        className="select-none pointer-events-none group-hover:fill-[#FF6B4A]"
                        dy="1"
                    >
                        {edge.label}
                    </text>
                </g>
            )}
        </g>
    );
};

export default GraphEdge;
