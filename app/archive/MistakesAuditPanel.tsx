import React from 'react';
import { MISTAKE_QUESTIONS, MistakeId, AuditScore } from '../hooks/useMistakesAudit';

interface MistakesAuditPanelProps {
    responses: Record<MistakeId, boolean | null>;
    onResponse: (id: MistakeId, value: boolean) => void;
    score: AuditScore;
    onViewReport: () => void;
    onReset: () => void;
}

const MistakesAuditPanel: React.FC<MistakesAuditPanelProps> = ({
    responses,
    onResponse,
    score,
    onViewReport,
    onReset,
}) => {
    const severityColors = {
        green: 'text-[#33ff00]',
        yellow: 'text-[#ffb000]',
        red: 'text-[#ff3333]',
    };

    return (
        <div className="absolute top-20 left-4 z-40 w-80 max-h-[calc(100vh-120px)] bg-black/95 border-2 border-[#33ff00] rounded-sm font-vt323 flex flex-col">
            {/* Header */}
            <div className="bg-[#33ff00] text-black px-3 py-2 flex justify-between items-center">
                <span className="font-bold">AI ADOPTION HEALTH AUDIT</span>
                {score.answered > 0 && (
                    <button
                        onClick={onReset}
                        className="text-sm hover:bg-black/20 px-2 rounded"
                    >
                        [RESET]
                    </button>
                )}
            </div>

            {/* Score Summary */}
            <div className="px-3 py-2 border-b border-[#33ff00]/30 bg-[#001100]/50">
                <div className="flex justify-between items-center">
                    <span className="text-[#33ff00]/70">Progress:</span>
                    <span className="text-[#33ff00]">{score.answered}/7 answered</span>
                </div>
                {score.answered > 0 && (
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-[#33ff00]/70">Status:</span>
                        <span className={severityColors[score.severity]}>
                            {score.issues === 0 ? 'All Healthy' : `${score.issues} issue${score.issues > 1 ? 's' : ''} detected`}
                        </span>
                    </div>
                )}
            </div>

            {/* Questions List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {MISTAKE_QUESTIONS.map((q, idx) => {
                    const response = responses[q.id];
                    const isAnswered = response !== null;
                    const isHealthy = response === true;
                    const isIssue = response === false;

                    return (
                        <div
                            key={q.id}
                            className={`border rounded p-2 transition-all ${isIssue
                                    ? 'border-[#ff3333]/50 bg-[#ff3333]/10'
                                    : isHealthy
                                        ? 'border-[#33ff00]/50 bg-[#33ff00]/10'
                                        : 'border-[#33ff00]/30'
                                }`}
                        >
                            <div className="text-[#33ff00]/80 text-sm mb-2">
                                {idx + 1}. {q.question}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onResponse(q.id, true)}
                                    className={`flex-1 py-1 rounded text-sm transition-all ${isHealthy
                                            ? 'bg-[#33ff00] text-black'
                                            : 'border border-[#33ff00]/50 text-[#33ff00]/70 hover:bg-[#33ff00]/20'
                                        }`}
                                >
                                    YES
                                </button>
                                <button
                                    onClick={() => onResponse(q.id, false)}
                                    className={`flex-1 py-1 rounded text-sm transition-all ${isIssue
                                            ? 'bg-[#ff3333] text-black'
                                            : 'border border-[#33ff00]/50 text-[#33ff00]/70 hover:bg-[#ff3333]/20'
                                        }`}
                                >
                                    NO
                                </button>
                            </div>
                            {isIssue && (
                                <div className="text-[#ff3333]/80 text-xs mt-1">
                                    [!] {q.mistakeLabel}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* View Report CTA */}
            {score.isComplete && (
                <div className="p-3 border-t border-[#33ff00]/30">
                    <button
                        onClick={onViewReport}
                        className={`w-full py-2 rounded font-bold transition-all ${score.severity === 'red'
                                ? 'bg-[#ff3333] text-black hover:bg-[#ff3333]/80'
                                : score.severity === 'yellow'
                                    ? 'bg-[#ffb000] text-black hover:bg-[#ffb000]/80'
                                    : 'bg-[#33ff00] text-black hover:bg-[#33ff00]/80'
                            }`}
                    >
                        VIEW AUDIT REPORT
                    </button>
                </div>
            )}

            {/* Footer */}
            <div className="px-3 py-1 text-xs text-[#33ff00]/40 border-t border-[#33ff00]/20">
                Click nodes on chart for details
            </div>
        </div>
    );
};

export default MistakesAuditPanel;
