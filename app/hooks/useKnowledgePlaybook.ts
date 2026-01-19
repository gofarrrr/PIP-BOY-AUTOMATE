import { useState, useCallback, useEffect } from 'react';

export type KnowledgePhaseId = 'diagnose' | 'extract' | 'package' | 'distribute';

export interface KnowledgePhase {
    id: KnowledgePhaseId;
    label: string;
    description: string;
    zoomTarget: { x: number; y: number; width: number; height: number };
}

export const KNOWLEDGE_PHASES: KnowledgePhase[] = [
    {
        id: 'diagnose',
        label: '1. DIAGNOSE',
        description: 'Identify the expertise bottleneck.',
        zoomTarget: { x: 0, y: 0, width: 100, height: 50 },
    },
    {
        id: 'extract',
        label: '2. EXTRACT',
        description: 'Convert mind-share to transcripts.',
        zoomTarget: { x: 0, y: 50, width: 100, height: 50 },
    },
    {
        id: 'package',
        label: '3. PACKAGE',
        description: 'Build the high-quality SOP.',
        zoomTarget: { x: 0, y: 90, width: 100, height: 40 },
    },
    {
        id: 'distribute',
        label: '4. DISTRIBUTE',
        description: 'Deploy AI tools to the team.',
        zoomTarget: { x: 0, y: 130, width: 100, height: 60 },
    },
];

const STORAGE_KEY = 'pip-boy-knowledge-playbook';

export function useKnowledgePlaybook() {
    const [activePhase, setActivePhase] = useState<KnowledgePhaseId | null>(null);

    // Persistence
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setActivePhase(stored as KnowledgePhaseId);
            }
        }
    }, []);

    const selectPhase = useCallback((phaseId: KnowledgePhaseId) => {
        setActivePhase(phaseId);
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, phaseId);
        }
    }, []);

    const resetPlaybook = useCallback(() => {
        setActivePhase(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    return {
        activePhase,
        selectPhase,
        resetPlaybook,
        phases: KNOWLEDGE_PHASES,
    };
}
