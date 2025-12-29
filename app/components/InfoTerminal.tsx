import React, { useEffect, useState } from 'react';
import { SelectedItem, FlowNode, FlowEdge } from '../types';

interface InfoTerminalProps {
  selectedItem: SelectedItem | null;
  onClose: () => void;
}

const InfoTerminal: React.FC<InfoTerminalProps> = ({ selectedItem, onClose }) => {
  const [displayedText, setDisplayedText] = useState({ why: '', evaluate: '', read: '' });

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

  if (!data || !description) {
    return (
      <div className="absolute bottom-4 right-4 w-96 h-64 border-2 border-[#33ff00] bg-black/90 p-4 rounded-lg shadow-[0_0_15px_rgba(51,255,0,0.3)] flex items-center justify-center pointer-events-none">
        <p className="text-[#33ff00] animate-pulse text-xl text-center">
          {'>'} WAITING FOR INPUT...<br />
          {'>'} SELECT NODE OR PATH
        </p>
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 right-4 w-full max-w-md md:max-w-lg border-2 border-[#33ff00] bg-black/95 p-1 rounded-sm shadow-[0_0_20px_rgba(51,255,0,0.4)] z-40 flex flex-col font-vt323">
      {/* Header */}
      <div className="bg-[#33ff00] text-black px-2 py-1 flex justify-between items-center font-bold text-lg">
        <span className="truncate max-w-[80%]">V.A.T.S.: {label.replace(/\n/g, ' ')}</span>
        <button onClick={onClose} className="hover:bg-black hover:text-[#33ff00] px-2 font-bold pointer-events-auto">X</button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 overflow-y-auto max-h-[60vh] md:max-h-80 text-[#33ff00]">
        <div>
          <h3 className="border-b border-[#33ff00]/50 mb-1 text-xl">{'>'}{'>'}  ANALYSIS</h3>
          <p className="leading-6 text-2xl opacity-90">{displayedText.why}<span className="animate-pulse">_</span></p>
        </div>

        {displayedText.why.length === description.why.length && (
          <div>
            <h3 className="border-b border-[#33ff00]/50 mb-1 text-xl">{'>'}{'>'}  EVALUATION</h3>
            <p className="leading-6 text-2xl opacity-90">{displayedText.evaluate}</p>
          </div>
        )}

        {displayedText.evaluate.length === description.evaluate.length && (
          <div>
            <h3 className="border-b border-[#33ff00]/50 mb-1 text-xl">{'>'}{'>'}  EXECUTION</h3>
            <p className="leading-6 text-2xl opacity-90">{displayedText.read}</p>
          </div>
        )}
      </div>

      {/* Footer Decoration */}
      <div className="p-2 text-xs text-[#33ff00]/60 flex justify-between border-t border-[#33ff00]/30">
        <span>MEM: 64KB OK</span>
        <span>ROBCO INDUSTRIES (TM)</span>
      </div>
    </div>
  );
};

export default InfoTerminal;
