import { useState, useCallback, useEffect } from 'react';

// The 7 diagnostic questions
export const MISTAKE_QUESTIONS = [
    {
        id: 'direction',
        question: 'Is AI adoption happening from both leadership AND teams?',
        mistakeLabel: 'Single Direction',
        solutionId: 'bidirectional',
    },
    {
        id: 'governance',
        question: 'Do you have clear AI ownership and written policy?',
        mistakeLabel: 'No Governance',
        solutionId: 'ai_council',
    },
    {
        id: 'expectations',
        question: 'Do stakeholders understand demo ≠ production?',
        mistakeLabel: 'Unrealistic Expectations',
        solutionId: 'calibrate',
    },
    {
        id: 'data_ready',
        question: 'Is your key knowledge consolidated and accessible?',
        mistakeLabel: 'Poor Data Access',
        solutionId: 'data_first',
    },
    {
        id: 'vendor_strategy',
        question: 'Do you have structured vendor evaluation?',
        mistakeLabel: 'Wrong Build/Buy',
        solutionId: 'build_buy',
    },
    {
        id: 'sharing',
        question: 'Do teams communicate and share AI learnings?',
        mistakeLabel: 'Siloed Communication',
        solutionId: 'ai_network',
    },
    {
        id: 'urgency',
        question: 'Are you acting now instead of waiting?',
        mistakeLabel: 'Waiting Too Long',
        solutionId: 'start_now',
    },
] as const;

export type MistakeId = typeof MISTAKE_QUESTIONS[number]['id'];

export interface MistakeAuditState {
    responses: Record<MistakeId, boolean | null>;
    completedAt: number | null;
}

export interface AuditScore {
    total: number;
    healthy: number;
    issues: number;
    answered: number;
    isComplete: boolean;
    severity: 'green' | 'yellow' | 'red';
    issueIds: MistakeId[];
}

const STORAGE_KEY = 'pip-boy-mistakes-audit';

const initialResponses: Record<MistakeId, boolean | null> = {
    direction: null,
    governance: null,
    expectations: null,
    data_ready: null,
    vendor_strategy: null,
    sharing: null,
    urgency: null,
};

const initialState: MistakeAuditState = {
    responses: initialResponses,
    completedAt: null,
};

export function useMistakesAudit() {
    const [state, setState] = useState<MistakeAuditState>(() => {
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

    // Set response for a question
    const setResponse = useCallback((mistakeId: MistakeId, value: boolean) => {
        setState(prev => {
            const newResponses = { ...prev.responses, [mistakeId]: value };
            const allAnswered = Object.values(newResponses).every(v => v !== null);

            return {
                responses: newResponses,
                completedAt: allAnswered ? (prev.completedAt || Date.now()) : null,
            };
        });
    }, []);

    // Calculate score
    const getScore = useCallback((): AuditScore => {
        const responses = state.responses;
        const answered = Object.values(responses).filter(v => v !== null).length;
        const healthy = Object.values(responses).filter(v => v === true).length;
        const issues = Object.values(responses).filter(v => v === false).length;
        const isComplete = answered === 7;

        // Find which mistakes they're making
        const issueIds = Object.entries(responses)
            .filter(([_, value]) => value === false)
            .map(([id]) => id as MistakeId);

        // Determine severity
        let severity: 'green' | 'yellow' | 'red' = 'green';
        if (issues >= 5) {
            severity = 'red';
        } else if (issues >= 3) {
            severity = 'yellow';
        }

        return {
            total: 7,
            healthy,
            issues,
            answered,
            isComplete,
            severity,
            issueIds,
        };
    }, [state.responses]);

    // Reset the audit
    const resetAudit = useCallback(() => {
        setState(initialState);
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    return {
        responses: state.responses,
        setResponse,
        getScore,
        resetAudit,
        isComplete: state.completedAt !== null,
    };
}
