import React, { useEffect, useState } from 'react';
import { SelectedItem, FlowNode, FlowEdge } from '../types';
import CopyableTactic from './CopyableTactic';
import { useTheme } from '../context/ThemeContext';
import { KNOWLEDGE_TACTICAL_INSIGHTS } from '../constants-knowledge';

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
  const isCleanTheme = theme === 'clean';

  const [displayedText, setDisplayedText] = useState({ why: '', evaluate: '', read: '' });
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Section headers - different for diagnostic mode and theme
  const headers = isDiagnosticMode
    ? isCleanTheme
      ? { why: 'Situation', evaluate: 'Your Test', read: 'Your Action' }
      : { why: 'SITUATION ASSESSMENT', evaluate: 'YOUR TEST', read: 'YOUR ACTION' }
    : isCleanTheme
      ? { why: 'Analysis', evaluate: 'Evaluation', read: 'Execution' }
      : { why: 'ANALYSIS', evaluate: 'EVALUATION', read: 'EXECUTION' };

  // Extract data based on selection type
  const data = selectedItem ? selectedItem.data : null;
  const description = data?.description;

  // Safely determine label
  const label = selectedItem?.type === 'node'
    ? (selectedItem.data as FlowNode).label
    : selectedItem?.type === 'edge'
      ? `LINK: ${(selectedItem.data as FlowEdge).from.toUpperCase()} -> ${(selectedItem.data as FlowEdge).to.toUpperCase()}`
      : '';

  // Typewriter effect logic - faster in clean mode
  useEffect(() => {
    if (!description) return;

    setDisplayedText({ why: '', evaluate: '', read: '' });

    let isCancelled = false;
    const speed = isCleanTheme ? 8 : 15; // Faster for clean mode

    const typeSection = async (section: 'why' | 'evaluate' | 'read', text: string) => {
      for (let i = 0; i <= text.length; i++) {
        if (isCancelled) return;
        setDisplayedText(prev => ({ ...prev, [section]: text.slice(0, i) }));
        await new Promise(r => setTimeout(r, speed));
      }
    };

    const runSequence = async () => {
      await typeSection('why', description.why);
      await typeSection('evaluate', description.evaluate);
      await typeSection('read', description.read);
    };

    runSequence();

    return () => { isCancelled = true; };
  }, [description, isCleanTheme]);

  // Empty state: show minimized waiting indicator
  if (!data || !description) {
    return (
      <div className={`fixed top-20 right-0 z-40 flex items-stretch ${isCleanTheme ? 'font-body' : 'font-vt323'}`}>
        {/* Collapsed tab when no selection */}
        <div className={`px-2 py-4 flex items-center justify-center rounded-l-sm ${isCleanTheme
          ? 'bg-gray-100 border-l-2 border-y-2 border-gray-300'
          : 'bg-[#33ff00]/10 border-l-2 border-y-2 border-[#33ff00]/50'
          }`}>
          <span className={`text-sm writing-vertical ${isCleanTheme ? 'text-gray-400' : 'text-[#33ff00]/60 animate-pulse'
            }`}>
            {isCleanTheme ? '[Waiting]' : '[AWAITING INPUT]'}
          </span>
        </div>
      </div>
    );
  }

  // Clean Mode styles
  const cleanStyles = {
    panel: 'bg-white border-2 border-gray-200 shadow-lg',
    header: 'bg-[#FFDE59] text-gray-800',
    headerButton: 'hover:bg-gray-800 hover:text-white',
    content: 'text-gray-700',
    sectionTitle: 'border-gray-200 text-gray-800',
    footer: 'text-gray-400 border-gray-200',
    collapseBtn: 'bg-[#FFDE59] text-gray-800 border-[#FFDE59] hover:bg-[#FFD633]',
  };

  // Pip-Boy Mode styles
  const pipboyStyles = {
    panel: 'bg-black/95 border-2 border-[#33ff00] shadow-[0_0_20px_rgba(51,255,0,0.4)]',
    header: 'bg-[#33ff00] text-black',
    headerButton: 'hover:bg-black hover:text-[#33ff00]',
    content: 'text-[#33ff00]',
    sectionTitle: 'border-[#33ff00]/50',
    footer: 'text-[#33ff00]/60 border-[#33ff00]/30',
    collapseBtn: 'bg-[#33ff00] text-black border-[#33ff00] hover:bg-[#33ff00]/80',
  };

  const styles = isCleanTheme ? cleanStyles : pipboyStyles;

  return (
    <div
      className={`fixed top-20 right-0 z-40 flex items-stretch transition-transform duration-300 ease-out ${isCleanTheme ? 'font-body' : 'font-vt323'
        } ${isCollapsed ? 'translate-x-[calc(100%-2.5rem)]' : 'translate-x-0'}`}
      style={{ maxHeight: 'calc(100vh - 120px)' }}
    >
      {/* Collapse/Expand Tab */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`px-1 py-4 flex items-center justify-center transition-colors rounded-l-sm border-2 border-r-0 self-start mt-4 cursor-pointer ${styles.collapseBtn}`}
        title={isCollapsed ? 'Expand Panel' : 'Collapse Panel'}
      >
        <span className="text-lg font-bold">{isCollapsed ? '«' : '»'}</span>
      </button>

      {/* Main Drawer Panel */}
      <div className={`w-80 md:w-96 rounded-l-sm flex flex-col overflow-hidden ${styles.panel}`}>
        {/* Header */}
        <div className={`px-3 py-2 flex justify-between items-center font-bold text-lg shrink-0 ${styles.header}`}>
          <span className="truncate max-w-[80%]">
            {isCleanTheme ? '' : 'V.A.T.S.: '}{label.replace(/\\n|\n/g, ' ')}
          </span>
          <button
            onClick={onClose}
            className={`px-2 font-bold cursor-pointer ${styles.headerButton}`}
          >
            {isCleanTheme ? '×' : 'X'}
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className={`p-4 space-y-4 overflow-y-auto flex-1 ${styles.content}`}>
          <div>
            <h3 className={`border-b mb-1 text-lg font-bold ${styles.sectionTitle}`}>
              {isCleanTheme ? '' : '>> '}{headers.why}
            </h3>
            <p className={`leading-6 ${isCleanTheme ? 'text-base' : 'text-xl opacity-90'}`}>
              {displayedText.why}
              <span className={isCleanTheme ? 'text-gray-400' : 'animate-pulse'}>
                {displayedText.why.length < (description?.why?.length || 0) ? (isCleanTheme ? '|' : '_') : ''}
              </span>
            </p>
          </div>

          {displayedText.why.length === description.why.length && (
            <div>
              <h3 className={`border-b mb-1 text-lg font-bold ${styles.sectionTitle}`}>
                {isCleanTheme ? '' : '>> '}{headers.evaluate}
              </h3>
              <p className={`leading-6 ${isCleanTheme ? 'text-base' : 'text-xl opacity-90'}`}>
                {displayedText.evaluate}
              </p>
            </div>
          )}

          {displayedText.evaluate.length === description.evaluate.length && (
            <div>
              <h3 className={`border-b mb-1 text-lg font-bold ${styles.sectionTitle}`}>
                {isCleanTheme ? '' : '>> '}{headers.read}
              </h3>
              <p className={`leading-6 ${isCleanTheme ? 'text-base' : 'text-xl opacity-90'}`}>
                {displayedText.read}
                <span className={isCleanTheme ? 'text-gray-400' : 'animate-pulse'}>
                  {displayedText.read.length < (description?.read?.length || 0) ? (isCleanTheme ? '|' : '_') : ''}
                </span>
              </p>
            </div>
          )}

          {/* Diagnostics Section */}
          {description.diagnostics && (
            <div className="space-y-2 animate-in fade-in slide-in-from-right-2 duration-500">
              <h4 className={`text-sm font-bold uppercase tracking-wider ${isCleanTheme ? 'text-gray-500' : 'text-[#33ff00]/70'}`}>
                Leader Diagnostics
              </h4>
              {description.diagnostics.map((d, i) => (
                <div key={i} className={`p-2 border-l-2 ${isCleanTheme ? 'bg-gray-50 border-gray-300' : 'bg-[#33ff00]/5 border-[#33ff00]/30'}`}>
                  <div className="font-bold text-xs opacity-70 mb-1">{d.q}</div>
                  <div className="text-sm italic">{d.a}</div>
                </div>
              ))}
            </div>
          )}

          {/* Rebundling Section */}
          {description.rebundling && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-500">
              <h4 className={`text-sm font-bold uppercase tracking-wider ${isCleanTheme ? 'text-gray-500' : 'text-[#33ff00]/70'}`}>
                System Rebundling
              </h4>
              <div className="space-y-3">
                {description.rebundling.map((r, i) => (
                  <div key={i} className="flex gap-2">
                    <div className={`shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold rounded ${isCleanTheme ? 'bg-gray-800 text-white' : 'bg-[#33ff00] text-black'}`}>
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-bold text-xs">{r.step}</div>
                      <div className="text-xs opacity-80 leading-relaxed">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Archetypes Section */}
          {description.archetypes && (
            <div className="space-y-3 animate-in fade-in slide-in-from-right-2 duration-500">
              <h4 className={`text-sm font-bold uppercase tracking-wider ${isCleanTheme ? 'text-gray-500' : 'text-[#33ff00]/70'}`}>
                Maturity Archetypes
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {description.archetypes.map((a, i) => (
                  <div key={i} className={`p-2 rounded border ${isCleanTheme ? 'bg-white border-gray-200 shadow-sm' : 'bg-black/40 border-[#33ff00]/20'}`}>
                    <div className={`font-bold text-xs ${isCleanTheme ? 'text-blue-600' : 'text-[#33ff00]'}`}>{a.name}</div>
                    <div className="text-xs opacity-70 italic">{a.focus}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Asset Engine Section */}
          {description.asset_engine && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-500">
              <h4 className={`text-sm font-bold uppercase tracking-wider ${isCleanTheme ? 'text-gray-500' : 'text-[#33ff00]/70'}`}>
                3-Step Asset Engine
              </h4>
              <div className="space-y-3">
                {description.asset_engine.map((r, i) => (
                  <div key={i} className="flex gap-2">
                    <div className={`shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold rounded ${isCleanTheme ? 'bg-blue-800 text-white' : 'bg-[#33ff00] text-black'}`}>
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-bold text-xs">{r.step}</div>
                      <div className="text-xs opacity-80 leading-relaxed">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prompt Leverage Section */}
          {description.leverage && (
            <div className="space-y-3 animate-in fade-in slide-in-from-right-2 duration-500">
              <h4 className={`text-sm font-bold uppercase tracking-wider ${isCleanTheme ? 'text-gray-500' : 'text-[#33ff00]/70'}`}>
                Prompt Leverage Keys
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {description.leverage.map((a, i) => (
                  <div key={i} className={`p-2 rounded border ${isCleanTheme ? 'bg-white border-gray-200 shadow-sm' : 'bg-black/40 border-[#33ff00]/20'}`}>
                    <div className={`font-bold text-xs ${isCleanTheme ? 'text-blue-600' : 'text-[#33ff00]'}`}>"{a.term}"</div>
                    <div className="text-xs opacity-70 italic">{a.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prompt Framework Section */}
          {description.framework && (
            <div className="space-y-2 animate-in fade-in slide-in-from-right-2 duration-500">
              <h4 className={`text-sm font-bold uppercase tracking-wider ${isCleanTheme ? 'text-gray-500' : 'text-[#33ff00]/70'}`}>
                WWWW Framework
              </h4>
              {description.framework.map((d, i) => (
                <div key={i} className={`p-2 border-l-2 ${isCleanTheme ? 'bg-blue-50 border-blue-300' : 'bg-[#33ff00]/5 border-[#33ff00]/30'}`}>
                  <div className="font-bold text-xs opacity-70 mb-1">{d.w}</div>
                  <div className="text-sm italic">{d.desc}</div>
                </div>
              ))}
            </div>
          )}

          {/* New Tactical Insights (Reshuffle patterns) */}
          {(() => {
            const nodeId = selectedItem?.type === 'node' ? selectedItem.data.id : '';
            let insight = null;

            // Fixed mapping: each node gets its most specific insight
            if (nodeId === 'use_transcripts') {
              insight = KNOWLEDGE_TACTICAL_INSIGHTS.asset_engine;
            } else if (nodeId === 'reverse_interview') {
              insight = KNOWLEDGE_TACTICAL_INSIGHTS.prompt_leverage;
            } else if (nodeId === 'doc_audit') {
              insight = KNOWLEDGE_TACTICAL_INSIGHTS.sommelier;
            } else if (['prompt_library', 'projects_gems', 'skills'].includes(nodeId)) {
              insight = KNOWLEDGE_TACTICAL_INSIGHTS.nurse_navigator;
            } else if (nodeId === 'maturity') {
              insight = KNOWLEDGE_TACTICAL_INSIGHTS.coordination_consensus;
            }

            if (!insight) return null;

            return (
              <div className={`mt-6 p-4 border-t-2 border-dashed ${isCleanTheme ? 'border-blue-200 bg-blue-50/30' : 'border-[#33ff00]/30 bg-[#33ff00]/5'} animate-in fade-in zoom-in-95 duration-1000`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{insight.icon}</span>
                  <h4 className={`font-bold tracking-tighter ${isCleanTheme ? 'text-blue-700' : 'text-[#33ff00]'}`}>
                    {insight.title}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed opacity-90 mb-3 italic">
                  "{insight.concept}"
                </p>
                <div className="space-y-2">
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block ${isCleanTheme ? 'bg-red-100 text-red-700' : 'bg-red-900/40 text-red-400'}`}>
                    TRAP: {insight.warning}
                  </div>
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded block ${isCleanTheme ? 'bg-green-100 text-green-700' : 'bg-green-900/40 text-green-400'}`}>
                    ADVICE: {insight.advice}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Assessment Decisions */}
          {isAssessmentMode && onDecision && selectedItem?.type === 'node' && (selectedItem.data as FlowNode).type === 'decision' && displayedText.read.length === description.read.length && (
            <div className="flex gap-4 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <button
                onClick={() => onDecision('yes')}
                className={`flex-1 font-bold py-3 transition-all border-2 cursor-pointer ${isCleanTheme
                  ? 'bg-[#FFDE59] text-gray-800 text-base border-[#FFDE59] hover:bg-[#FFD633] rounded-lg'
                  : 'bg-[#33ff00] text-black text-xl border-[#33ff00] hover:bg-[#33ff00]/80'
                  }`}
              >
                {isCleanTheme ? 'Yes' : '[YES]'}
              </button>
              <button
                onClick={() => onDecision('no')}
                className={`flex-1 font-bold py-3 transition-all border-2 cursor-pointer ${isCleanTheme
                  ? 'border-gray-300 text-gray-700 text-base hover:bg-gray-100 rounded-lg'
                  : 'border-[#33ff00] text-[#33ff00] text-xl hover:bg-[#33ff00]/20'
                  }`}
              >
                {isCleanTheme ? 'No' : '[NO]'}
              </button>
            </div>
          )}
        </div>

        {/* Footer Decoration */}
        <div className={`p-2 text-xs flex justify-between border-t shrink-0 ${styles.footer}`}>
          {isCleanTheme ? (
            <>
              <div className="flex flex-col">
                <span>Strategy Diagnostic Tool</span>
                <span className="text-[10px] opacity-70 mt-1">
                  DEBUG: Node={selectedItem?.type === 'node' ? selectedItem.data.id : 'edge'} |
                  Keys={Object.keys(description).filter(k => !['why', 'evaluate', 'read'].includes(k)).join(',')}
                </span>
              </div>
              <span>© 2026</span>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <span>MEM: 64KB OK</span>
                <span className="text-[10px] opacity-70 mt-1 text-[#33ff00]/50">
                  DEBUG: {selectedItem?.type === 'node' ? selectedItem.data.id : 'edge'} |
                  [{Object.keys(description).filter(k => !['why', 'evaluate', 'read'].includes(k)).join(',')}]
                </span>
              </div>
              <span>ROBCO INDUSTRIES (TM)</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoTerminal;
