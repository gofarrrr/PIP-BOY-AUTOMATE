import React from 'react';
import { FlowNode } from '../types';
import type { VisibilityState } from '../hooks/useProgressiveReveal';
import '../themes/optimistic.css';

// Local type definition (was previously imported from archived GraphNode)
export type NodeHighlightType = 'issue' | 'solution' | 'healthy' | null;

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
    const isHidden = visibilityState === 'hidden';
    const isTeaser = visibilityState === 'teaser';

    // Parse label first to calculate dynamic sizing
    const labelLines = node.label.split(/\\n/);

    // Calculate max line length for dynamic width
    const maxLineLength = Math.max(...labelLines.map(line => line.length));

    // Node sizing - DYNAMIC based on text length
    // Decision nodes = Circle/Pill shape (if short text) or larger Rect
    const isDecisionNode = node.type === 'decision';

    // Base dimensions - now dynamic
    // Short labels (< 15 chars): compact
    // Medium labels (15-25 chars): standard
    // Long labels (> 25 chars): wide
    let width: number;
    let fontSize: number;

    if (maxLineLength > 30) {
        width = isDecisionNode ? 340 : 320;
        fontSize = 14;
    } else if (maxLineLength > 20) {
        width = isDecisionNode ? 300 : 300;
        fontSize = 15;
    } else if (maxLineLength > 12) {
        width = isDecisionNode ? 260 : 280;
        fontSize = 16;
    } else {
        width = isDecisionNode ? 200 : 240;
        fontSize = 16;
    }

    // Height based on number of lines
    const baseHeight = isDecisionNode ? 80 : 70;
    const height = baseHeight + (labelLines.length - 1) * 22;

    // Theme Variables (mapped from CSS)
    const colors = {
        cream: '#F9F8F6',
        creamDark: '#EBE8E2',
        green: '#1E3D2F',
        greenLight: '#4A6359',
        coral: '#FF6B4A',
        coralLight: '#FF8F75',
        lime: '#D4E6B5',
        white: '#FFFFFF'
    };

    // Determine styling based on state
    let fillColor: string;
    let strokeColor: string;
    let textColor: string;
    let strokeWidth: number;
    let opacity: number;
    let shadowOffset: number;
    let shadowColor: string;

    if (isHidden) {
        fillColor = colors.creamDark;
        strokeColor = colors.greenLight;
        textColor = 'transparent';
        strokeWidth = 1;
        opacity = 0.1;
        shadowOffset = 0;
        shadowColor = 'transparent';
    } else if (isTeaser) {
        fillColor = colors.cream;
        strokeColor = colors.greenLight;
        textColor = colors.greenLight;
        strokeWidth = 2;
        opacity = 0.5;
        shadowOffset = 0; // Flat for teaser
        shadowColor = 'transparent';
    } else if (highlightType === 'issue') {
        fillColor = '#FEE2E2';
        strokeColor = '#EF4444';
        textColor = '#DC2626';
        strokeWidth = 3;
        opacity = 1;
        shadowOffset = 4;
        shadowColor = '#EF4444';
    } else if (highlightType === 'solution' || highlightType === 'healthy') {
        fillColor = colors.lime;
        strokeColor = colors.green;
        textColor = colors.green;
        strokeWidth = 3;
        opacity = 1;
        shadowOffset = 4;
        shadowColor = colors.green;
    } else {
        // Normal / Selected
        const isResultNode = node.label.toLowerCase().includes('automate') ||
            node.label.toLowerCase().includes('bits') ||
            node.label.toLowerCase().includes('hybrid');

        if (isSelected) {
            fillColor = isResultNode ? colors.coral : colors.white;
            strokeColor = colors.green;
            textColor = isResultNode ? colors.white : colors.green;
            strokeWidth = 3;
            shadowOffset = 6;
            shadowColor = colors.green;
        } else if (isVisited) {
            // Subtle visited state
            fillColor = colors.creamDark;
            strokeColor = colors.green;
            textColor = colors.green;
            strokeWidth = 2;
            shadowOffset = 2;
            shadowColor = colors.green;
        } else {
            // Default
            fillColor = isResultNode ? colors.coral : colors.white;
            strokeColor = colors.green;
            textColor = isResultNode ? colors.white : colors.green;
            strokeWidth = 2;
            shadowOffset = 4;
            shadowColor = colors.green;
        }
        opacity = 1;
    }

    // Font/line calculations using the dynamic fontSize from above
    const lineHeight = fontSize * 1.3;
    const startY = -(labelLines.length - 1) * lineHeight / 2;

    // Truncate for teaser
    const displayLines = isTeaser
        ? [labelLines[0] + (labelLines.length > 1 ? '...' : '')]
        : labelLines;

    const GRID_SCALE = 22;

    return (
        <g
            onClick={(e) => {
                e.stopPropagation();
                if (!isHidden) onClick(node);
            }}
            style={{
                cursor: isHidden ? 'default' : 'pointer',
                opacity,
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            transform={`translate(${node.x * GRID_SCALE}, ${node.y * GRID_SCALE})`}
            className={`group ${isHidden ? 'pointer-events-none' : ''}`}
        >
            {/* Hard Shadow (Offset Rect/Circle) */}
            {!isHidden && !isTeaser && (
                <rect
                    x={(-width / 2) + shadowOffset}
                    y={(-height / 2) + shadowOffset}
                    width={width}
                    height={height}
                    rx={isDecisionNode ? height / 2 : 12} // Pill for decisions, rounded rect for results
                    fill={shadowColor}
                    className="transition-all duration-300"
                />
            )}

            {/* Main Shape */}
            <rect
                x={-width / 2}
                y={-height / 2}
                width={width}
                height={height}
                rx={isDecisionNode ? height / 2 : 12}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={isTeaser ? "6 4" : undefined}
                className="transition-all duration-300 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]"
            />

            {/* Label - Optimistic Typography */}
            <text
                textAnchor="middle"
                dominantBaseline="middle"
                fill={textColor}
                fontSize={fontSize}
                fontWeight="600"
                fontFamily="Outfit, sans-serif"
                className="select-none pointer-events-none group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform duration-300"
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

            {/* Decorative 'plus' or icon for selected items could go here */}
            {isSelected && (
                <circle cx={width / 2 - 15} cy={-height / 2 + 15} r="4" fill={colors.coral} />
            )}
        </g>
    );
};

export default GraphNode;
