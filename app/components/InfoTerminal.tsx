import React, { useEffect, useState } from 'react';
import { SelectedItem, FlowNode, FlowEdge } from '../types';
import CopyableTactic from './CopyableTactic';
import { KNOWLEDGE_TACTICAL_INSIGHTS } from '../constants-knowledge';
import { useTheme } from '../context/ThemeContext';
import '../themes/optimistic.css';

interface InfoTerminalProps {
    selectedItem: SelectedItem | null;
    onClose: () => void;
    isDiagnosticMode?: boolean;
    onDecision?: (choice: 'yes' | 'no') => void;
    isAssessmentMode?: boolean;
}

const InfoTerminal: React.FC<InfoTerminalProps> = ({
    selectedItem,
    onClose,
    isDiagnosticMode = false,
    onDecision,
    isAssessmentMode = false
}) => {
    const { theme } = useTheme();
    const isPipBoy = theme === 'pipboy';

    const [displayedText, setDisplayedText] = useState({ why: '', evaluate: '', read: '' });

    // Section headers - different for each theme
    const headers = isDiagnosticMode
        ? isPipBoy
            ? { why: 'SITUATION ASSESSMENT', evaluate: 'YOUR TEST', read: 'YOUR ACTION' }
            : { why: 'Situation', evaluate: 'Test', read: 'Action' }
        : isPipBoy
            ? { why: 'ANALYSIS', evaluate: 'EVALUATION', read: 'EXECUTION' }
            : { why: 'Analysis', evaluate: 'Evaluation', read: 'Execution' };

    // Extract data
    const data = selectedItem ? selectedItem.data : null;
    const description = data?.description;

    const label = selectedItem?.type === 'node'
        ? (selectedItem.data as FlowNode).label.replace(/\\n/g, ' ')
        : selectedItem?.type === 'edge'
            ? `Link`
            : '';

    // Typewriter effect
    useEffect(() => {
        if (!description) return;

        setDisplayedText({ why: '', evaluate: '', read: '' });

        let isCancelled = false;
        // Pip-Boy is slower for that retro feel
        const speed = isPipBoy ? 15 : 5;

        const typeSection = async (section: 'why' | 'evaluate' | 'read', text: string) => {
            for (let i = 0; i <= text.length; i++) {
                if (isCancelled) return;
                setDisplayedText(prev => ({ ...prev, [section]: text.slice(0, i) }));
                await new Promise(r => setTimeout(r, speed));
            }
        };

        const runSequence = async () => {
            if (isCancelled) return;
            await typeSection('why', description.why);
            if (isCancelled) return;
            await typeSection('evaluate', description.evaluate);
            if (isCancelled) return;
            await typeSection('read', description.read);
        };

        runSequence();

        return () => { isCancelled = true; };
    }, [description]);

    if (!data || !description) return null;

    // Helper to check if typewriter is finished
    const isFinished = displayedText.read.length === description.read.length &&
        description.read.length > 0 ||
        (!description.read && displayedText.evaluate.length === description.evaluate.length);

    // In some cases we might not have 'read' or 'evaluate' text, so we should be careful.
    // But in this app, they are usually present.
    const allFinished = displayedText.read.length === description.read.length;

    // ========== THEME-BASED STYLES ==========
    const optimisticStyles = {
        container: 'h-full flex flex-col font-body theme-optimistic bg-white',
        header: 'px-6 py-5 border-b-2 border-[#1E3D2F] flex justify-between items-start bg-[#F9F8F6]',
        headerTitle: 'font-display text-2xl font-bold leading-tight text-[#1E3D2F]',
        closeBtn: 'w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#1E3D2F] hover:bg-[#FF6B4A] hover:text-white transition-colors',
        content: 'flex-1 overflow-y-auto p-6 space-y-8',
        sectionNumber: (num: number) => num === 1 ? 'w-6 h-6 rounded-full bg-[#1E3D2F] text-[#F9F8F6] flex items-center justify-center text-xs' : num === 2 ? 'w-6 h-6 rounded-full bg-[#FF6B4A] text-white flex items-center justify-center text-xs' : 'w-6 h-6 rounded-full bg-[#D4E6B5] text-[#1E3D2F] flex items-center justify-center text-xs border border-[#1E3D2F]',
        sectionTitle: 'font-display text-lg font-bold text-[#1E3D2F]',
        sectionText: 'text-[#4A6359] leading-relaxed text-lg',
        footer: 'p-4 bg-[#1E3D2F] text-[#F9F8F6] text-xs font-mono flex justify-between tracking-wide',
    };

    const pipboyStyles = {
        container: 'h-full flex flex-col font-mono bg-black/95 border-l-2 border-[#33ff00] text-[#33ff00]',
        header: 'px-4 py-3 border-b-2 border-[#33ff00]/50 flex justify-between items-start bg-[#33ff00]/10',
        headerTitle: 'font-bold text-xl text-[#33ff00] uppercase tracking-wider',
        closeBtn: 'w-8 h-8 flex items-center justify-center border-2 border-[#33ff00] text-[#33ff00] hover:bg-[#33ff00] hover:text-black transition-colors',
        content: 'flex-1 overflow-y-auto p-4 space-y-6',
        sectionNumber: () => 'w-6 h-6 rounded bg-[#33ff00] text-black flex items-center justify-center text-xs font-bold',
        sectionTitle: 'font-bold text-lg text-[#33ff00] uppercase',
        sectionText: 'text-[#33ff00]/90 leading-relaxed text-base',
        footer: 'p-3 bg-[#33ff00]/10 text-[#33ff00]/70 text-xs font-mono flex justify-between border-t border-[#33ff00]/30',
    };

    const styles = isPipBoy ? pipboyStyles : optimisticStyles;

    return (
        <div className={styles.container}>

            {/* Header */}
            <div className={styles.header}>
                <div>
                    <div className={`text-xs font-bold tracking-widest mb-1 uppercase ${isPipBoy ? 'text-[#33ff00]/60' : 'text-[#1E3D2F]/60'}`}>
                        {isPipBoy ? 'V.A.T.S. TARGET' : 'Selection'}
                    </div>
                    <h2 className={styles.headerTitle}>{label}</h2>
                </div>
                <button
                    onClick={onClose}
                    className={styles.closeBtn}
                >
                    {isPipBoy ? 'X' : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Content */}
            <div className={styles.content}>

                {/* Section: Situation/Analysis */}
                <div>
                    <h3 className={`flex items-center gap-3 ${styles.sectionTitle} mb-3`}>
                        <span className={styles.sectionNumber(1)}>{isPipBoy ? '>>' : '1'}</span>
                        {headers.why}
                    </h3>
                    <p className={styles.sectionText}>
                        {displayedText.why}
                        {isPipBoy && displayedText.why.length < description.why.length && <span className="animate-pulse">_</span>}
                    </p>
                </div>

                {/* Section: Test/Evaluation */}
                {displayedText.why.length === description.why.length && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <h3 className={`flex items-center gap-3 ${styles.sectionTitle} mb-3`}>
                            <span className={styles.sectionNumber(2)}>{isPipBoy ? '>>' : '2'}</span>
                            {headers.evaluate}
                        </h3>
                        <div className={`p-4 border-l-4 ${isPipBoy ? 'bg-[#33ff00]/5 border-[#33ff00]/50' : 'bg-[#F9F8F6] border-[#FF6B4A]'}`}>
                            <p className={`leading-relaxed italic font-medium ${isPipBoy ? 'text-[#33ff00]/90' : 'text-[#1E3D2F]'}`}>
                                {displayedText.evaluate}
                            </p>
                        </div>
                    </div>
                )}

                {/* Section: Action/Execution */}
                {displayedText.evaluate.length === description.evaluate.length && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <h3 className={`flex items-center gap-3 ${styles.sectionTitle} mb-3`}>
                            <span className={styles.sectionNumber(3)}>{isPipBoy ? '>>' : '3'}</span>
                            {headers.read}
                        </h3>
                        <p className={styles.sectionText}>
                            {displayedText.read}
                            {isPipBoy && displayedText.read.length < description.read.length && <span className="animate-pulse">_</span>}
                        </p>
                    </div>
                )}

                {/* Diagnostics Section */}
                {description.diagnostics && allFinished && (
                    <div className={`space-y-2 opacity-0 animate-[fade-in_0.5s_ease-out_forwards] border-t-2 pt-4 mt-4 ${isPipBoy ? 'border-[#33ff00]/20' : 'border-[#1E3D2F]/10'}`}>
                        <h3 className={`${styles.sectionTitle} mb-3`}>
                            {isPipBoy ? '>> LEADER DIAGNOSTICS' : 'Leader Diagnostics'}
                        </h3>
                        {description.diagnostics.map((d, i) => (
                            <div key={i} className={`p-3 border-l-4 ${isPipBoy ? 'bg-[#33ff00]/5 border-[#33ff00]/50' : 'bg-[#F9F8F6] border-[#1E3D2F]'}`}>
                                <div className={`font-bold text-xs mb-1 ${isPipBoy ? 'text-[#33ff00]/70' : 'text-[#1E3D2F]/70'}`}>{d.q}</div>
                                <div className={`text-sm italic ${isPipBoy ? 'text-[#33ff00]/80' : 'text-[#4A6359]'}`}>{d.a}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Rebundling Section */}
                {description.rebundling && allFinished && (
                    <div className={`space-y-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards] border-t-2 pt-4 mt-4 ${isPipBoy ? 'border-[#33ff00]/20' : 'border-[#1E3D2F]/10'}`}>
                        <h3 className={`${styles.sectionTitle} mb-3`}>
                            {isPipBoy ? '>> SYSTEM REBUNDLING' : 'System Rebundling'}
                        </h3>
                        {description.rebundling.map((r, i) => (
                            <div key={i} className="flex gap-3">
                                <div className={`shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full ${isPipBoy ? 'bg-[#33ff00] text-black' : 'bg-[#1E3D2F] text-white'}`}>
                                    {i + 1}
                                </div>
                                <div>
                                    <div className={`font-bold text-sm ${isPipBoy ? 'text-[#33ff00]' : 'text-[#1E3D2F]'}`}>{r.step}</div>
                                    <div className={`text-xs leading-relaxed ${isPipBoy ? 'text-[#33ff00]/70' : 'text-[#4A6359]'}`}>{r.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Archetypes Section */}
                {description.archetypes && allFinished && (
                    <div className={`space-y-3 opacity-0 animate-[fade-in_0.5s_ease-out_forwards] border-t-2 pt-4 mt-4 ${isPipBoy ? 'border-[#33ff00]/20' : 'border-[#1E3D2F]/10'}`}>
                        <h3 className={`${styles.sectionTitle} mb-3`}>
                            {isPipBoy ? '>> MATURITY ARCHETYPES' : 'Maturity Archetypes'}
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                            {description.archetypes.map((a, i) => (
                                <div key={i} className={`p-3 rounded-lg border-2 ${isPipBoy ? 'border-[#33ff00]/50 bg-black/40' : 'border-[#1E3D2F] bg-white shadow-[2px_2px_0px_#1E3D2F]'}`}>
                                    <div className={`font-bold text-sm ${isPipBoy ? 'text-[#33ff00]' : 'text-[#FF6B4A]'}`}>{a.name}</div>
                                    <div className={`text-xs italic ${isPipBoy ? 'text-[#33ff00]/70' : 'text-[#4A6359]'}`}>{a.focus}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Asset Engine Section */}
                {description.asset_engine && allFinished && (
                    <div className={`space-y-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards] border-t-2 pt-4 mt-4 ${isPipBoy ? 'border-[#33ff00]/20' : 'border-[#1E3D2F]/10'}`}>
                        <h3 className={`${styles.sectionTitle} mb-3`}>
                            {isPipBoy ? '>> 3-STEP ASSET ENGINE' : '3-Step Asset Engine'}
                        </h3>
                        {description.asset_engine.map((r, i) => (
                            <div key={i} className="flex gap-3">
                                <div className={`shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full ${isPipBoy ? 'bg-[#33ff00] text-black' : 'bg-[#FF6B4A] text-white'}`}>
                                    {i + 1}
                                </div>
                                <div>
                                    <div className={`font-bold text-sm ${isPipBoy ? 'text-[#33ff00]' : 'text-[#1E3D2F]'}`}>{r.step}</div>
                                    <div className={`text-xs leading-relaxed ${isPipBoy ? 'text-[#33ff00]/70' : 'text-[#4A6359]'}`}>{r.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Leverage Section */}
                {description.leverage && allFinished && (
                    <div className={`space-y-3 opacity-0 animate-[fade-in_0.5s_ease-out_forwards] border-t-2 pt-4 mt-4 ${isPipBoy ? 'border-[#33ff00]/20' : 'border-[#1E3D2F]/10'}`}>
                        <h3 className={`${styles.sectionTitle} mb-3`}>
                            {isPipBoy ? '>> PROMPT LEVERAGE KEYS' : 'Prompt Leverage Keys'}
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                            {description.leverage.map((a, i) => (
                                <div key={i} className={`p-3 rounded-lg border-2 ${isPipBoy ? 'border-[#33ff00]/50 bg-black/40' : 'border-[#1E3D2F] bg-[#F9F8F6]'}`}>
                                    <div className={`font-bold text-sm ${isPipBoy ? 'text-[#33ff00]' : 'text-[#FF6B4A]'}`}>"{a.term}"</div>
                                    <div className={`text-xs italic ${isPipBoy ? 'text-[#33ff00]/70' : 'text-[#4A6359]'}`}>{a.reason}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Framework Section */}
                {description.framework && allFinished && (
                    <div className={`space-y-2 opacity-0 animate-[fade-in_0.5s_ease-out_forwards] border-t-2 pt-4 mt-4 ${isPipBoy ? 'border-[#33ff00]/20' : 'border-[#1E3D2F]/10'}`}>
                        {description.framework.map((d, i) => (
                            <div key={i} className={`p-3 border-l-4 ${isPipBoy ? 'bg-[#33ff00]/5 border-[#33ff00]/50' : 'bg-[#F9F8F6] border-[#FF6B4A]'}`}>
                                <div className={`font-bold text-xs mb-1 ${isPipBoy ? 'text-[#33ff00]/70' : 'text-[#1E3D2F]/70'}`}>{d.w}</div>
                                <div className={`text-sm italic ${isPipBoy ? 'text-[#33ff00]/80' : 'text-[#4A6359]'}`}>{d.desc}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tactics Section (Two Curves, Satisficing, etc.) */}
                {description.tactics && allFinished && (
                    <div className={`space-y-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards] border-t-2 pt-4 mt-4 ${isPipBoy ? 'border-[#33ff00]/20' : 'border-[#1E3D2F]/10'}`}>
                        {description.tactics.map((t, i) => (
                            <div key={i} className={`p-4 border-2 ${isPipBoy ? 'border-[#33ff00]/50 bg-black/40' : 'border-[#1E3D2F] bg-[#F9F8F6] shadow-[3px_3px_0px_#1E3D2F]'}`}>
                                <div className={`font-bold text-sm mb-2 ${isPipBoy ? 'text-[#33ff00] uppercase' : 'font-display text-[#FF6B4A]'}`}>
                                    {isPipBoy ? `>> ${t.label}` : t.label}
                                </div>
                                <div className={`text-sm leading-relaxed ${isPipBoy ? 'text-[#33ff00]/80' : 'text-[#4A6359]'}`}>
                                    {t.content}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Prompting Hill Section (Intelligent Hill) */}
                {description.promptingHill && allFinished && (
                    <div className={`space-y-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards] border-t-2 pt-4 mt-4 ${isPipBoy ? 'border-[#33ff00]/20' : 'border-[#1E3D2F]/10'}`}>
                        <h3 className={`${styles.sectionTitle} mb-2`}>
                            {isPipBoy ? '>> THE INTELLIGENT HILL' : 'The Intelligent Hill'}
                        </h3>
                        <p className={`text-sm leading-relaxed italic mb-4 ${isPipBoy ? 'text-[#33ff00]/80' : 'text-[#4A6359]'}`}>
                            {description.promptingHill.intro}
                        </p>
                        <div className="space-y-2">
                            {description.promptingHill.levels.map((level, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className={`shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full ${isPipBoy ? 'bg-[#33ff00] text-black' : i < 2 ? 'bg-[#1E3D2F] text-white' : i < 4 ? 'bg-[#FF6B4A] text-white' : 'bg-[#D4E6B5] text-[#1E3D2F] border border-[#1E3D2F]'}`}>
                                        {i + 1}
                                    </div>
                                    <div>
                                        <div className={`font-bold text-sm ${isPipBoy ? 'text-[#33ff00]' : 'text-[#1E3D2F]'}`}>{level.name}</div>
                                        <div className={`text-xs leading-relaxed ${isPipBoy ? 'text-[#33ff00]/70' : 'text-[#4A6359]'}`}>{level.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={`mt-4 p-3 border-l-4 ${isPipBoy ? 'bg-[#33ff00]/10 border-[#33ff00]' : 'bg-[#D4E6B5]/30 border-[#1E3D2F]'}`}>
                            <div className={`font-bold text-xs mb-1 ${isPipBoy ? 'text-[#33ff00]' : 'text-[#FF6B4A]'}`}>PRO TIP</div>
                            <div className={`text-sm ${isPipBoy ? 'text-[#33ff00]/80' : 'text-[#4A6359]'}`}>{description.promptingHill.proTip}</div>
                        </div>
                    </div>
                )}

                {/* Tactical Insights */}
                {(() => {
                    if (!allFinished) return null;

                    const nodeId = selectedItem?.type === 'node' ? selectedItem.data.id : '';
                    let insight = null;

                    if (nodeId === 'use_transcripts') {
                        insight = KNOWLEDGE_TACTICAL_INSIGHTS.asset_engine;
                    } else if (nodeId === 'reverse_interview') {
                        insight = KNOWLEDGE_TACTICAL_INSIGHTS.prompt_leverage;
                    } else if (nodeId === 'doc_audit') {
                        insight = KNOWLEDGE_TACTICAL_INSIGHTS.sommelier;
                    } else if (['prompt_library', 'projects_gems', 'skills', 'sop_complete'].includes(nodeId)) {
                        insight = KNOWLEDGE_TACTICAL_INSIGHTS.nurse_navigator;
                    } else if (nodeId === 'maturity') {
                        insight = KNOWLEDGE_TACTICAL_INSIGHTS.coordination_consensus;
                    }

                    if (!insight) return null;

                    return (
                        <div className={`mt-6 p-4 border-t-2 border-dashed opacity-0 animate-[fade-in_0.8s_ease-out_forwards] ${isPipBoy ? 'border-[#33ff00]/30 bg-[#33ff00]/5' : 'border-[#1E3D2F]/30 bg-[#F9F8F6]'}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className={`font-bold ${isPipBoy ? 'text-[#33ff00] uppercase' : 'font-display text-[#1E3D2F]'}`}>
                                    {isPipBoy ? `>> ${insight.title}` : insight.title}
                                </h4>
                            </div>
                            <p className={`text-sm leading-relaxed mb-3 italic ${isPipBoy ? 'text-[#33ff00]/80' : 'text-[#4A6359]'}`}>
                                "{insight.concept}"
                            </p>
                            <div className="space-y-3">
                                <div className={`text-sm p-3 border-l-4 ${isPipBoy ? 'bg-red-900/20 border-red-500/50 text-red-400' : 'bg-[#FF6B4A]/10 border-[#FF6B4A] text-[#1E3D2F]'}`}>
                                    <span className="font-bold">TRAP:</span> {insight.warning}
                                </div>
                                <div className={`text-sm p-3 border-l-4 ${isPipBoy ? 'bg-green-900/20 border-green-500/50 text-green-400' : 'bg-[#D4E6B5]/30 border-[#1E3D2F] text-[#1E3D2F]'}`}>
                                    <span className="font-bold">ADVICE:</span> {insight.advice}
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {/* Tactic Block */}
                {description.tactic && displayedText.read.length === description.read.length && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 pt-2">
                        <div className={`border-2 p-5 ${isPipBoy ? 'border-[#33ff00] bg-black/40 shadow-[0_0_10px_rgba(51,255,0,0.3)]' : 'border-[#1E3D2F] shadow-[4px_4px_0px_#1E3D2F] bg-white'}`}>
                            <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${isPipBoy ? 'text-[#33ff00]' : 'text-[#FF6B4A]'}`}>
                                {isPipBoy ? '>> TACTICAL ACTION' : 'Tactical Action'}
                            </div>
                            <div className={`text-xl font-bold mb-2 ${isPipBoy ? 'text-[#33ff00]' : 'font-display text-[#1E3D2F]'}`}>{description.tactic.label}</div>
                            <p className={`text-sm mb-4 border-b pb-4 ${isPipBoy ? 'text-[#33ff00]/80 border-[#33ff00]/20' : 'text-[#4A6359] border-[#1E3D2F]/10'}`}>
                                {description.tactic.content}
                            </p>
                            <button
                                onClick={() => navigator.clipboard.writeText(description?.tactic?.content || '')}
                                className={`w-full py-2 font-bold text-sm uppercase transition-colors ${isPipBoy ? 'bg-[#33ff00] text-black hover:bg-[#33ff00]/80' : 'bg-[#1E3D2F] text-white hover:bg-[#FF6B4A]'}`}
                            >
                                {isPipBoy ? '[COPY TO CLIPBOARD]' : 'Copy to Clipboard'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Assessment Choices */}
                {isAssessmentMode && onDecision && selectedItem?.type === 'node' && (selectedItem.data as FlowNode).type === 'decision' && displayedText.read.length === description.read.length && (
                    <div className="flex gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button
                            onClick={() => onDecision('yes')}
                            className={`flex-1 py-3 border-2 font-bold transition-all ${isPipBoy
                                ? 'bg-[#33ff00] text-black border-[#33ff00] hover:bg-[#33ff00]/80'
                                : 'bg-[#D4E6B5] border-[#1E3D2F] shadow-[3px_3px_0px_#1E3D2F] text-[#1E3D2F] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#1E3D2F]'}`}
                        >
                            {isPipBoy ? '[YES]' : 'YES'}
                        </button>
                        <button
                            onClick={() => onDecision('no')}
                            className={`flex-1 py-3 border-2 font-bold transition-all ${isPipBoy
                                ? 'border-[#33ff00] text-[#33ff00] hover:bg-[#33ff00]/20'
                                : 'bg-white border-[#1E3D2F] shadow-[3px_3px_0px_#1E3D2F] text-[#1E3D2F] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#1E3D2F]'}`}
                        >
                            {isPipBoy ? '[NO]' : 'NO'}
                        </button>
                    </div>
                )}

            </div>

            {/* Footer */}
            <div className={styles.footer}>
                <span>{isPipBoy ? 'ROBCO INDUSTRIES (TM)' : 'DECISION FLOW PROTOCOL'}</span>
                <span>{isPipBoy ? 'MEM: 64KB OK' : 'v2.0.26'}</span>
            </div>

        </div >
    );
};

export default InfoTerminal;
