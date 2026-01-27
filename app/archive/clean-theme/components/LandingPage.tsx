import React, { useState } from 'react';
import type { ChartMode } from '../types';
import type { Theme } from '../context/ThemeContext';

interface LandingPageProps {
  onStart: (mode: ChartMode, theme?: Theme) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [interfaceMode, setInterfaceMode] = useState<Theme>('clean');
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-body">
      <style>{`
        .paper-grid {
          background-image:
            radial-gradient(circle at 1px 1px, rgba(45, 55, 72, 0.08) 1px, transparent 0),
            linear-gradient(120deg, rgba(255, 222, 89, 0.2), rgba(96, 165, 250, 0.15));
          background-size: 24px 24px, 100% 100%;
        }

        .float-slow {
          animation: floatSlow 10s ease-in-out infinite;
        }

        .float-fast {
          animation: floatFast 6s ease-in-out infinite;
        }

        .stroke-dash {
          stroke-dasharray: 6 10;
          animation: dashFlow 12s linear infinite;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes floatFast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        @keyframes dashFlow {
          to { stroke-dashoffset: -160; }
        }

        @media (prefers-reduced-motion: reduce) {
          .float-slow,
          .float-fast,
          .stroke-dash {
            animation: none !important;
          }
        }
      `}</style>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 paper-grid opacity-70"></div>
        <div
          className="absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl opacity-70 float-slow"
          style={{ backgroundColor: 'var(--accent-yellow-light)' }}
        ></div>
        <div
          className="absolute top-40 -left-20 h-72 w-72 rounded-full blur-3xl opacity-60 float-fast"
          style={{ backgroundColor: 'var(--accent-blue-light)' }}
        ></div>

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-6 pt-6">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl border-2"
              style={{ borderColor: 'var(--border-sketch)', backgroundColor: 'var(--bg-secondary)' }}
            >
              <svg viewBox="0 0 48 48" className="h-full w-full p-2 text-[var(--text-primary)]">
                <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="32" cy="32" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21L27 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M10 32L20 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M28 20L38 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)]">AI or Node</p>
              <p className="font-display text-2xl">Decision Flow Studio</p>
            </div>
          </div>
          <div className="hidden items-center gap-4 text-sm text-[var(--text-secondary)] md:flex">
            <a className="cursor-pointer hover:text-[var(--text-primary)]" href="#flows">Flows</a>
            <a className="cursor-pointer hover:text-[var(--text-primary)]" href="#how">How it works</a>
            <a className="cursor-pointer hover:text-[var(--text-primary)]" href="#interfaces">Interfaces</a>
            <button
              onClick={() => onStart('strategy', interfaceMode)}
              className="btn-primary cursor-pointer px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
            >
              Start diagnostic
            </button>
          </div>
        </header>

        <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
          <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">ai.or.node.biz</p>
              <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                A clean, human-first way to decide where AI should win in your business.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-[var(--text-secondary)]">
                Run three fast diagnostics that replace guesswork with a clear flow: strategy fit,
                task automation, and knowledge distribution.
              </p>
              <div
                className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-full border-2 bg-[var(--bg-secondary)] px-3 py-2 text-xs uppercase tracking-[0.2em]"
                style={{ borderColor: 'var(--border-sketch)' }}
              >
                <span className="px-2 text-[var(--text-secondary)]">Interface</span>
                <button
                  type="button"
                  onClick={() => setInterfaceMode('clean')}
                  aria-pressed={interfaceMode === 'clean'}
                  className={`cursor-pointer rounded-full px-3 py-1 text-[10px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] ${
                    interfaceMode === 'clean'
                      ? 'bg-[var(--accent-yellow-light)] text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-accent)]'
                  }`}
                >
                  Clean
                </button>
                <button
                  type="button"
                  onClick={() => setInterfaceMode('pipboy')}
                  aria-pressed={interfaceMode === 'pipboy'}
                  className={`cursor-pointer rounded-full px-3 py-1 text-[10px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] ${
                    interfaceMode === 'pipboy'
                      ? 'bg-[var(--accent-yellow-light)] text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-accent)]'
                  }`}
                >
                  Pip-Boy
                </button>
                <span className="hidden sm:inline px-2 text-[var(--text-secondary)]">
                  {interfaceMode === 'clean' ? 'Recommended for first-time users' : 'Retro view for exploration'}
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => onStart('strategy', interfaceMode)}
                  className="btn-primary cursor-pointer px-6 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
                >
                  Start strategy diagnostic
                </button>
                <button
                  onClick={() => onStart('task', interfaceMode)}
                  className="cursor-pointer rounded-xl border-2 px-6 py-3 text-base font-semibold transition-colors duration-200 hover:bg-[var(--bg-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
                  style={{ borderColor: 'var(--border-sketch)' }}
                >
                  Assess a task
                </button>
                <button
                  onClick={() => onStart('knowledge', interfaceMode)}
                  className="cursor-pointer rounded-xl border-2 px-6 py-3 text-base font-semibold transition-colors duration-200 hover:bg-[var(--bg-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
                  style={{ borderColor: 'var(--border-sketch)' }}
                >
                  Build a knowledge playbook
                </button>
              </div>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: 'var(--accent-green)' }}
                  ></span>
                  No sign-up, runs in the browser
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: 'var(--accent-blue)' }}
                  ></span>
                  Export-ready outcomes
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: 'var(--accent-orange)' }}
                  ></span>
                  Built for operators and founders
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="card relative overflow-hidden p-6">
                <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                  <span className="uppercase tracking-[0.2em]">Flow preview</span>
                  <span className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: 'var(--border-light)' }}>
                    Clean mode
                  </span>
                </div>
                <h2 className="mt-4 font-display text-2xl">Strategy diagnostic</h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Follow the path to see whether you are in the Bits or Atoms business, and what to do next.
                </p>
                <div className="mt-6 rounded-2xl border-2 bg-[var(--bg-secondary)] p-4" style={{ borderColor: 'var(--border-sketch)' }}>
                  <svg viewBox="0 0 360 200" className="h-40 w-full">
                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="6" refX="8" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
                      </marker>
                    </defs>
                    <path
                      d="M40 60 C 120 60, 120 60, 200 60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="stroke-dash text-[var(--text-secondary)]"
                      markerEnd="url(#arrow)"
                    />
                    <path
                      d="M200 60 C 260 60, 260 120, 320 120"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="stroke-dash text-[var(--text-secondary)]"
                      markerEnd="url(#arrow)"
                    />
                    <path
                      d="M200 60 C 260 60, 260 20, 320 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="stroke-dash text-[var(--text-secondary)]"
                      markerEnd="url(#arrow)"
                    />
                    <rect x="20" y="40" width="40" height="40" rx="10" fill="var(--accent-yellow-light)" stroke="var(--border-sketch)" strokeWidth="2" />
                    <rect x="180" y="40" width="40" height="40" rx="10" fill="var(--bg-secondary)" stroke="var(--border-sketch)" strokeWidth="2" />
                    <rect x="300" y="0" width="40" height="40" rx="10" fill="var(--accent-blue-light)" stroke="var(--border-sketch)" strokeWidth="2" />
                    <rect x="300" y="100" width="40" height="40" rx="10" fill="var(--accent-orange)" stroke="var(--border-sketch)" strokeWidth="2" />
                  </svg>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-[var(--text-secondary)]">
                  <div className="rounded-xl border px-3 py-2" style={{ borderColor: 'var(--border-light)' }}>
                    3 diagnostics
                  </div>
                  <div className="rounded-xl border px-3 py-2" style={{ borderColor: 'var(--border-light)' }}>
                    Guided decisions
                  </div>
                  <div className="rounded-xl border px-3 py-2" style={{ borderColor: 'var(--border-light)' }}>
                    Clear outcomes
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-6 hidden w-40 rounded-2xl border-2 bg-[var(--bg-secondary)] p-4 text-xs text-[var(--text-secondary)] shadow-sm lg:block" style={{ borderColor: 'var(--border-sketch)' }}>
                <p className="font-semibold text-[var(--text-primary)]">Outcome preview</p>
                <p className="mt-2">Automate, Augment, or Protect. Each path ends with action.</p>
              </div>
            </div>
          </section>

          <section className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Flow-based clarity',
                text: 'Follow a clean decision map so teams align fast without long debates.',
              },
              {
                title: 'Built for momentum',
                text: 'Each step is short, direct, and designed to move you to action.',
              },
              {
                title: 'Designed to convert',
                text: 'Single-purpose CTAs and proof points keep users moving forward.',
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">{item.text}</p>
              </div>
            ))}
          </section>

          <section id="flows" className="mt-24">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">The three flows</p>
                <h2 className="mt-3 font-display text-3xl md:text-4xl">Pick your diagnostic path</h2>
              </div>
              <p className="max-w-md text-sm text-[var(--text-secondary)]">
                Start with strategy, then go deeper into task automation and knowledge distribution.
              </p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  mode: 'strategy' as ChartMode,
                  label: 'Strategy Diagnostic',
                  detail: 'Decide if you are built for Bits or Atoms and identify the next move.',
                  accent: 'var(--accent-yellow-light)',
                },
                {
                  mode: 'task' as ChartMode,
                  label: 'Task Assessment',
                  detail: 'Score any workflow and choose to automate, augment, or protect it.',
                  accent: 'var(--accent-blue-light)',
                },
                {
                  mode: 'knowledge' as ChartMode,
                  label: 'Knowledge Playbook',
                  detail: 'Extract, package, and distribute what makes your team valuable.',
                  accent: 'var(--bg-accent)',
                },
              ].map((card) => (
                <div key={card.label} className="card flex h-full flex-col p-6">
                  <div
                    className="w-fit rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                    style={{ backgroundColor: card.accent }}
                  >
                    Diagnostic
                  </div>
                  <h3 className="mt-4 font-display text-2xl">{card.label}</h3>
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">{card.detail}</p>
                  <div className="mt-6">
                    <button
                      onClick={() => onStart(card.mode, interfaceMode)}
                      className="cursor-pointer rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:bg-[var(--bg-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
                      style={{ borderColor: 'var(--border-sketch)' }}
                    >
                      Start this flow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="interfaces" className="mt-24">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">Interfaces</p>
                <h2 className="mt-3 font-display text-3xl md:text-4xl">Two visual modes. One decision engine.</h2>
                <p className="mt-4 text-sm text-[var(--text-secondary)]">
                  The clean interface mirrors the modern flow design. The Pip-Boy view is available for
                  retro fans who want a different vibe.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="card flex flex-col gap-4 p-6">
                  <div className="rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]" style={{ borderColor: 'var(--border-light)' }}>
                    Recommended
                  </div>
                  <h3 className="font-display text-2xl">Clean studio</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Warm, readable, and optimized for conversion. Matches the clean graph flow you designed.
                  </p>
                  <button
                    onClick={() => onStart('strategy', 'clean')}
                    className="btn-primary cursor-pointer px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
                  >
                    Launch clean mode
                  </button>
                </div>
                <div className="card flex flex-col gap-4 p-6">
                  <div className="rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]" style={{ borderColor: 'var(--border-light)' }}>
                    Optional
                  </div>
                  <h3 className="font-display text-2xl">Pip-Boy mode</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    A nostalgic terminal experience for exploring the same flows in a retro skin.
                  </p>
                  <button
                    onClick={() => onStart('strategy', 'pipboy')}
                    className="cursor-pointer rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:bg-[var(--bg-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
                    style={{ borderColor: 'var(--border-sketch)' }}
                  >
                    Launch Pip-Boy mode
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section id="how" className="mt-24">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">How it works</p>
                <h2 className="mt-3 font-display text-3xl md:text-4xl">Fast enough for today, deep enough for tomorrow</h2>
              </div>
              <p className="max-w-md text-sm text-[var(--text-secondary)]">
                Each flow is intentionally short. Most teams finish in under ten minutes.
              </p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Pick a path',
                  text: 'Start with strategy, then run task and knowledge diagnostics as needed.',
                },
                {
                  title: 'Follow the flow',
                  text: 'Click nodes and edges to answer yes or no. The next step appears instantly.',
                },
                {
                  title: 'Act on the outcome',
                  text: 'Get a clear outcome and apply it to your roadmap, team, or automation plan.',
                },
              ].map((step, index) => (
                <div key={step.title} className="card p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">{step.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-24">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">FAQ</p>
                <h2 className="mt-3 font-display text-3xl md:text-4xl">Questions teams ask first</h2>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      question: 'Do I need to prepare anything?',
                      answer: 'No prep needed. Start with a real project or a current business decision.',
                    },
                    {
                      question: 'How do we use the output?',
                      answer: 'Each outcome is a direct action: automate, augment, or protect. It feeds your roadmap.',
                    },
                    {
                      question: 'Can I switch modes later?',
                      answer: 'Yes. You can swap between clean and Pip-Boy at any time once you enter.',
                    },
                  ].map((item) => (
                    <details key={item.question} className="card px-5 py-4">
                      <summary className="cursor-pointer font-semibold text-[var(--text-primary)]">
                        {item.question}
                      </summary>
                      <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
              <div className="card flex flex-col justify-between p-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">Ready</p>
                  <h2 className="mt-3 font-display text-3xl">Move from curiosity to clarity.</h2>
                  <p className="mt-4 text-sm text-[var(--text-secondary)]">
                    Enter the flow and finish with a clear recommendation in minutes.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => onStart('strategy', interfaceMode)}
                    className="btn-primary cursor-pointer px-6 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
                  >
                    Start the strategy flow
                  </button>
                  <button
                    onClick={() => onStart('task', interfaceMode)}
                    className="cursor-pointer rounded-xl border-2 px-6 py-3 text-base font-semibold transition-colors duration-200 hover:bg-[var(--bg-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
                    style={{ borderColor: 'var(--border-sketch)' }}
                  >
                    Assess a task
                  </button>
                </div>
              </div>
            </div>
          </section>

          <footer className="mt-24 flex flex-col items-start justify-between gap-4 border-t-2 pt-6 text-sm text-[var(--text-secondary)] md:flex-row md:items-center">
            <div>
              <p className="font-semibold text-[var(--text-primary)]">AI or Node</p>
              <p>Decision flows for AI strategy, tasks, and knowledge.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <span>ai.or.node.biz</span>
              <span>Built for 2026 decision velocity</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
