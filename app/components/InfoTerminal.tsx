import React, { useEffect, useState } from 'react';
import { SelectedItem, FlowNode, FlowEdge } from '../types';
import CopyableTactic from './CopyableTactic';

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
  const [displayedText, setDisplayedText] = useState({ why: '', evaluate: '', read: '' });
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Section headers - different for diagnostic mode
  const headers = isDiagnosticMode
    ? { why: 'SITUATION ASSESSMENT', evaluate: 'YOUR TEST', read: 'YOUR ACTION' }
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

  // Typewriter effect logic
  useEffect(() => {
    if (!description) return;

    setDisplayedText({ why: '', evaluate: '', read: '' });

    let isCancelled = false;
    const speed = 15; // Faster speed for better UX

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
  }, [description]);

  // Empty state: show minimized waiting indicator
  if (!data || !description) {
    return (
      <div className="fixed top-20 right-0 z-40 flex items-stretch font-vt323">
        {/* Collapsed tab when no selection */}
        <div className="bg-[#33ff00]/10 border-l-2 border-y-2 border-[#33ff00]/50 px-2 py-4 flex items-center justify-center rounded-l-sm">
          <span className="text-[#33ff00]/60 text-sm writing-vertical animate-pulse">[AWAITING INPUT]</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed top-20 right-0 z-40 flex items-stretch transition-transform duration-300 ease-out font-vt323 ${isCollapsed ? 'translate-x-[calc(100%-2.5rem)]' : 'translate-x-0'
        }`}
      style={{ maxHeight: 'calc(100vh - 120px)' }}
    >
      {/* Collapse/Expand Tab */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="bg-[#33ff00] text-black px-1 py-4 flex items-center justify-center hover:bg-[#33ff00]/80 transition-colors rounded-l-sm border-2 border-r-0 border-[#33ff00] self-start mt-4"
        title={isCollapsed ? 'Expand Panel' : 'Collapse Panel'}
      >
        <span className="text-lg font-bold">{isCollapsed ? '«' : '»'}</span>
      </button>

      {/* Main Drawer Panel */}
      <div className="w-80 md:w-96 border-2 border-[#33ff00] bg-black/95 rounded-l-sm shadow-[0_0_20px_rgba(51,255,0,0.4)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#33ff00] text-black px-3 py-2 flex justify-between items-center font-bold text-lg shrink-0">
          <span className="truncate max-w-[80%]">V.A.T.S.: {label.replace(/\\n|\n/g, ' ')}</span>
          <button onClick={onClose} className="hover:bg-black hover:text-[#33ff00] px-2 font-bold">X</button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-[#33ff00]">
          <div>
            <h3 className="border-b border-[#33ff00]/50 mb-1 text-lg font-bold">{'>>'} {headers.why}</h3>
            <p className="leading-6 text-xl opacity-90">{displayedText.why}<span className="animate-pulse">_</span></p>
          </div>

          {displayedText.why.length === description.why.length && (
            <div>
              <h3 className="border-b border-[#33ff00]/50 mb-1 text-lg font-bold">{'>>'} {headers.evaluate}</h3>
              <p className="leading-6 text-xl opacity-90">{displayedText.evaluate}</p>
            </div>
          )}

          {displayedText.evaluate.length === description.evaluate.length && (
            <div>
              <h3 className="border-b border-[#33ff00]/50 mb-1 text-lg font-bold">{'>>'} {headers.read}</h3>
              <p className="leading-6 text-xl opacity-90">{displayedText.read}</p>
            </div>
          )}

          {/* Tactical Prompt / Toolbox */}
          {description.tactic && displayedText.read.length === description.read.length && (
            <div className="animate-in fade-in duration-700">
              <CopyableTactic
                label={description.tactic.label}
                content={description.tactic.content}
              />
            </div>
          )}

          {/* Assessment Decisions */}
          {isAssessmentMode && onDecision && selectedItem?.type === 'node' && (selectedItem.data as FlowNode).type === 'decision' && displayedText.read.length === description.read.length && (
            <div className="flex gap-4 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <button
                onClick={() => onDecision('yes')}
                className="flex-1 bg-[#33ff00] text-black font-bold py-3 text-xl hover:bg-[#33ff00]/80 transition-all border-2 border-[#33ff00]"
              >
                [YES]
              </button>
              <button
                onClick={() => onDecision('no')}
                className="flex-1 border-2 border-[#33ff00] text-[#33ff00] font-bold py-3 text-xl hover:bg-[#33ff00]/20 transition-all"
              >
                [NO]
              </button>
            </div>
          )}
        </div>

        {/* Footer Decoration */}
        <div className="p-2 text-xs text-[#33ff00]/60 flex justify-between border-t border-[#33ff00]/30 shrink-0">
          <span>MEM: 64KB OK</span>
          <span>ROBCO INDUSTRIES (TM)</span>
        </div>
      </div>
    </div>
  );
};

export default InfoTerminal;
