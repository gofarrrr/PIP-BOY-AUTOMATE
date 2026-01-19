import { useState, useCallback, useMemo } from 'react';
import { FlowNode, FlowEdge } from '../types';

export type VisibilityState = 'revealed' | 'teaser' | 'hidden';

interface RevealState {
    revealedNodes: Set<string>;
    startNodeId: string;
}

/**
 * Hook for managing progressive revelation of graph nodes.
 * Only reveals nodes as the user navigates, creating an RPG-style experience.
 */
export function useProgressiveReveal(
    nodes: FlowNode[],
    edges: FlowEdge[],
    startNodeId: string
) {
    const [state, setState] = useState<RevealState>(() => ({
        revealedNodes: new Set([startNodeId]),
        startNodeId,
    }));

    // Build adjacency map for quick lookups
    const adjacencyMap = useMemo(() => {
        const map = new Map<string, { nodes: string[]; edges: string[] }>();

        // Initialize all nodes
        nodes.forEach(node => {
            map.set(node.id, { nodes: [], edges: [] });
        });

        // Add edges to adjacency
        edges.forEach(edge => {
            const fromEntry = map.get(edge.from);
            if (fromEntry) {
                fromEntry.nodes.push(edge.to);
                fromEntry.edges.push(edge.id);
            }
        });

        return map;
    }, [nodes, edges]);

    // Get adjacent node IDs for a given node
    const getAdjacentNodes = useCallback((nodeId: string): string[] => {
        return adjacencyMap.get(nodeId)?.nodes || [];
    }, [adjacencyMap]);

    // Get adjacent edge IDs for a given node
    const getAdjacentEdges = useCallback((nodeId: string): string[] => {
        return adjacencyMap.get(nodeId)?.edges || [];
    }, [adjacencyMap]);

    // Reveal a node (and its adjacent nodes as teasers)
    const revealNode = useCallback((nodeId: string) => {
        setState(prev => {
            const newRevealed = new Set(prev.revealedNodes);
            newRevealed.add(nodeId);
            return {
                ...prev,
                revealedNodes: newRevealed,
            };
        });
    }, []);

    // Calculate visibility state for a node
    const getNodeVisibility = useCallback((nodeId: string): VisibilityState => {
        // Revealed nodes are fully visible
        if (state.revealedNodes.has(nodeId)) {
            return 'revealed';
        }

        // Check if this node is adjacent to any revealed node
        for (const revealedId of state.revealedNodes) {
            const adjacent = getAdjacentNodes(revealedId);
            if (adjacent.includes(nodeId)) {
                return 'teaser';
            }
        }

        // Everything else is hidden
        return 'hidden';
    }, [state.revealedNodes, getAdjacentNodes]);

    // Calculate visibility state for an edge
    const getEdgeVisibility = useCallback((edgeId: string, fromNodeId: string, toNodeId: string): VisibilityState => {
        // Edge is revealed if both endpoints are revealed
        if (state.revealedNodes.has(fromNodeId) && state.revealedNodes.has(toNodeId)) {
            return 'revealed';
        }

        // Edge is teaser if from is revealed and to is teaser
        if (state.revealedNodes.has(fromNodeId)) {
            const toVisibility = getNodeVisibility(toNodeId);
            if (toVisibility === 'teaser') {
                return 'teaser';
            }
        }

        return 'hidden';
    }, [state.revealedNodes, getNodeVisibility]);

    // Build complete visibility maps
    const nodeVisibilityMap = useMemo(() => {
        const map: Record<string, VisibilityState> = {};
        nodes.forEach(node => {
            map[node.id] = getNodeVisibility(node.id);
        });
        return map;
    }, [nodes, getNodeVisibility]);

    const edgeVisibilityMap = useMemo(() => {
        const map: Record<string, VisibilityState> = {};
        edges.forEach(edge => {
            map[edge.id] = getEdgeVisibility(edge.id, edge.from, edge.to);
        });
        return map;
    }, [edges, getEdgeVisibility]);

    // Reset to initial state
    const resetReveal = useCallback(() => {
        setState({
            revealedNodes: new Set([startNodeId]),
            startNodeId,
        });
    }, [startNodeId]);

    return {
        revealNode,
        resetReveal,
        getNodeVisibility,
        getEdgeVisibility,
        getAdjacentNodes,
        getAdjacentEdges,
        nodeVisibilityMap,
        edgeVisibilityMap,
        revealedNodes: Array.from(state.revealedNodes),
    };
}
