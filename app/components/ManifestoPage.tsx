import React from 'react';

interface ManifestoPageProps {
    onBack: () => void;
}

const ManifestoPage: React.FC<ManifestoPageProps> = ({ onBack }) => {
    return (
        <div className="theme-optimistic min-h-screen relative overflow-auto flex flex-col">
            <div className="texture-grain" />

            {/* Header */}
            <header
                className="relative z-10 flex items-center justify-between px-8 md:px-14 py-6 border-b-2 border-primary"
                style={{ borderColor: 'var(--border-primary)' }}
            >
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="btn-outline py-2 px-4 text-xs"
                        style={{ padding: '8px 16px' }}
                    >
                        ← Back
                    </button>
                    <span className="font-display text-xl font-bold">
                        aiornot.biz
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 relative z-10 px-8 md:px-14 py-12 md:py-20 max-w-[900px] mx-auto">
                {/* VERSION 1: The Uncomfortable Truths */}
                <article className="mb-24">
                    <div
                        className="inline-block px-4 py-1 mb-6 rounded-full border-2 text-sm font-semibold uppercase tracking-wide"
                        style={{
                            background: 'var(--bg-highlight)',
                            borderColor: 'var(--border-primary)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        Version 1
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ color: 'var(--text-primary)' }}>
                        The Uncomfortable Truths
                    </h1>

                    <div className="prose prose-lg" style={{ color: 'var(--text-primary)' }}>
                        <p className="text-3xl md:text-4xl font-bold mb-4">95% of AI pilots die.</p>

                        <p className="text-xl mb-2">Not from bad tech. Not from budget cuts.</p>
                        <p className="text-xl mb-8">From neglect.</p>

                        <p className="mb-2">Someone launched a proof of concept. It worked once.</p>
                        <p className="mb-8">Then nobody owned it. Nobody monitored it. Nobody updated it when the business changed.</p>

                        <p className="mb-12 font-semibold">So it rotted.</p>

                        <hr className="border-t-2 my-12" style={{ borderColor: 'var(--border-primary)' }} />

                        <p className="text-xl font-bold mb-6">Here's what nobody tells you:</p>

                        <div className="space-y-4 mb-12 font-body">
                            <p><strong>MIT ran the numbers.</strong> 95% of AI pilots never reach production.</p>
                            <p><strong>IBM surveyed enterprises.</strong> 75% of AI solutions fail to deliver expected ROI.</p>
                            <p><strong>Deloitte checked again.</strong> 85% of organizations aren't seeing significant value.</p>
                        </div>

                        <p className="text-xl font-semibold mb-2">The pattern is clear.</p>
                        <p className="mb-12">And it's not about the AI.</p>

                        <hr className="border-t-2 my-12" style={{ borderColor: 'var(--border-primary)' }} />

                        <p className="text-xl font-bold mb-6">It's about the decisions around the AI.</p>

                        <div className="space-y-2 mb-8">
                            <p>Which tasks should you automate? (Most shouldn't.)</p>
                            <p>Which strategy protects your business? (Depends what you sell.)</p>
                            <p>Where is your knowledge trapped? (Probably in someone's head.)</p>
                        </div>

                        <p className="mb-2">These aren't technical questions.</p>
                        <p className="mb-2">They're clarity questions.</p>
                        <p className="mb-12">And most teams skip them.</p>

                        <hr className="border-t-2 my-12" style={{ borderColor: 'var(--border-primary)' }} />

                        <p className="text-xl font-bold mb-8">We built three diagnostic frameworks—not another AI tool.</p>

                        <div className="space-y-8 mb-12">
                            <div
                                className="p-6 rounded-lg border-2"
                                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
                            >
                                <h3 className="font-display text-2xl font-bold mb-3" style={{ color: 'var(--bg-accent)' }}>TASK</h3>
                                <p className="mb-2">The automation decision tree.</p>
                                <p className="mb-2">Start with "Do I do this often?" and work through frequency, complexity, risk.</p>
                                <p className="mb-2">End with Automate, Augment, or Do It Yourself.</p>
                                <p className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Most tasks land on Augment. That's the dirty secret.</p>
                            </div>

                            <div
                                className="p-6 rounded-lg border-2"
                                style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)', color: 'white' }}
                            >
                                <h3 className="font-display text-2xl font-bold mb-3" style={{ color: 'var(--bg-highlight)' }}>STRATEGY</h3>
                                <p className="mb-2">The survival assessment.</p>
                                <p className="mb-2">Start with "Do you move atoms?"</p>
                                <p className="mb-2">If yes, AI is a tailwind—use it for efficiency and stop there.</p>
                                <p className="mb-2">If no, things get harder. Contestable markets. Commoditizing production. The mid-tier squeeze. The death trap.</p>
                                <p className="font-semibold" style={{ color: 'var(--bg-highlight)' }}>75% of firms in the middle won't make it.</p>
                            </div>

                            <div
                                className="p-6 rounded-lg border-2"
                                style={{ background: 'var(--bg-accent)', borderColor: 'var(--border-primary)', color: 'white' }}
                            >
                                <h3 className="font-display text-2xl font-bold mb-3" style={{ color: 'var(--bg-highlight)' }}>KNOWLEDGE</h3>
                                <p className="mb-2">The extraction playbook.</p>
                                <p className="mb-2">Start with "Is knowledge trapped?"</p>
                                <p className="mb-2">Your 22-year veteran who estimates projects in 20 minutes?</p>
                                <p className="mb-2">When they leave, that capability dies.</p>
                                <p className="font-semibold" style={{ color: 'var(--bg-highlight)' }}>Extract → Package → Distribute. Before you lose it.</p>
                            </div>
                        </div>

                        <hr className="border-t-2 my-12" style={{ borderColor: 'var(--border-primary)' }} />

                        <p className="mb-2">We don't sell AI hype.</p>
                        <p className="mb-8">We don't sell fear-mongering either.</p>

                        <p className="mb-2">We sell frameworks.</p>
                        <p className="mb-2">The kind that force you to think before you build.</p>
                        <p className="mb-2">To diagnose before you prescribe.</p>
                        <p className="mb-12">To ask the uncomfortable questions before the market asks them for you.</p>

                        <hr className="border-t-2 my-12" style={{ borderColor: 'var(--border-primary)' }} />

                        <p className="mb-2">The stats don't have to apply to you.</p>
                        <p className="mb-8">But they will—unless you think before you act.</p>

                        <button className="btn-optimistic mt-4" onClick={onBack}>
                            Start Thinking →
                        </button>
                    </div>
                </article>

                {/* Divider */}
                <div className="flex items-center gap-4 my-16">
                    <div className="flex-1 h-1" style={{ background: 'var(--border-primary)' }} />
                    <span className="font-display text-2xl font-bold" style={{ color: 'var(--text-tertiary)' }}>OR</span>
                    <div className="flex-1 h-1" style={{ background: 'var(--border-primary)' }} />
                </div>

                {/* VERSION 2: The Three Truths */}
                <article className="mb-24">
                    <div
                        className="inline-block px-4 py-1 mb-6 rounded-full border-2 text-sm font-semibold uppercase tracking-wide"
                        style={{
                            background: 'var(--bg-accent)',
                            borderColor: 'var(--border-primary)',
                            color: 'white'
                        }}
                    >
                        Version 2
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ color: 'var(--text-primary)' }}>
                        The Three Truths
                    </h1>

                    <div className="prose prose-lg" style={{ color: 'var(--text-primary)' }}>
                        {/* Truth 1 */}
                        <div className="mb-16">
                            <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--bg-accent)' }}>
                                TRUTH #1: Most AI projects die from neglect.
                            </h2>

                            <p className="mb-2">Not from bad technology.</p>
                            <p className="mb-2">Not from insufficient budget.</p>
                            <p className="mb-6">From set-and-forget.</p>

                            <p className="mb-2"><strong>MIT:</strong> 95% of AI pilots never reach production.</p>
                            <p className="mb-2">Someone has to be the operator.</p>
                            <p className="font-semibold">If nobody owns it, it rots.</p>
                        </div>

                        <hr className="border-t-2 my-12" style={{ borderColor: 'var(--border-primary)' }} />

                        {/* Truth 2 */}
                        <div className="mb-16">
                            <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--bg-accent)' }}>
                                TRUTH #2: Mid-tier firms are getting squeezed.
                            </h2>

                            <p className="mb-2"><strong>From below:</strong> 3-person startups with AI tools matching your 40-person output.</p>
                            <p className="mb-6"><strong>From above:</strong> Giants with distribution you can't touch.</p>

                            <p className="mb-2">The middle is a death trap.</p>
                            <p className="mb-2"><strong>IBM:</strong> 75% of AI solutions fail to deliver ROI.</p>
                            <p className="font-semibold">The ones that survive? They chose a direction. Lean or up-stack.</p>
                        </div>

                        <hr className="border-t-2 my-12" style={{ borderColor: 'var(--border-primary)' }} />

                        {/* Truth 3 */}
                        <div className="mb-16">
                            <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--bg-accent)' }}>
                                TRUTH #3: Your best employee is your biggest risk.
                            </h2>

                            <p className="mb-2">Everything that makes them great?</p>
                            <p className="mb-6">Trapped in their head.</p>

                            <p className="mb-2">When they leave, that knowledge dies with them.</p>
                            <p className="font-semibold">Extract it now, or lose it forever.</p>
                        </div>

                        <hr className="border-t-2 my-12" style={{ borderColor: 'var(--border-primary)' }} />

                        <p className="text-xl mb-2">This is not a sales page for AI tools.</p>
                        <p className="text-xl mb-8">This is a diagnostic.</p>

                        <p className="mb-2">Three charts. Real decisions.</p>
                        <p className="mb-8 font-bold">Task. Strategy. Knowledge.</p>

                        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                            The uncomfortable questions—answered before the market asks them for you.
                        </p>

                        <button className="btn-optimistic mt-4" onClick={onBack}>
                            Start the Diagnostic →
                        </button>
                    </div>
                </article>
            </main>

            {/* Footer */}
            <footer
                className="bg-tertiary text-white py-8 px-8 md:px-14 relative z-10"
                style={{ background: 'var(--bg-tertiary)', color: 'white' }}
            >
                <div className="text-center text-sm text-white/50">
                    © 2026 aiornot.biz Framework. Choose your favorite version above.
                </div>
            </footer>
        </div>
    );
};

export default ManifestoPage;
