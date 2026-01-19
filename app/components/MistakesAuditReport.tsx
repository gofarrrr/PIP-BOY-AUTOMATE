import React from 'react';
import { MISTAKE_QUESTIONS, MistakeId, AuditScore } from '../hooks/useMistakesAudit';
import { MISTAKES_NODES } from '../constants-mistakes';

interface MistakesAuditReportProps {
    score: AuditScore;
    onClose: () => void;
    onReset: () => void;
}

// Get solution node content by ID
const getSolutionContent = (solutionId: string) => {
    const node = MISTAKES_NODES.find(n => n.id === solutionId);
    return node?.description || null;
};

const MistakesAuditReport: React.FC<MistakesAuditReportProps> = ({
    score,
    onClose,
    onReset,
}) => {
    const severityColors = {
        green: 'border-[#33ff00] bg-[#33ff00]/10',
        yellow: 'border-[#ffb000] bg-[#ffb000]/10',
        red: 'border-[#ff3333] bg-[#ff3333]/10',
    };

    const severityTextColors = {
        green: 'text-[#33ff00]',
        yellow: 'text-[#ffb000]',
        red: 'text-[#ff3333]',
    };

    const severityTitles = {
        green: 'HEALTHY ADOPTION',
        yellow: 'NEEDS ATTENTION',
        red: 'CRITICAL ISSUES',
    };

    const severityMessages = {
        green: 'Your AI adoption practices are solid. Keep iterating and stay vigilant.',
        yellow: 'You have some gaps that could slow your AI journey. Address these to accelerate.',
        red: 'Multiple critical gaps detected. These issues will block successful AI adoption.',
    };

    // Get the issues with their questions and solutions
    const issues = score.issueIds.map(id => {
        const question = MISTAKE_QUESTIONS.find(q => q.id === id)!;
        const solution = getSolutionContent(question.solutionId);
        return { id, question, solution };
    });

    return (
        <div className="fixed inset-0 z-50 bg-black/95 overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className={`max-w-2xl w-full border-2 ${severityColors[score.severity]} rounded-lg font-vt323`}>
                    {/* Header */}
                    <div className={`${severityTextColors[score.severity]} bg-black px-6 py-4 border-b border-current flex justify-between items-center`}>
                        <div>
                            <div className="text-sm opacity-70">AI ADOPTION HEALTH AUDIT</div>
                            <h1 className="text-3xl font-bold">{severityTitles[score.severity]}</h1>
                        </div>
                        <button
                            onClick={onClose}
                            className="hover:bg-white/10 px-3 py-1 rounded text-2xl"
                        >
                            [X]
                        </button>
                    </div>

                    {/* Score Summary */}
                    <div className="px-6 py-4 bg-black/50 border-b border-[#33ff00]/30">
                        <div className="flex justify-between items-center text-xl">
                            <span className="text-[#33ff00]">Health Score:</span>
                            <span className={severityTextColors[score.severity]}>
                                {score.healthy}/7 Healthy
                            </span>
                        </div>
                        <p className="text-white/70 mt-2">{severityMessages[score.severity]}</p>
                    </div>

                    {/* Issues List */}
                    {issues.length > 0 ? (
                        <div className="px-6 py-4 border-b border-[#33ff00]/30">
                            <h2 className={`text-xl ${severityTextColors[score.severity]} mb-4`}>
                                {'>'} ISSUES DETECTED ({issues.length})
                            </h2>
                            <div className="space-y-4">
                                {issues.map((issue, idx) => (
                                    <div key={issue.id} className="border border-[#ff3333]/30 rounded p-4 bg-[#ff3333]/5">
                                        <div className="flex items-start gap-3">
                                            <span className="text-[#ff3333] font-bold text-lg">{idx + 1}.</span>
                                            <div className="flex-1">
                                                <div className="text-[#ff3333] font-bold mb-1">
                                                    {issue.question.mistakeLabel}
                                                </div>
                                                <div className="text-white/70 text-sm mb-2">
                                                    {issue.question.question} — You answered NO
                                                </div>
                                                {issue.solution && (
                                                    <div className="border-t border-[#33ff00]/20 pt-2 mt-2">
                                                        <div className="text-[#33ff00]/80 text-sm font-bold mb-1">
                                                            {'>'} RECOMMENDED FIX:
                                                        </div>
                                                        <div className="text-[#33ff00]/60 text-sm">
                                                            {issue.solution.evaluate}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="px-6 py-8 text-center border-b border-[#33ff00]/30">
                            <div className="text-[#33ff00] text-2xl mb-2">[+] ALL CHECKS PASSED</div>
                            <div className="text-white/70">
                                You've avoided all 7 common AI adoption mistakes.
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="px-6 py-6 bg-black/30">
                        <p className="text-[#33ff00] text-lg mb-4">
                            {issues.length > 0
                                ? 'Want help fixing these issues?'
                                : 'Ready to accelerate your AI adoption?'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="#contact"
                                className={`flex-1 text-center px-6 py-3 ${severityTextColors[score.severity]} border-2 border-current rounded-lg hover:bg-white/10 transition-all text-lg font-bold`}
                            >
                                [CALL] Book a Consultation
                            </a>
                            <button
                                onClick={onReset}
                                className="px-6 py-3 text-[#33ff00]/60 border border-[#33ff00]/30 rounded-lg hover:bg-white/5 transition-all text-lg"
                            >
                                [RESET] Run New Audit
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3 text-center text-[#33ff00]/40 text-sm border-t border-[#33ff00]/20">
                        AI ADOPTION HEALTH AUDIT · ROBCO INDUSTRIES · 2026
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MistakesAuditReport;
