import React, { useState } from 'react';
import LandingPageEditorial from './components/LandingPageEditorial';
import FlowchartEditorial from './components/FlowchartEditorial';
import InfoTerminal from './components/InfoTerminal';
import { ThemeProvider } from './context/ThemeContext';
import { SelectedItem, ChartMode } from './types';
import { STRATEGY_NODES, STRATEGY_EDGES } from './constants-strategy';
import { NODES, EDGES } from './constants';
import { KNOWLEDGE_NODES, KNOWLEDGE_EDGES } from './constants-knowledge';
import './themes/editorial.css';

/**
 * Editorial Theme App - AI or Not.BS Landing Page
 *
 * This is a separate app instance using the editorial design aesthetic.
 * Features:
 * - Sophisticated dark theme with terracotta accents
 * - Playfair Display serif typography
 * - Clean, modern flowchart styling
 * - Professional landing page design
 *
 * To use this instead of the main App, update index.html to import AppEditorial
 */
function AppEditorial() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [chartMode, setChartMode] = useState<ChartMode>('strategy');
  const [showLanding, setShowLanding] = useState(true);

  // Select the appropriate nodes and edges based on mode
  const currentNodes = chartMode === 'strategy'
    ? STRATEGY_NODES
    : chartMode === 'knowledge'
      ? KNOWLEDGE_NODES
      : NODES;

  const currentEdges = chartMode === 'strategy'
    ? STRATEGY_EDGES
    : chartMode === 'knowledge'
      ? KNOWLEDGE_EDGES
      : EDGES;

  const handleStart = (mode: ChartMode) => {
    setChartMode(mode);
    setShowLanding(false);
  };

  const handleBackToLanding = () => {
    setShowLanding(true);
    setSelectedItem(null);
  };

  if (showLanding) {
    return (
      <ThemeProvider>
        <LandingPageEditorial onStart={handleStart} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="theme-editorial h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
        {/* Header with back button */}
        <header className="flex items-center justify-between px-14 py-6 border-b"
          style={{ borderColor: 'var(--border-primary)' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToLanding}
              className="font-body text-sm hover:opacity-70 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
            >
              ← Back to Home
            </button>
            <span className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              AI or Not.BS
            </span>
          </div>
          <div className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
            {chartMode === 'strategy' && 'Strategy Diagnostic'}
            {chartMode === 'task' && 'Task Assessment'}
            {chartMode === 'knowledge' && 'Knowledge Playbook'}
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Flowchart */}
          <div className="flex-1">
            <FlowchartEditorial
              nodes={currentNodes}
              edges={currentEdges}
              onSelect={setSelectedItem}
              selectedItem={selectedItem}
            />
          </div>

          {/* Info Panel */}
          {selectedItem && (
            <div className="w-96 border-l overflow-y-auto"
              style={{
                background: 'var(--bg-secondary)',
                borderColor: 'var(--border-primary)'
              }}>
              <InfoTerminal selectedItem={selectedItem} />
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AppEditorial;
