import React from 'react';
import type { ChartMode } from '../types';
import '../themes/editorial.css';

interface LandingPageEditorialProps {
  onStart: (mode: ChartMode) => void;
}

const LandingPageEditorial: React.FC<LandingPageEditorialProps> = ({ onStart }) => {
  return (
    <div className="theme-editorial min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-14 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg" style={{ background: 'var(--bg-card)' }}></div>
          <span className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            AI or Not.BS
          </span>
        </div>
        <nav className="flex items-center gap-10">
          <a href="#features" className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>Features</a>
          <a href="#pricing" className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>Pricing</a>
          <a href="#about" className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>About</a>
          <button
            className="btn-primary px-6 py-3 text-sm"
            onClick={() => onStart('strategy')}
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* Performance Timeline */}
      <section className="px-14 py-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>026</span>
          <div className="flex gap-8">
            {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map(month => (
              <span key={month} className="font-body text-xs" style={{ color: 'var(--text-tertiary)' }}>{month}</span>
            ))}
          </div>
          <span className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>027</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-body text-xs font-semibold tracking-wider" style={{ color: 'var(--text-primary)' }}>
            PERFORMANCE
          </span>
          <div style={{ width: '500px', height: '2px', background: 'linear-gradient(90deg, #666666, #444444)' }}></div>
          <div className="flex gap-6 items-center">
            <div className="flex gap-2 items-center">
              <div className="w-2.5 h-2.5 rotate-45 border" style={{ borderColor: 'var(--text-secondary)' }}></div>
              <span className="font-body text-xs" style={{ color: 'var(--text-secondary)' }}>Resolution rate</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-2.5 h-2.5 rotate-45" style={{ background: 'var(--text-secondary)' }}></div>
              <span className="font-body text-xs" style={{ color: 'var(--text-secondary)' }}>Quality rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="px-14 py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-4xl">
          <p className="font-body text-sm font-medium tracking-widest mb-6" style={{ color: 'var(--text-accent)' }}>
            AI DECISION FRAMEWORK
          </p>
          <h1 className="text-display text-7xl mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
            Cut through the AI hype.<br />Decide what's real.
          </h1>
          <p className="font-body text-lg mb-8 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            A systematic framework to evaluate AI opportunities. Know when to automate, augment, or protect.
          </p>
          <div className="flex gap-4">
            <button className="btn-primary" onClick={() => onStart('strategy')}>
              Start Decision Flow
            </button>
            <button className="btn-secondary">
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-14 py-12">
        <div className="section-divider mb-8">
          <div className="diamond-accent"></div>
          <span className="font-body text-sm font-medium" style={{ color: 'var(--text-accent)' }}>Features</span>
          <div className="dotted-line" style={{ maxWidth: '600px' }}></div>
        </div>

        <div className="flex gap-0">
          {/* Smart Actions Card */}
          <div className="w-[420px]" style={{ background: 'var(--bg-accent)' }}>
            <div className="p-8 pb-6">
              <div className="flex justify-between mb-2">
                <h3 className="text-display text-3xl" style={{ color: 'var(--text-dark)' }}>Smart Actions</h3>
                <span className="font-body text-sm opacity-50" style={{ color: 'var(--text-dark)' }}>001</span>
              </div>
              <div className="relative h-70 border border-dashed flex items-center justify-center"
                   style={{ borderColor: 'var(--text-dark)', height: '280px' }}>
                {/* Concentric Circles Illustration */}
                <svg viewBox="0 0 340 240" className="w-full h-full">
                  <circle cx="170" cy="120" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <circle cx="170" cy="120" r="65" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <circle cx="170" cy="120" r="40" fill="var(--bg-accent)" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <text x="170" y="90" textAnchor="middle" fontSize="24" style={{ color: 'var(--text-dark)' }}>+</text>
                  <text x="170" y="155" textAnchor="middle" fontSize="24" style={{ color: 'var(--text-dark)' }}>−</text>
                  <text x="170" y="210" textAnchor="middle" fontSize="24" style={{ color: 'var(--text-dark)' }}>+</text>
                  <text x="90" y="125" textAnchor="middle" fontSize="24" style={{ color: 'var(--text-dark)' }}>−</text>
                  {/* Corner Brackets */}
                  <path d="M 0 20 L 0 0 L 20 0" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <path d="M 320 0 L 340 0 L 340 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <path d="M 0 220 L 0 240 L 20 240" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <path d="M 340 220 L 340 240 L 320 240" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                </svg>
              </div>
            </div>
            <div className="p-5 px-8" style={{ background: 'var(--bg-accent-dark)' }}>
              <p className="font-body text-sm" style={{ color: 'var(--text-dark)' }}>
                Execute actions: refunds, plan changes, CRM updates
              </p>
            </div>
          </div>

          {/* Auto-Resolve Card */}
          <div className="w-[420px]" style={{ background: 'var(--bg-card)' }}>
            <div className="p-8 pb-6">
              <div className="flex justify-between mb-2">
                <h3 className="text-display text-3xl" style={{ color: 'var(--text-dark)' }}>Auto-Resolve</h3>
                <span className="font-body text-sm opacity-40" style={{ color: 'var(--text-dark)' }}>002</span>
              </div>
              <div className="relative h-70 border border-dashed flex items-center justify-center"
                   style={{ borderColor: 'var(--text-dark)', height: '280px' }}>
                {/* Triangle Illustration */}
                <svg viewBox="0 0 340 240" className="w-full h-full">
                  <path d="M 170 20 L 320 220 L 20 220 Z" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <line x1="170" y1="20" x2="170" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" style={{ color: 'var(--text-dark)' }} />
                  <line x1="95" y1="120" x2="245" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" style={{ color: 'var(--text-dark)' }} />
                  {/* Corner Brackets */}
                  <path d="M 0 20 L 0 0 L 20 0" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <path d="M 320 0 L 340 0 L 340 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <path d="M 0 220 L 0 240 L 20 240" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <path d="M 340 220 L 340 240 L 320 240" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                </svg>
              </div>
            </div>
            <div className="p-5 px-8" style={{ background: '#E8E5E0' }}>
              <p className="font-body text-sm" style={{ color: 'var(--text-dark)' }}>
                Deflection + safe auto-resolution with guardrails
              </p>
            </div>
          </div>

          {/* Agent Assist Card */}
          <div className="w-[420px]" style={{ background: 'var(--bg-card)' }}>
            <div className="p-8 pb-6">
              <div className="flex justify-between mb-2">
                <h3 className="text-display text-3xl" style={{ color: 'var(--text-dark)' }}>Agent assist</h3>
                <span className="font-body text-sm opacity-40" style={{ color: 'var(--text-dark)' }}>003</span>
              </div>
              <div className="relative h-70 border border-dashed flex items-center justify-center"
                   style={{ borderColor: 'var(--text-dark)', height: '280px' }}>
                {/* Venn Diagram Illustration */}
                <svg viewBox="0 0 340 240" className="w-full h-full">
                  <circle cx="120" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <circle cx="220" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <circle cx="170" cy="160" r="70" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  {/* Corner Brackets */}
                  <path d="M 0 20 L 0 0 L 20 0" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <path d="M 320 0 L 340 0 L 340 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <path d="M 0 220 L 0 240 L 20 240" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                  <path d="M 340 220 L 340 240 L 320 240" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)' }} />
                </svg>
              </div>
            </div>
            <div className="p-5 px-8" style={{ background: '#E8E5E0' }}>
              <p className="font-body text-sm" style={{ color: 'var(--text-dark)' }}>
                Suggested replies, brand tone, cited knowledge, macros
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Flow Section */}
      <section className="px-14 py-12" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-divider mb-8">
          <div className="diamond-accent"></div>
          <span className="font-body text-sm font-medium" style={{ color: 'var(--text-accent)' }}>Decision Flow</span>
          <div className="dotted-line" style={{ maxWidth: '500px' }}></div>
          <span className="font-body text-xs ml-auto" style={{ color: 'var(--text-tertiary)' }}>Interactive decision tree</span>
        </div>

        <div className="relative border p-10" style={{
          background: 'var(--bg-primary)',
          borderColor: 'var(--border-primary)',
          height: '500px'
        }}>
          {/* This will be replaced with the actual flowchart component */}
          <div className="flex flex-col items-center gap-4">
            <div className="px-8 py-4 text-center" style={{ background: 'var(--bg-accent)' }}>
              <span className="text-display text-lg" style={{ color: 'var(--text-dark)' }}>Start Assessment</span>
            </div>
            <div style={{ height: '50px', width: '2px', background: 'var(--bg-accent)' }}></div>
            <div className="px-8 py-6 text-center" style={{ background: 'var(--bg-card)' }}>
              <span className="text-display" style={{ color: 'var(--text-dark)' }}>Is this a digital<br />product/service?</span>
            </div>
            <div className="flex gap-16 mt-8">
              <div className="px-6 py-4" style={{ background: 'var(--bg-card)' }}>
                <span className="text-display" style={{ color: 'var(--text-dark)' }}>Bits Business</span>
              </div>
              <div className="px-6 py-4" style={{ background: 'var(--bg-card)' }}>
                <span className="text-display" style={{ color: 'var(--text-dark)' }}>Atoms Business</span>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <div className="px-5 py-3" style={{ background: 'var(--bg-accent)' }}>
                <span className="font-body text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>AUTOMATE</span>
              </div>
              <div className="px-5 py-3" style={{ background: 'var(--bg-card)' }}>
                <span className="font-body text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>AUGMENT</span>
              </div>
              <div className="px-5 py-3" style={{ background: 'var(--bg-card)' }}>
                <span className="font-body text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>PROTECT</span>
              </div>
              <div className="px-5 py-3" style={{ background: 'var(--bg-accent-dark)' }}>
                <span className="font-body text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>HYBRID</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="px-14 py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="section-divider mb-6">
          <div className="diamond-outline"></div>
          <span className="font-body text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Enterprise</span>
          <div className="dotted-line" style={{ maxWidth: '600px' }}></div>
        </div>

        <div className="relative border p-10 px-12" style={{
          borderColor: 'var(--border-primary)',
          height: '200px'
        }}>
          <h2 className="text-display absolute left-12 top-10" style={{
            fontSize: 'var(--text-5xl)',
            color: 'var(--text-primary)'
          }}>
            Role-based access
          </h2>
          {/* Corner Brackets */}
          <div className="absolute top-2 left-2 w-8 h-8 border-l border-t" style={{ borderColor: 'var(--border-secondary)' }}></div>
          <div className="absolute top-2 right-2 w-8 h-8 border-r border-t" style={{ borderColor: 'var(--border-secondary)' }}></div>
          <div className="absolute bottom-2 left-2 w-8 h-8 border-l border-b" style={{ borderColor: 'var(--border-secondary)' }}></div>
          <div className="absolute bottom-2 right-2 w-8 h-8 border-r border-b" style={{ borderColor: 'var(--border-secondary)' }}></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between px-14 py-12" style={{ background: 'var(--bg-tertiary)' }}>
        <div>
          <h3 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>AI or Not.BS</h3>
          <p className="font-body text-xs" style={{ color: 'var(--text-tertiary)' }}>Cut through the hype. Decide what's real.</p>
        </div>
        <div className="flex gap-8 items-center">
          <a href="#features" className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>Features</a>
          <a href="#pricing" className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>Pricing</a>
          <a href="#contact" className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>Contact</a>
          <span className="font-body text-xs" style={{ color: 'var(--border-secondary)' }}>© 2026 AI or Not.BS</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageEditorial;
