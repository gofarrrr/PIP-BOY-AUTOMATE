import React, { useState } from 'react';
import Flowchart from './components/Flowchart';
import InfoTerminal from './components/InfoTerminal';
import { SelectedItem } from './types';

function App() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  const handleSelect = (item: SelectedItem) => {
    setSelectedItem(item);
  };

  const handleCloseTerminal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="relative w-screen h-screen bg-[#0a0a0a] overflow-hidden flex flex-col">
      {/* Background Visuals */}
      <div className="scanlines"></div>
      <div className="crt-flicker"></div>

      {/* Decorative Border Layer */}
      <div className="absolute inset-0 border-[16px] border-[#0a0a0a] pointer-events-none z-20 rounded-[30px]"></div>
      <div className="absolute inset-2 border-2 border-[#33ff00] opacity-50 pointer-events-none z-20 rounded-[20px]"></div>

      {/* Header / Top Bar */}
      <header className="relative z-30 flex justify-between items-center px-6 py-2 border-b-2 border-[#33ff00]/30 bg-[#001100]/80">
        <h1 className="text-3xl font-bold text-[#33ff00] tracking-widest glow-text">
          PIP-BOY <span className="text-sm align-top opacity-70">Model 3000</span>
        </h1>
        <div className="hidden md:flex space-x-8 text-[#33ff00]/80 text-xl font-bold font-vt323">
          <span>STATUS: <span className="text-[#ffb000]">ONLINE</span></span>
          <span>RADS: <span className="text-[#ff3333]">0</span></span>
        </div>
      </header>

      {/* Main Graph Area */}
      <main className="flex-1 relative z-10 overflow-hidden">
        <Flowchart
          onSelect={handleSelect}
          selectedItem={selectedItem}
        />
      </main>

      {/* Info Terminal Overlay */}
      <InfoTerminal selectedItem={selectedItem} onClose={handleCloseTerminal} />

      {/* Footer Instructions (Only visible when no selection) */}
      {!selectedItem && (
        <div className="absolute bottom-6 left-28 text-[#33ff00]/60 z-30 hidden md:block animate-pulse font-vt323 text-xl">
          {'>'} SELECT NODES OR CONNECTIONS TO BEGIN ANALYSIS...
        </div>
      )}
    </div>
  );
}

export default App;
