import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Flowchart from './components/Flowchart';
import InfoTerminal from './components/InfoTerminal';
import CopyForAI from './components/CopyForAI';
import { ThemeProvider } from './context/ThemeContext';
import { SelectedItem, ChartMode } from './types';
import { STRATEGY_NODES, STRATEGY_EDGES } from './constants-strategy';
import { NODES, EDGES } from './constants';
import { KNOWLEDGE_NODES, KNOWLEDGE_EDGES } from './constants-knowledge';
import './themes/optimistic.css';

/**
 * Optimistic Theme App - Bold, Future-Forward Design
 * 
 * Uses the 'frontend-design' skill to create a visually striking interface.
 */
function App() {
    const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
    const [chartMode, setChartMode] = useState<ChartMode>('strategy');
    const [showLanding, setShowLanding] = useState(true);

    // ============================================================================
    // EASTER EGG: PIP-BOY THEME (CURRENTLY DISABLED)
    // This easter egg activates the archived Pip-Boy terminal theme.
    // To re-enable: uncomment the state, useEffect, and toast JSX below.
    // Trigger: Triple-click on footer version OR navigate to ?theme=pipboy
    // ============================================================================
    // const [showPipBoyEasterEgg, setShowPipBoyEasterEgg] = useState(false);
    //
    // useEffect(() => {
    //     const params = new URLSearchParams(window.location.search);
    //     if (params.get('theme') === 'pipboy') {
    //         setShowPipBoyEasterEgg(true);
    //         const timer = setTimeout(() => setShowPipBoyEasterEgg(false), 15000);
    //         return () => clearTimeout(timer);
    //     }
    // }, []);

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

    return (
        <ThemeProvider>
            {/* ============================================================================
                EASTER EGG TOAST (DISABLED)
                This toast appears when the Pip-Boy easter egg is triggered.
                To re-enable: uncomment this JSX and the state/useEffect above.
            ============================================================================ */}
            {/* {showPipBoyEasterEgg && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-[#0a0a0a] border-2 border-[#33ff00] text-[#33ff00] p-1 rounded shadow-[0_0_20px_rgba(51,255,0,0.3)] font-mono text-sm max-w-sm w-full">
                    <div className="bg-[#33ff00]/10 px-4 py-2 border-b border-[#33ff00] flex justify-between items-center">
                        <span className="font-bold flex items-center gap-2">
                            <span className="animate-pulse">☢️</span> ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM
                        </span>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="text-xs leading-relaxed">
                            <p>CRITICAL OVERRIDE DETECTED.</p>
                            <p>LEGACY ARCHIVE "PIP-BOY" IS AVAILABLE FOR DEPLOYMENT.</p>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <button
                                className="flex-1 bg-[#33ff00] text-black font-bold py-1 px-3 hover:bg-[#33ff00]/80 transition-colors"
                                onClick={() => {
                                    const { setTheme } = (window as any).__THEME_API__ || {};
                                    if (setTheme) setTheme('pipboy');
                                    setShowPipBoyEasterEgg(false);
                                }}
                            >
                                [ ACTIVATE ]
                            </button>
                            <button
                                className="border border-[#33ff00] py-1 px-3 hover:bg-[#33ff00]/10 transition-colors"
                                onClick={() => setShowPipBoyEasterEgg(false)}
                            >
                                IGNORE
                            </button>
                        </div>
                    </div>
                </div>
            )} */}


            {showLanding ? (
                <LandingPage onStart={handleStart} />
            ) : (
                <div className="theme-optimistic h-screen flex flex-col overflow-hidden">
                    {/* Header with back button */}
                    <header className="flex items-center justify-between px-8 py-4 border-b-2 border-primary bg-primary relative z-20"
                        style={{ borderColor: 'var(--border-primary)', background: 'var(--bg-primary)' }}>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBackToLanding}
                                className="btn-outline py-2 px-4 text-xs"
                                style={{ padding: '8px 16px' }}
                            >
                                ← Back
                            </button>
                            <span className="font-display text-xl font-bold">
                                aiornot.biz
                            </span>
                            <div className="h-6 w-0.5 bg-primary opacity-20"></div>
                            <span className="font-body text-sm font-semibold text-secondary uppercase tracking-wider">
                                {chartMode === 'strategy' && 'Strategy Diagnostic'}
                                {chartMode === 'task' && 'Task Assessment'}
                                {chartMode === 'knowledge' && 'Knowledge Playbook'}
                            </span>
                        </div>

                        <div className="flex gap-4 items-center">
                            {/* Theme Revert for Pip-Boy mode */}
                            <button
                                onClick={() => {
                                    const { setTheme } = (window as any).__THEME_API__ || {};
                                    if (setTheme) setTheme('clean');
                                }}
                                className="pipboy-only border border-[#33ff00] text-[#33ff00] px-3 py-1 text-[10px] font-bold hover:bg-[#33ff00] hover:text-black transition-colors"
                                id="header-revert-btn"
                            >
                                [ SYSTEM RESTORE ]
                            </button>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-accent border border-primary"></div>
                                <div className="w-3 h-3 rounded-full bg-tertiary border border-primary"></div>
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 flex overflow-hidden relative">
                        <div className="texture-grain"></div>

                        {/* Flowchart Area */}
                        <div className="flex-1 bg-secondary/50 relative" style={{ background: '#F5F5F5' }}>
                            <Flowchart
                                nodes={currentNodes}
                                edges={currentEdges}
                                onSelect={setSelectedItem}
                                selectedItem={selectedItem}
                            />
                        </div>

                        {/* Info Panel - Optimistic Drawer Style */}
                        {selectedItem && (
                            <div className="w-96 border-l-2 border-[#1E3D2F] h-full shadow-[-4px_0_0px_rgba(30,61,47,0.1)] relative z-30"
                                style={{
                                    background: '#FFFFFF'
                                }}>
                                <InfoTerminal
                                    selectedItem={selectedItem}
                                    onClose={() => setSelectedItem(null)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Copy for AI Button */}
                    <CopyForAI chartMode={chartMode} />
                </div >
            )}
        </ThemeProvider >
    );
}

export default App;
