import React from 'react';
import { KnowledgePhaseId, KnowledgePhase } from '../hooks/useKnowledgePlaybook';

interface KnowledgeLifecycleHUDProps {
    activePhase: KnowledgePhaseId | null;
    phases: KnowledgePhase[];
    onPhaseSelect: (id: KnowledgePhaseId) => void;
}

const KnowledgeLifecycleHUD: React.FC<KnowledgeLifecycleHUDProps> = ({
    activePhase,
    phases,
    onPhaseSelect,
}) => {
    return (
        <div className="absolute top-20 left-4 z-40 w-80 bg-black/95 border-2 border-[#33ff00] rounded-sm font-vt323 backdrop-blur-md">
            {/* Header */}
            <div className="bg-[#33ff00] text-black px-3 py-1 font-bold text-lg tracking-wider">
                KNOWLEDGE CLONING LIFECYCLE
            </div>

            {/* Progress Bar Display */}
            <div className="px-3 py-2 border-b border-[#33ff00]/30 flex justify-between items-center text-xs">
                <span className="text-[#33ff00]/60">STATUS:</span>
                <span className="text-[#33ff00] animate-pulse">
                    {activePhase ? `PHASE_${phases.findIndex(p => p.id === activePhase) + 1}_ACTIVE` : 'AWAITING_INITIALIZATION'}
                </span>
            </div>

            {/* Lifecycle Steps */}
            <div className="p-2 space-y-2">
                {phases.map((phase, idx) => {
                    const isActive = activePhase === phase.id;
                    const isCompleted = activePhase && phases.findIndex(p => p.id === activePhase) > idx;

                    return (
                        <button
                            key={phase.id}
                            onClick={() => onPhaseSelect(phase.id)}
                            className={`w-full text-left p-3 border-2 transition-all group relative overflow-hidden ${isActive
                                    ? 'border-[#33ff00] bg-[#33ff00]/10'
                                    : isCompleted
                                        ? 'border-[#33ff00]/40 bg-[#33ff00]/5 text-[#33ff00]/70'
                                        : 'border-[#33ff00]/20 hover:border-[#33ff00]/50 text-[#33ff00]/40'
                                }`}
                        >
                            {/* Scanline effect for active item */}
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#33ff00]/5 to-transparent h-1/2 w-full animate-scan" />
                            )}

                            <div className="flex justify-between items-start mb-1">
                                <span className={`font-bold text-lg ${isActive ? 'text-[#33ff00]' : ''}`}>
                                    {phase.label}
                                </span>
                                {isCompleted && <span className="text-[#33ff00]">✓</span>}
                            </div>
                            <p className="text-sm leading-tight opacity-70">
                                {phase.description}
                            </p>
                        </button>
                    );
                })}
            </div>

            {/* Footer Instructions */}
            <div className="px-3 py-2 text-[10px] text-[#33ff00]/30 border-t border-[#33ff00]/20 text-center italic">
                SELECT A PHASE TO CENTER THE DIAGNOSTIC CLUSTER
            </div>
        </div>
    );
};

export default KnowledgeLifecycleHUD;
