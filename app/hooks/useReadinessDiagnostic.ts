import { useState, useCallback, useEffect } from 'react';

// Types for diagnostic state
export interface DiagnosticState {
    visitedNodes: string[];
    pathDecisions: Record<string, 'yes' | 'no' | 'conservative' | 'experimental' | 'not yet'>;
    currentOutcome: string | null;
    startedAt: number | null;
}

export interface PathSummary {
    decisions: Array<{ nodeId: string; label: string; choice: string }>;
    outcome: string | null;
    outcomeLabel: string | null;
    pathDescription: string;
}

const STORAGE_KEY = 'pip-boy-diagnostic-readiness';

const initialState: DiagnosticState = {
    visitedNodes: [],
    pathDecisions: {},
    currentOutcome: null,
    startedAt: null,
};

// Outcome node IDs (from constants-readiness.ts)
const OUTCOME_NODES = ['initiate', 'grassroots_tinkerers', 'visionary_bottleneck', 'cautious_incumbent', 'foundation_builder', 'agent_ready'];

// Decision node labels
const NODE_LABELS: Record<string, string> = {
    assess: 'Start',
    exec_mandate: 'Executive Mandate',
    grassroots: 'Grassroots Energy',
    governance: 'AI Governance',
    data_ready: 'Data Accessibility',
    risk_appetite: 'Risk Culture',
    quick_wins: 'Execution Results',
    // Outcomes
    initiate: 'Initiate',
    grassroots_tinkerers: 'Grassroots Tinkerers',
    visionary_bottleneck: 'Visionary Bottleneck',
    cautious_incumbent: 'Cautious Incumbent',
    foundation_builder: 'Foundation Builder',
    agent_ready: 'Agent Ready'
};

export function useReadinessDiagnostic() {
    const [state, setState] = useState<DiagnosticState>(() => {
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    }, [state]);

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

    const recordDecision = useCallback((fromNodeId: string, choice: string) => {
        setState(prev => ({
            ...prev,
            pathDecisions: {
                ...prev.pathDecisions,
                [fromNodeId]: choice as any,
            },
        }));
    }, []);

    const getPathSummary = useCallback((): PathSummary => {
        const decisions = Object.entries(state.pathDecisions).map(([nodeId, choice]) => ({
            nodeId,
            label: NODE_LABELS[nodeId] || nodeId,
            choice,
        }));

        const pathParts: string[] = [];
        if (state.pathDecisions.exec_mandate) {
            pathParts.push(`Mandate: ${state.pathDecisions.exec_mandate.toUpperCase()}`);
        }
        if (state.pathDecisions.grassroots) {
            pathParts.push(`Grassroots: ${state.pathDecisions.grassroots.toUpperCase()}`);
        }
        if (state.pathDecisions.governance) {
            pathParts.push(`Governance: ${state.pathDecisions.governance.toUpperCase()}`);
        }
        if (state.pathDecisions.data_ready) {
            pathParts.push(`Data: ${state.pathDecisions.data_ready.toUpperCase()}`);
        }
        if (state.pathDecisions.risk_appetite) {
            pathParts.push(`Risk: ${state.pathDecisions.risk_appetite.toUpperCase()}`);
        }
        if (state.pathDecisions.quick_wins) {
            pathParts.push(`Wins: ${state.pathDecisions.quick_wins.toUpperCase()}`);
        }

        return {
            decisions,
            outcome: state.currentOutcome,
            outcomeLabel: state.currentOutcome ? NODE_LABELS[state.currentOutcome] : null,
            pathDescription: pathParts.join(' → ') || 'No decisions recorded',
        };
    }, [state.pathDecisions, state.currentOutcome]);

    const isComplete = state.currentOutcome !== null;
    const isInProgress = state.visitedNodes.length > 0 && !isComplete;

    const resetDiagnostic = useCallback(() => {
        setState(initialState);
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    const getProgress = useCallback(() => {
        const decisionCount = Object.keys(state.pathDecisions).length;
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
