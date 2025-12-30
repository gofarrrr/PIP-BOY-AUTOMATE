// Interview summary display component

import React from 'react';
import type { InterviewSummary, KeyFactor, CognitiveMotif } from '../types/interview';
import { NODE_LABELS, VERDICT_EXPLANATIONS } from '../services/geminiConfig';

interface InterviewSummaryProps {
    summary: InterviewSummary;
    onViewTrace: () => void;
    onExport: () => void;
    onStartNew: () => void;
    onClose: () => void;
}

const InterviewSummaryDisplay: React.FC<InterviewSummaryProps> = ({
    summary,
    onViewTrace,
    onExport,
    onStartNew,
    onClose
}) => {
    const verdictColors = {
        automate: 'text-green-400 border-green-400',
        augment: 'text-yellow-400 border-yellow-400',
        diy: 'text-red-400 border-red-400'
    };

    const verdictLabels = {
        automate: 'AUTOMATE',
        augment: 'AUGMENT',
        diy: 'DO IT YOURSELF'
    };

    const renderKeyFactor = (factor: KeyFactor) => {
        const icon = factor.impact === 'positive' ? '✓' : factor.impact === 'negative' ? '⚠' : '○';
        const color = factor.impact === 'positive'
            ? 'text-green-400'
            : factor.impact === 'negative'
                ? 'text-yellow-400'
                : 'text-[#33ff00]/60';

        return (
            <div key={factor.nodeId} className={`flex items-start gap-2 ${color}`}>
                <span>{icon}</span>
                <div>
                    <span className="font-bold">{factor.label}</span>
                    <span className="text-[#33ff00]/60"> – {factor.reasoning}</span>
                </div>
            </div>
        );
    };

    const renderMotif = (motif: CognitiveMotif) => (
        <div key={motif.id} className="border border-[#33ff00]/30 rounded p-2 bg-black/30">
            <div className="text-[#33ff00] font-bold">"{motif.pattern}"</div>
            {motif.examples.length > 0 && (
                <div className="text-[#33ff00]/50 text-sm mt-1">
                    Based on: "{motif.examples[0]}"
                </div>
            )}
        </div>
    );

    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="font-vt323 text-[#33ff00] p-6 max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="text-2xl mb-2">ANALYSIS COMPLETE</div>
                <div className="text-sm text-[#33ff00]/50">
                    Duration: {formatDuration(summary.duration)}
                </div>
            </div>

            {/* Verdict */}
            <div className={`text-center mb-8 p-4 border-2 ${verdictColors[summary.verdict]} rounded-lg`}>
                <div className="text-4xl font-bold">
                    {verdictLabels[summary.verdict]}
                </div>
                <div className="text-lg mt-2 text-[#33ff00]/70">
                    {VERDICT_EXPLANATIONS[summary.verdict]}
                </div>
            </div>

            {/* Key Factors */}
            <div className="mb-6">
                <div className="text-xl mb-3 border-b border-[#33ff00]/30 pb-1">
                    KEY FACTORS
                </div>
                <div className="space-y-2">
                    {summary.keyFactors.map(renderKeyFactor)}
                </div>
            </div>

            {/* Cognitive Motifs */}
            {summary.motifs.length > 0 && (
                <div className="mb-6">
                    <div className="text-xl mb-3 border-b border-[#33ff00]/30 pb-1">
                        YOUR REASONING PATTERNS
                    </div>
                    <div className="space-y-2">
                        {summary.motifs.map(renderMotif)}
                    </div>
                </div>
            )}

            {/* Path */}
            <div className="mb-8">
                <div className="text-xl mb-3 border-b border-[#33ff00]/30 pb-1">
                    DECISION PATH
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {summary.path.map((nodeId, index) => (
                        <React.Fragment key={nodeId}>
                            <span className="px-2 py-1 bg-[#33ff00]/10 rounded border border-[#33ff00]/30">
                                {NODE_LABELS[nodeId] || nodeId}
                            </span>
                            {index < summary.path.length - 1 && (
                                <span className="text-[#33ff00]/30">→</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 justify-center">
                <button
                    onClick={onViewTrace}
                    className="px-4 py-2 border border-[#33ff00] rounded hover:bg-[#33ff00]/10 transition-colors"
                >
                    VIEW REASONING TRACE
                </button>
                <button
                    onClick={onExport}
                    className="px-4 py-2 border border-[#33ff00] rounded hover:bg-[#33ff00]/10 transition-colors"
                >
                    EXPORT
                </button>
                <button
                    onClick={onStartNew}
                    className="px-4 py-2 border border-[#33ff00] rounded hover:bg-[#33ff00]/10 transition-colors"
                >
                    START NEW
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-[#33ff00] text-black rounded hover:bg-[#33ff00]/80 transition-colors"
                >
                    BACK TO GRAPH
                </button>
            </div>
        </div>
    );
};

export default InterviewSummaryDisplay;
