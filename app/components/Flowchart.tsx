import React, { useEffect, useRef } from 'react';
import { SelectedItem, FlowNode, FlowEdge } from '../types';
import GraphNode from './GraphNode';
import type { NodeHighlightType } from './GraphNode';
import GraphEdge from './GraphEdge';
import ZoomControls from './ZoomControls';
import { useZoom } from '../hooks/useZoom';
import type { VisibilityState } from '../hooks/useProgressiveReveal';
import '../themes/optimistic.css';

interface FlowchartProps {
    nodes: FlowNode[];
    edges: FlowEdge[];
    onSelect: (item: SelectedItem) => void;
    selectedItem: SelectedItem | null;
    onZoomToNode?: (node: FlowNode) => void;
    visitedNodes?: string[];
    visitedEdges?: string[];
    currentNodeId?: string | null;
    zoomArea?: { x: number; y: number; width: number; height: number } | null;
    nodeVisibility?: Record<string, VisibilityState>;
    edgeVisibility?: Record<string, VisibilityState>;
    startNodeId?: string | null;
    nodeHighlights?: Record<string, NodeHighlightType>;
}

const Flowchart: React.FC<FlowchartProps> = ({
    nodes,
    edges,
    onSelect,
    selectedItem,
    visitedNodes = [],
    visitedEdges = [],
    currentNodeId = null,
    zoomArea = null,
    nodeVisibility,
    edgeVisibility,
    startNodeId = null,
    nodeHighlights = {},
}) => {
    const {
        viewBox,
        zoomLevel,
        zoomIn,
        zoomOut,
        zoomToNode,
        zoomToArea,
        resetZoom,
        handleWheel,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseLeave,
        isPanning,
    } = useZoom(true); // Assuming 'true' here meant 'use editorial zoom settings', reused for optimistic

    useEffect(() => {
        if (zoomArea) {
            zoomToArea(zoomArea);
        }
    }, [zoomArea, zoomToArea]);

    const hasAutoZoomedRef = useRef<string | null>(null);

    useEffect(() => {
        if (startNodeId && hasAutoZoomedRef.current !== startNodeId) {
            const startNode = nodes.find(n => n.id === startNodeId);
            if (startNode) {
                hasAutoZoomedRef.current = startNodeId;
                const timer = setTimeout(() => {
                    zoomToNode(startNode);
                }, 100);
                return () => clearTimeout(timer);
            }
        }
    }, [startNodeId, nodes, zoomToNode]);

    const handleNodeClick = (node: FlowNode) => {
        onSelect({ type: 'node', data: node });
        zoomToNode(node);
    };

    const viewBoxString = `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;

    return (
        <div className="theme-optimistic w-full h-full flex items-center justify-center overflow-hidden p-4 relative"
            style={{ background: 'var(--bg-primary)' }}>
            {/* Texture Background */}
            <div className="texture-grain"></div>

            {/* SVG Flowchart */}
            <svg
                viewBox={viewBoxString}
                className="w-full h-full max-w-[1200px] max-h-[1200px] relative z-10"
                preserveAspectRatio="xMidYMid meet"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: isPanning ? 'grabbing' : (zoomLevel > 0 ? 'grab' : 'default') }}
            >
                <defs>
                    {/* Optimistic Arrow Markers using Theme Colors */}
                    <marker
                        id="arrowhead-optimistic"
                        markerWidth="16"
                        markerHeight="12"
                        refX="14"
                        refY="6"
                        orient="auto"
                    >
                        {/* Thicker, bolder arrow */}
                        <path d="M0,0 L16,6 L0,12" fill="none" stroke="#1E3D2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </marker>
                </defs>

                {/* 1. Edges Paths Layer */}
                {edges.map(edge => {
                    const from = nodes.find(n => n.id === edge.from);
                    const to = nodes.find(n => n.id === edge.to);
                    if (!from || !to) return null;
                    const isSelected = selectedItem?.type === 'edge' && selectedItem.data.id === edge.id;
                    const isVisited = visitedEdges.includes(edge.id);
                    const visibility = edgeVisibility?.[edge.id] || 'revealed';
                    return (
                        <GraphEdge
                            key={`path-${edge.id}`}
                            edge={edge}
                            fromNode={from}
                            toNode={to}
                            onClick={(e) => onSelect({ type: 'edge', data: e })}
                            isSelected={isSelected}
                            isVisited={isVisited}
                            renderPart="path"
                            visibilityState={visibility}
                        />
                    );
                })}

                {/* 2. Nodes Layer */}
                {nodes.map(node => {
                    const isSelected = selectedItem?.type === 'node' && selectedItem.data.id === node.id;
                    const isVisited = visitedNodes.includes(node.id);
                    const isCurrent = currentNodeId === node.id;
                    const visibility = nodeVisibility?.[node.id] || 'revealed';
                    const highlight = nodeHighlights[node.id] || null;
                    return (
                        <GraphNode
                            key={node.id}
                            node={node}
                            onClick={handleNodeClick}
                            isSelected={isSelected || isCurrent}
                            isVisited={isVisited && !isCurrent}
                            visibilityState={visibility}
                            highlightType={highlight}
                        />
                    );
                })}

                {/* 3. Edges Labels Layer */}
                {edges.map(edge => {
                    const from = nodes.find(n => n.id === edge.from);
                    const to = nodes.find(n => n.id === edge.to);
                    if (!from || !to) return null;
                    const isSelected = selectedItem?.type === 'edge' && selectedItem.data.id === edge.id;
                    const isVisited = visitedEdges.includes(edge.id);
                    const visibility = edgeVisibility?.[edge.id] || 'revealed';
                    return (
                        <GraphEdge
                            key={`label-${edge.id}`}
                            edge={edge}
                            fromNode={from}
                            toNode={to}
                            onClick={(e) => onSelect({ type: 'edge', data: e })}
                            isSelected={isSelected}
                            isVisited={isVisited}
                            renderPart="label"
                            visibilityState={visibility}
                        />
                    );
                })}
            </svg>

            {/* Zoom Controls */}
            <ZoomControls
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                onReset={resetZoom}
                zoomLevel={zoomLevel}
                maxLevel={4}
            />
        </div>
    );
};

export default Flowchart;
