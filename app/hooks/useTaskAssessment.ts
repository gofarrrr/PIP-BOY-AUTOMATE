import { useState, useCallback, useEffect } from 'react';

export interface TaskAssessmentState {
    taskName: string;
    visitedNodes: string[];
    path: Array<{ nodeId: string; choice: 'yes' | 'no' }>;
    currentOutcome: string | null;
    mode: 'learn' | 'assess';
}

const STORAGE_KEY = 'pip-boy-task-assessment';

const initialState: TaskAssessmentState = {
    taskName: '',
    visitedNodes: [],
    path: [],
    currentOutcome: null,
    mode: 'learn',
};

export function useTaskAssessment() {
    const [state, setState] = useState<TaskAssessmentState>(() => {
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

    // Persist to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    }, [state]);

    const setMode = useCallback((mode: 'learn' | 'assess') => {
        setState(prev => ({ ...prev, mode }));
    }, []);

    const startAssessment = useCallback((taskName: string) => {
        setState(prev => ({
            ...initialState,
            taskName,
            mode: 'assess',
            visitedNodes: ['often'], // Always start at the first node
        }));
    }, []);

    const recordDecision = useCallback((nodeId: string, choice: 'yes' | 'no', nextNodeId: string | null) => {
        setState(prev => {
            const isOutcome = nextNodeId === 'automate' || nextNodeId === 'augment' || nextNodeId === 'diy';

            return {
                ...prev,
                path: [...prev.path, { nodeId, choice }],
                visitedNodes: nextNodeId ? [...prev.visitedNodes, nextNodeId] : prev.visitedNodes,
                currentOutcome: isOutcome ? nextNodeId : prev.currentOutcome,
            };
        });
    }, []);

    const resetAssessment = useCallback(() => {
        setState(initialState);
    }, []);

    const isNodeVisited = useCallback((nodeId: string) => {
        return state.visitedNodes.includes(nodeId);
    }, [state.visitedNodes]);

    const isCurrentNode = useCallback((nodeId: string) => {
        return state.visitedNodes[state.visitedNodes.length - 1] === nodeId;
    }, [state.visitedNodes]);

    return {
        ...state,
        setMode,
        startAssessment,
        recordDecision,
        resetAssessment,
        isNodeVisited,
        isCurrentNode,
        isComplete: !!state.currentOutcome,
    };
}
