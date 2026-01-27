import React from 'react';
import type { ChartMode } from '../types';
import heroAnimationGif from '../assets/hero-animation.gif';
import '../themes/optimistic.css';

interface LandingPageProps {
    onStart: (mode: ChartMode) => void;
    onShowManifesto: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onShowManifesto }) => {
    return (
        <div className="theme-optimistic min-h-screen relative overflow-auto flex flex-col">
            <div className="texture-grain"></div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-8 md:px-14 py-6 border-b-2 border-primary" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center border-2 border-primary" style={{ background: 'var(--bg-accent)', borderColor: 'var(--border-primary)' }}>
                        <span className="font-display font-bold text-white text-lg">AI</span>
                    </div>
                    <span className="font-display text-2xl font-bold tracking-tight">
                        aiornot.biz
                    </span>
                </div>
                <nav className="flex items-center gap-10 hidden md:flex">
                    <a href="#features">Features</a>
                    <a href="#methodology">Methodology</a>
                    <a href="#about">About</a>
                    <button
                        className="btn-optimistic"
                        onClick={() => onStart('strategy')}
                    >
                        Get Started
                    </button>
                </nav>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 relative z-10">

                {/* Ticker / Marquee styled bar */}
                <div className="bg-tertiary text-inverse py-3 overflow-hidden whitespace-nowrap border-b-2 border-primary" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-inverse)', borderColor: 'var(--border-primary)' }}>
                    <div className="flex gap-8 items-center font-body text-sm font-bold tracking-widest uppercase">
                        <span>// Decisions for 2026 //</span>
                        <span>Automate</span>
                        <span>Augment</span>
                        <span>Protect</span>
                        <span>// Cut the Hype //</span>
                        <span>Decide what's real</span>
                        <span>// Decisions for 2026 //</span>
                        <span>Automate</span>
                        <span>Augment</span>
                        <span>Protect</span>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="px-8 md:px-14 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-[1440px] mx-auto">
                    <div>
                        <div className="inline-block px-4 py-1 mb-6 rounded-full border-2 border-primary bg-highlight" style={{ background: 'var(--bg-highlight)', borderColor: 'var(--border-primary)' }}>
                            <span className="font-display font-bold text-sm text-primary uppercase tracking-wide">AI Decision Framework</span>
                        </div>
                        <h1 className="text-display-xl mb-6 text-primary">
                            Your AI strategy.<br />
                            <span style={{ color: 'var(--text-accent)' }}>Clarified in 5 minutes.</span>
                        </h1>
                        <p className="font-body text-xl mb-6 max-w-lg leading-relaxed text-secondary" style={{ color: 'var(--text-secondary)' }}>
                            3 decision frameworks for SMB owners who don't have time for AI hype.
                        </p>
                        {/* Trust Badge */}
                        <div className="flex items-center gap-2 mb-8 text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 0L10 6H16L11 9.5L13 16L8 12L3 16L5 9.5L0 6H6L8 0Z" fill="var(--bg-accent)" />
                            </svg>
                            Based on 1,000+ executive interviews
                        </div>
                        <div className="flex gap-4 flex-wrap">
                            <button className="btn-optimistic" onClick={() => onStart('strategy')}>
                                Start the Diagnostic
                            </button>
                            <button className="btn-outline" onClick={onShowManifesto}>
                                Read the Manifesto
                            </button>
                        </div>
                    </div>

                    {/* Remotion-rendered Hero Animation */}
                    <div className="relative h-[500px] w-full flex items-center justify-center">
                        <img
                            src={heroAnimationGif}
                            alt="AI Decision Flowchart Animation"
                            className="max-w-[480px] w-full h-auto rounded-lg"
                            style={{
                                border: '2px solid var(--border-primary)',
                                boxShadow: 'var(--shadow-hard)'
                            }}
                        />
                    </div>
                </section>

                {/* Problem Section - Name Their Pain */}
                <section id="problem" className="px-8 md:px-14 py-20 border-t-2 border-primary" style={{ borderColor: 'var(--border-primary)' }}>
                    <div className="max-w-[1440px] mx-auto">
                        <h2 className="text-display-lg mb-12 text-center">
                            You know AI matters.<br />
                            <span style={{ color: 'var(--text-secondary)' }}>But you don't know where to start.</span>
                        </h2>

                        {/* Three Pain Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {/* Pain Card 1: Task */}
                            <div className="p-6 border-2 border-primary bg-white" style={{ borderColor: 'var(--border-primary)', boxShadow: 'var(--shadow-hard)' }}>
                                <div className="w-12 h-12 mb-4 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-highlight)' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
                                        <path d="M9 11l3 3L22 4" />
                                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                    </svg>
                                </div>
                                <p className="font-body text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                                    "Everyone says <strong>automate everything</strong>. But <em>WHAT</em> exactly?"
                                </p>
                            </div>

                            {/* Pain Card 2: Knowledge */}
                            <div className="p-6 border-2 border-primary bg-white" style={{ borderColor: 'var(--border-primary)', boxShadow: 'var(--shadow-hard)' }}>
                                <div className="w-12 h-12 mb-4 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-tertiary)' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                                    </svg>
                                </div>
                                <p className="font-body text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                                    "Your team's at <strong>different AI levels</strong>. Some scared, some ahead of you."
                                </p>
                            </div>

                            {/* Pain Card 3: Strategy */}
                            <div className="p-6 border-2 border-primary bg-white" style={{ borderColor: 'var(--border-primary)', boxShadow: 'var(--shadow-hard)' }}>
                                <div className="w-12 h-12 mb-4 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-accent)' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 16v-4M12 8h.01" />
                                    </svg>
                                </div>
                                <p className="font-body text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                                    "Consultants talk <strong>strategy</strong>. You need a <em>decision</em>."
                                </p>
                            </div>
                        </div>

                        {/* Kicker Line */}
                        <div className="text-center">
                            <p className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                The answer isn't another AI tool. <span style={{ color: 'var(--text-accent)' }}>It's a decision framework.</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Three Flowcharts Section */}
                <section className="px-8 md:px-14 py-20 border-t-2 border-primary" id="features" style={{ borderColor: 'var(--border-primary)' }}>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-display-lg mb-4">Three Flowcharts. One Clear Path.</h2>
                            <p className="font-body text-lg text-secondary max-w-md">Each diagram answers a specific question so you walk away with a decision, not more confusion.</p>
                        </div>
                        <div className="h-0.5 flex-1 bg-border-primary mx-8 hidden md:block" style={{ background: 'var(--border-primary)' }}></div>
                        <div className="flex gap-2">
                            <span className="w-4 h-4 rounded-full bg-accent border-2 border-primary" style={{ background: 'var(--bg-accent)' }}></span>
                            <span className="w-4 h-4 rounded-full bg-tertiary border-2 border-primary" style={{ background: 'var(--bg-tertiary)' }}></span>
                            <span className="w-4 h-4 rounded-full bg-highlight border-2 border-primary" style={{ background: 'var(--bg-highlight)' }}></span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1: Task Assessment - Linear spine with Y-split */}
                        <div className="card-optimistic hover:-translate-y-2 transition-transform duration-300">
                            <div className="h-48 mb-6 bg-highlight border-2 border-primary rounded-lg flex items-center justify-center p-6 relative overflow-hidden" style={{ background: 'var(--bg-highlight)', borderColor: 'var(--border-primary)' }}>
                                <svg viewBox="0 0 120 140" className="w-full h-full max-w-[100px]" fill="none">
                                    {/* Top decision node */}
                                    <ellipse cx="60" cy="18" rx="28" ry="14" stroke="#1E3D2F" strokeWidth="3" fill="white" />
                                    {/* Y-split lines */}
                                    <line x1="60" y1="32" x2="35" y2="50" stroke="#1E3D2F" strokeWidth="3" />
                                    <line x1="60" y1="32" x2="85" y2="50" stroke="#1E3D2F" strokeWidth="3" />
                                    {/* Left branch node */}
                                    <ellipse cx="35" cy="60" rx="20" ry="12" stroke="#1E3D2F" strokeWidth="3" fill="white" />
                                    {/* Right branch node */}
                                    <ellipse cx="85" cy="60" rx="20" ry="12" stroke="#1E3D2F" strokeWidth="3" fill="white" />
                                    {/* Converge to center */}
                                    <line x1="35" y1="72" x2="60" y2="90" stroke="#1E3D2F" strokeWidth="3" />
                                    <line x1="85" y1="72" x2="60" y2="90" stroke="#1E3D2F" strokeWidth="3" />
                                    {/* Central decision */}
                                    <ellipse cx="60" cy="100" rx="24" ry="13" stroke="#1E3D2F" strokeWidth="3" fill="white" />
                                    {/* Final outcome - highlighted */}
                                    <line x1="60" y1="113" x2="60" y2="125" stroke="#1E3D2F" strokeWidth="3" />
                                    <rect x="40" y="122" width="40" height="14" rx="2" stroke="#1E3D2F" strokeWidth="3" fill="#FF6B4A" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Task Assessment</h3>
                            <p className="text-secondary leading-relaxed mb-4">"What should I <strong>automate</strong> vs. do myself?"</p>
                            <p className="text-xs uppercase tracking-wide mb-6" style={{ color: 'var(--text-tertiary)' }}>→ Clear action per task</p>
                            <button className="btn-outline w-full text-center" onClick={() => onStart('task')}>Take the Diagnostic →</button>
                        </div>

                        {/* Card 2: Strategy Diagnostic - V-shape with side outcomes */}
                        <div className="card-optimistic hover:-translate-y-2 transition-transform duration-300">
                            <div className="h-48 mb-6 bg-tertiary border-2 border-primary rounded-lg flex items-center justify-center p-6 relative overflow-hidden" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)' }}>
                                <svg viewBox="0 0 140 140" className="w-full h-full max-w-[120px]" fill="none">
                                    {/* Top entry node */}
                                    <ellipse cx="70" cy="15" rx="26" ry="12" stroke="white" strokeWidth="3" fill="none" />
                                    {/* Branch to sides */}
                                    <line x1="55" y1="25" x2="25" y2="45" stroke="white" strokeWidth="3" />
                                    <line x1="85" y1="25" x2="115" y2="45" stroke="white" strokeWidth="3" />
                                    {/* Left outcome box */}
                                    <rect x="8" y="42" width="34" height="18" rx="2" stroke="white" strokeWidth="3" fill="#D4E6B5" />
                                    {/* Right outcome box */}
                                    <rect x="98" y="42" width="34" height="18" rx="2" stroke="white" strokeWidth="3" fill="#D4E6B5" />
                                    {/* Central spine continues */}
                                    <line x1="70" y1="27" x2="70" y2="50" stroke="white" strokeWidth="3" />
                                    <ellipse cx="70" cy="62" rx="22" ry="11" stroke="white" strokeWidth="3" fill="none" />
                                    <line x1="70" y1="73" x2="70" y2="90" stroke="white" strokeWidth="3" />
                                    <ellipse cx="70" cy="100" rx="20" ry="10" stroke="white" strokeWidth="3" fill="none" />
                                    {/* Bottom split */}
                                    <line x1="55" y1="108" x2="35" y2="125" stroke="white" strokeWidth="3" />
                                    <line x1="85" y1="108" x2="105" y2="125" stroke="white" strokeWidth="3" />
                                    {/* Bottom outcomes */}
                                    <rect x="20" y="122" width="30" height="14" rx="2" stroke="white" strokeWidth="3" fill="#FF6B4A" />
                                    <rect x="90" y="122" width="30" height="14" rx="2" stroke="white" strokeWidth="3" fill="#D4E6B5" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Strategy Diagnostic</h3>
                            <p className="text-secondary leading-relaxed mb-4">"Where does my business stand in the <strong>AI landscape</strong>?"</p>
                            <p className="text-xs uppercase tracking-wide mb-6" style={{ color: 'var(--text-tertiary)' }}>→ Strategic positioning</p>
                            <button className="btn-optimistic w-full text-center" onClick={() => onStart('strategy')}>Take the Diagnostic →</button>
                        </div>

                        {/* Card 3: Knowledge Playbook - Diamond converge to 3 outputs */}
                        <div className="card-optimistic hover:-translate-y-2 transition-transform duration-300">
                            <div className="h-48 mb-6 bg-accent border-2 border-primary rounded-lg flex items-center justify-center p-6 relative overflow-hidden" style={{ background: 'var(--bg-accent)', borderColor: 'var(--border-primary)' }}>
                                <svg viewBox="0 0 140 140" className="w-full h-full max-w-[120px]" fill="none">
                                    {/* Top diamond (entry) - rotated square */}
                                    <rect x="55" y="5" width="30" height="20" rx="2" stroke="white" strokeWidth="3" fill="none" />
                                    {/* Lines branching from top */}
                                    <line x1="55" y1="15" x2="30" y2="35" stroke="white" strokeWidth="3" />
                                    <line x1="85" y1="15" x2="110" y2="35" stroke="white" strokeWidth="3" />
                                    {/* Side extraction nodes */}
                                    <ellipse cx="30" cy="48" rx="18" ry="10" stroke="white" strokeWidth="3" fill="none" />
                                    <ellipse cx="70" cy="48" rx="18" ry="10" stroke="white" strokeWidth="3" fill="none" />
                                    <ellipse cx="110" cy="48" rx="18" ry="10" stroke="white" strokeWidth="3" fill="none" />
                                    {/* Converge lines */}
                                    <line x1="30" y1="58" x2="70" y2="75" stroke="white" strokeWidth="3" />
                                    <line x1="70" y1="58" x2="70" y2="75" stroke="white" strokeWidth="3" />
                                    <line x1="110" y1="58" x2="70" y2="75" stroke="white" strokeWidth="3" />
                                    {/* Quality gate - center node with accent */}
                                    <ellipse cx="70" cy="88" rx="22" ry="12" stroke="white" strokeWidth="3" fill="#1E3D2F" />
                                    {/* Fan out to 3 distribution outputs */}
                                    <line x1="55" y1="98" x2="25" y2="118" stroke="white" strokeWidth="3" />
                                    <line x1="70" y1="100" x2="70" y2="118" stroke="white" strokeWidth="3" />
                                    <line x1="85" y1="98" x2="115" y2="118" stroke="white" strokeWidth="3" />
                                    {/* 3 output boxes */}
                                    <rect x="10" y="118" width="30" height="14" rx="2" stroke="white" strokeWidth="3" fill="#D4E6B5" />
                                    <rect x="55" y="118" width="30" height="14" rx="2" stroke="white" strokeWidth="3" fill="#D4E6B5" />
                                    <rect x="100" y="118" width="30" height="14" rx="2" stroke="white" strokeWidth="3" fill="#D4E6B5" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Knowledge Distribution</h3>
                            <p className="text-secondary leading-relaxed mb-4">"How do I distribute <strong>AI knowledge</strong> to my team?"</p>
                            <p className="text-xs uppercase tracking-wide mb-6" style={{ color: 'var(--text-tertiary)' }}>→ Team maturity plan</p>
                            <button className="btn-outline w-full text-center" onClick={() => onStart('knowledge')}>Take the Diagnostic →</button>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="bg-tertiary text-white py-16 px-8 md:px-14 relative z-10" style={{ background: 'var(--bg-tertiary)', color: 'white' }}>
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    <div>
                        <h4 className="font-display text-4xl font-bold mb-6">aiornot.biz</h4>
                        <p className="max-w-xs text-white/70">Cut through the hype. A framework for the rest of us.</p>
                    </div>
                    <div className="flex gap-16">
                        <div className="flex flex-col gap-4">
                            <strong className="text-highlight uppercase tracking-wider mb-2" style={{ color: 'var(--bg-highlight)' }}>App</strong>
                            <a href="#" className="hover:text-accent transition-colors">Features</a>
                            <a href="#" className="hover:text-accent transition-colors">Pricing</a>
                            <a href="#" className="hover:text-accent transition-colors">Download</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <strong className="text-highlight uppercase tracking-wider mb-2" style={{ color: 'var(--bg-highlight)' }}>Connect</strong>
                            <a href="#" className="hover:text-accent transition-colors">Twitter</a>
                            <a href="#" className="hover:text-accent transition-colors">GitHub</a>
                            <a href="#" className="hover:text-accent transition-colors">Discord</a>
                        </div>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-white/20 text-center md:text-left text-sm text-white/50 flex justify-between items-center">
                    <span>© 2026 aiornot.biz Framework.</span>
                    <div className="flex items-center gap-4">
                        {/* ============================================================================
                            EASTER EGG TRIGGER (DISABLED)
                            Triple-click on version string to activate Pip-Boy theme.
                            To re-enable: uncomment the onClick handler and revert button.
                        ============================================================================ */}
                        <span className="font-mono opacity-40">
                            v2.0.0-optimistic
                        </span>
                        {/* EASTER EGG TRIGGER (disabled):
                        <span
                            className="font-mono cursor-help opacity-40 hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                                if (e.detail === 3) {
                                    window.location.search = '?theme=pipboy';
                                }
                            }}
                            title="Click to authenticate..."
                        >
                            v2.0.0-optimistic
                        </span>
                        */}
                        {/* REVERT BUTTON (disabled):
                        <button
                            className="pipboy-only font-mono text-[10px] border border-white/20 px-2 py-0.5 hover:bg-white hover:text-black transition-all"
                            onClick={() => {
                                const { setTheme } = (window as any).__THEME_API__ || {};
                                if (setTheme) setTheme('clean');
                            }}
                        >
                            [ RESTORE MODERN UI ]
                        </button>
                        */}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
