import React from 'react';
import { PathSummary } from '../hooks/useDiagnosticPath';

interface BlueprintGeneratorProps {
    isComplete: boolean;
    onGenerate: () => void;
    pathSummary: PathSummary;
}

const BlueprintGenerator: React.FC<BlueprintGeneratorProps> = ({
    isComplete,
    onGenerate,
    pathSummary,
}) => {
    if (!isComplete) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-pulse">
            <button
                onClick={onGenerate}
                className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#33ff00] to-[#00ff88] text-black font-vt323 text-xl rounded-lg hover:from-[#44ff11] hover:to-[#11ff99] transition-all shadow-lg shadow-[#33ff00]/40 hover:shadow-[#33ff00]/60 border-2 border-[#33ff00]"
            >
                <span className="text-2xl">[+]</span>
                <span className="flex flex-col items-start">
                    <span className="text-lg font-bold">DIAGNOSTIC COMPLETE</span>
                    <span className="text-sm opacity-80">Generate My Survival Blueprint</span>
                </span>
                <span className="text-2xl">→</span>
            </button>
        </div>
    );
};

export default BlueprintGenerator;
