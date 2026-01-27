import React from 'react';
import { KnowledgePhaseId, KnowledgePhase } from '../hooks/useKnowledgePlaybook';
import { useTheme } from '../context/ThemeContext';

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
    const { theme } = useTheme();
    const isCleanTheme = theme === 'clean';

    if (isCleanTheme) {
        // Clean Mode - Modern card-based design
        return (
            <div className="absolute top-20 left-4 z-40 w-80 bg-white border-2 border-gray-200 rounded-xl font-body shadow-lg">
                {/* Header */}
                <div className="bg-[#FFDE59] text-gray-800 px-4 py-3 font-semibold text-lg rounded-t-lg">
                    Knowledge Cloning Lifecycle
                </div>

                {/* Status */}
                <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className="text-blue-600 font-medium">
                        {activePhase ? `Phase ${phases.findIndex(p => p.id === activePhase) + 1} Active` : 'Select a phase to begin'}
                    </span>
                </div>

                {/* Lifecycle Steps */}
                <div className="p-3 space-y-2">
                    {phases.map((phase, idx) => {
                        const isActive = activePhase === phase.id;
                        const isCompleted = activePhase && phases.findIndex(p => p.id === activePhase) > idx;

                        return (
                            <button
                                key={phase.id}
                                onClick={() => onPhaseSelect(phase.id)}
                                className={`w-full text-left p-4 border-2 rounded-xl transition-all cursor-pointer ${isActive
                                        ? 'border-[#FFDE59] bg-[#FFDE59]/10 shadow-md'
                                        : isCompleted
                                            ? 'border-green-300 bg-green-50 text-gray-600'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-500'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`font-semibold text-base ${isActive ? 'text-gray-800' : isCompleted ? 'text-green-700' : 'text-gray-700'
                                        }`}>
                                        {idx + 1}. {phase.label}
                                    </span>
                                    {isCompleted && <span className="text-green-500 text-lg">✓</span>}
                                    {isActive && <span className="text-[#FFDE59] text-lg">→</span>}
                                </div>
                                <p className="text-sm leading-snug text-gray-500">
                                    {phase.description}
                                </p>
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100 text-center">
                    Click a phase to zoom to that cluster
                </div>
            </div>
        );
    }

    // Pip-Boy Mode - Original terminal design
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
                            className={`w-full text-left p-3 border-2 transition-all group relative overflow-hidden cursor-pointer ${isActive
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
