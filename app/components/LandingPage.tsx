import React from 'react';
import type { ChartMode } from '../types';
import '../themes/optimistic.css';

interface LandingPageProps {
    onStart: (mode: ChartMode) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
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
                        <h1 className="text-display-xl mb-8 text-primary">
                            Real Impact.<br />
                            <span style={{ color: 'var(--text-accent)' }}>No Fluff.</span>
                        </h1>
                        <p className="font-body text-xl mb-10 max-w-lg leading-relaxed text-secondary" style={{ color: 'var(--text-secondary)' }}>
                            A systematic framework to evaluate AI opportunities. Stop guessing and start deciding when to automate, augment, or protect.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <button className="btn-optimistic" onClick={() => onStart('strategy')}>
                                Start Decision Flow
                            </button>
                            <button className="btn-outline">
                                Read the Manifesto
                            </button>
                        </div>
                    </div>

                    {/* Abstract Hero Illustration - Woodblock Style */}
                    <div className="relative h-[500px] w-full flex items-center justify-center">
                        <svg viewBox="0 0 500 500" className="w-full h-full max-w-[500px]">
                            {/* Background Shapes */}
                            <circle cx="250" cy="250" r="200" fill="var(--bg-secondary)" stroke="var(--border-primary)" strokeWidth="3" />
                            <rect x="250" y="50" width="200" height="400" fill="var(--bg-highlight)" stroke="var(--border-primary)" strokeWidth="3" rx="100" transform="rotate(15 250 250)" style={{ mixBlendMode: 'multiply' }} />

                            {/* Central Element */}
                            <rect x="150" y="150" width="200" height="200" fill="var(--bg-primary)" stroke="var(--border-primary)" strokeWidth="3" rx="20" />

                            {/* Connectors */}
                            <path d="M100 250 L150 250" stroke="var(--border-primary)" strokeWidth="3" markerEnd="url(#arrow)" />
                            <path d="M350 250 L400 250" stroke="var(--border-primary)" strokeWidth="3" />
                            <path d="M250 100 L250 150" stroke="var(--border-primary)" strokeWidth="3" />
                            <path d="M250 350 L250 400" stroke="var(--border-primary)" strokeWidth="3" />

                            {/* Node Icons */}
                            <circle cx="250" cy="250" r="40" fill="var(--bg-accent)" stroke="var(--border-primary)" strokeWidth="3" />
                            <text x="250" y="260" textAnchor="middle" fill="white" fontSize="40" fontFamily="var(--font-display)" fontWeight="bold">AI</text>
                        </svg>
                    </div>
                </section>

                {/* Features / Cards Section */}
                <section className="px-8 md:px-14 py-20 border-t-2 border-primary" id="features" style={{ borderColor: 'var(--border-primary)' }}>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-display-lg mb-4">Capabilities</h2>
                            <p className="font-body text-lg text-secondary max-w-md">Tools designed to help you separate the signal from the noise.</p>
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
                            <p className="text-secondary leading-relaxed mb-6">Analyze daily tasks. Decide if they are worth automating, augmenting, or leaving manual.</p>
                            <button className="btn-outline w-full text-center" onClick={() => onStart('task')}>Start Assessment</button>
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
                            <p className="text-secondary leading-relaxed mb-6">The core framework. Determine if your problem is technical, organizational, or imaginary.</p>
                            <button className="btn-optimistic w-full text-center" onClick={() => onStart('strategy')}>Run Diagnostic</button>
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
                            <h3 className="text-2xl font-bold mb-3">Knowledge Playbook</h3>
                            <p className="text-secondary leading-relaxed mb-6">Your library of tactics. Access suggested replies, tone guides, and macros.</p>
                            <button className="btn-outline w-full text-center" onClick={() => onStart('knowledge')}>Open Playbook</button>
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
