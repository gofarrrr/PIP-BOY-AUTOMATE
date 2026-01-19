import { useState, useCallback, useEffect } from 'react';

// Types for diagnostic state
export interface DiagnosticState {
    visitedNodes: string[];
    pathDecisions: Record<string, 'yes' | 'no'>;
    currentOutcome: string | null;
    startedAt: number | null;
}

export interface PathSummary {
    decisions: Array<{ nodeId: string; label: string; choice: 'yes' | 'no' }>;
    outcome: string | null;
    outcomeLabel: string | null;
    pathDescription: string;
}

const STORAGE_KEY = 'pip-boy-diagnostic-strategy';

const initialState: DiagnosticState = {
    visitedNodes: [],
    pathDecisions: {},
    currentOutcome: null,
    startedAt: null,
};

// Outcome node IDs (from constants-strategy.ts)
const OUTCOME_NODES = ['efficiency', 'get_lean', 'move_up', 'build_moats', 'invest_talent', 'death_trap'];

// Decision node labels for blueprint generation
const NODE_LABELS: Record<string, string> = {
    atoms: 'Physical Business',
    contestable: 'Market Contestability',
    layer1: 'Cognitive Production',
    midtier: 'Mid-tier Overhead',
    distribution: 'Distribution Moats',
    can_lean: 'Lean Capability',
    can_pivot: 'Pivot Capability',
    // Outcomes
    efficiency: 'Efficiency Play',
    get_lean: 'Get Lean',
    move_up: 'Move Up Stack',
    build_moats: 'Build Moats',
    invest_talent: 'Invest in Talent',
    death_trap: 'Death Trap',
};

export function useDiagnosticPath() {
    const [state, setState] = useState<DiagnosticState>(() => {
        // Load from localStorage on initial mount
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch {
                    return initialState;
                }
            }
        }
        return initialState;
    });

    // Persist to localStorage whenever state changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    }, [state]);

    // Record when user visits a node
    const recordNodeVisit = useCallback((nodeId: string) => {
        setState(prev => {
            const isOutcome = OUTCOME_NODES.includes(nodeId);
            const alreadyVisited = prev.visitedNodes.includes(nodeId);

            return {
                ...prev,
                visitedNodes: alreadyVisited ? prev.visitedNodes : [...prev.visitedNodes, nodeId],
                currentOutcome: isOutcome ? nodeId : prev.currentOutcome,
                startedAt: prev.startedAt || Date.now(),
            };
        });
    }, []);

    // Record a decision (Yes/No choice on an edge)
    const recordDecision = useCallback((fromNodeId: string, choice: 'yes' | 'no') => {
        setState(prev => ({
            ...prev,
            pathDecisions: {
                ...prev.pathDecisions,
                [fromNodeId]: choice,
            },
        }));
    }, []);

    // Generate path summary for blueprint
    const getPathSummary = useCallback((): PathSummary => {
        const decisions = Object.entries(state.pathDecisions).map(([nodeId, choice]) => ({
            nodeId,
            label: NODE_LABELS[nodeId] || nodeId,
            choice,
        }));

        // Build human-readable path description
        let pathDescription = 'Your diagnostic path: ';
        const pathParts: string[] = [];

        // Follow the logical path through decisions
        if (state.pathDecisions.atoms === 'yes') {
            pathParts.push('Physical Business (atoms)');
        } else if (state.pathDecisions.atoms === 'no') {
            pathParts.push('Digital Business (bits)');
            if (state.pathDecisions.contestable === 'yes') {
                pathParts.push('Contestable Market');
                if (state.pathDecisions.layer1 === 'yes') {
                    pathParts.push('Selling Cognitive Production');
                    if (state.pathDecisions.midtier === 'yes') {
                        pathParts.push('Mid-tier Squeeze Zone');
                    }
                } else if (state.pathDecisions.layer1 === 'no') {
                    pathParts.push('Selling Judgment');
                }
            } else if (state.pathDecisions.contestable === 'no') {
                pathParts.push('Protected Market');
            }
        }

        if (state.pathDecisions.distribution === 'yes') {
            pathParts.push('Has Distribution Moats');
        } else if (state.pathDecisions.distribution === 'no') {
            pathParts.push('No Distribution Moats');
        }

        if (state.pathDecisions.can_lean === 'yes') {
            pathParts.push('Can Get Lean');
        } else if (state.pathDecisions.can_lean === 'no') {
            pathParts.push('Cannot Get Lean');
            if (state.pathDecisions.can_pivot === 'yes') {
                pathParts.push('Can Pivot to Judgment');
            } else if (state.pathDecisions.can_pivot === 'no') {
                pathParts.push('Cannot Pivot');
            }
        }

        pathDescription = pathParts.length > 0 ? pathParts.join(' → ') : 'No decisions recorded yet';

        return {
            decisions,
            outcome: state.currentOutcome,
            outcomeLabel: state.currentOutcome ? NODE_LABELS[state.currentOutcome] : null,
            pathDescription,
        };
    }, [state.pathDecisions, state.currentOutcome]);

    // Check if user has completed the diagnostic
    const isComplete = state.currentOutcome !== null;

    // Check if diagnostic is in progress
    const isInProgress = state.visitedNodes.length > 0 && !isComplete;

    // Reset the diagnostic
    const resetDiagnostic = useCallback(() => {
        setState(initialState);
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    // Get progress percentage (approximate)
    const getProgress = useCallback(() => {
        const decisionCount = Object.keys(state.pathDecisions).length;
        // Most paths are 3-5 decisions deep
        return Math.min(100, Math.round((decisionCount / 4) * 100));
    }, [state.pathDecisions]);

    return {
        state,
        recordNodeVisit,
        recordDecision,
        getPathSummary,
        isComplete,
        isInProgress,
        resetDiagnostic,
        getProgress,
    };
}
