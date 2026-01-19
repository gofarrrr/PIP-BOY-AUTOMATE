import React from 'react';
import { PathSummary } from '../hooks/useDiagnosticPath';

interface SurvivalBlueprintProps {
    pathSummary: PathSummary;
    onClose: () => void;
    onReset: () => void;
}

// Outcome-specific blueprint content
const OUTCOME_BLUEPRINTS: Record<string, {
    title: string;
    severity: 'green' | 'yellow' | 'red';
    diagnosis: string;
    actions: string[];
    cta: string;
}> = {
    efficiency: {
        title: 'THE PROTECTED PLAYER',
        severity: 'green',
        diagnosis: 'You are in a TAILWIND position. AI is your friend, not your threat. Your physical presence creates a moat that no algorithm can cross.',
        actions: [
            'Automate back-office: scheduling, dispatch, invoicing, customer comms',
            'Instant response systems: every call answered, every quote delivered fast',
            'Do NOT over-transform. You are a plumber. Just do better plumbing with AI assistance.',
        ],
        cta: 'Want to 10x your operational efficiency without disrupting your core business?',
    },
    get_lean: {
        title: 'THE LEAN MACHINE',
        severity: 'yellow',
        diagnosis: 'You are choosing SURVIVAL MODE. This is painful but survivable. You\'re racing to the bottom—but owning that race.',
        actions: [
            'Identify your top 10% who can work AI-native. Build around them.',
            'Cut 60-80% of headcount. Replace with AI-powered workflows.',
            'Price aggressively. Win on speed and cost, not reputation.',
            'Half-lean is just dying slowly. Execute ruthlessly.',
        ],
        cta: 'Need help designing your AI-native core team structure?',
    },
    move_up: {
        title: 'THE JUDGMENT SELLER',
        severity: 'yellow',
        diagnosis: 'You are choosing DIFFERENTIATION. You\'ll compete on judgment, not production. Your value shifts from "we make things" to "we ensure things are right."',
        actions: [
            'Restructure pricing from deliverable-based to outcome-based.',
            'Stop hiring junior producers—AI replaced them.',
            'Invest in tools that amplify senior judgment work.',
            'Build reputation around quality assurance, not volume.',
        ],
        cta: 'Ready to reposition your firm as a judgment authority?',
    },
    build_moats: {
        title: 'THE MOAT BUILDER',
        severity: 'yellow',
        diagnosis: 'You have speed but no defensibility. Pure cognitive production is a DEPRECIATING ASSET. Every AI-native startup makes the same claim you do.',
        actions: [
            'Embed in client workflows—create switching costs.',
            'Own compliance, audit, human-in-loop review layers.',
            'Build accountability wrappers around AI outputs.',
            'Create workflow orchestration that makes you sticky.',
        ],
        cta: 'Want to build defensibility before the commodity trap catches you?',
    },
    invest_talent: {
        title: 'THE PROTECTED GIANT',
        severity: 'green',
        diagnosis: 'You have distribution MOATS. Embedded relationships, platform status, brand—these are NOT eroded by AI. Your risk is INTERNAL, not external.',
        actions: [
            'Give your teams AI-native tools—don\'t let startups outpace you.',
            'Enable internal innovation at startup speed.',
            'Convince top talent they have a future here.',
            'Move faster than you\'re comfortable with.',
        ],
        cta: 'Need help preventing talent drain and internal stagnation?',
    },
    death_trap: {
        title: '⚠️ THE DEATH TRAP',
        severity: 'red',
        diagnosis: 'You are STUCK IN THE MIDDLE with no viable path. You can\'t get lean. You can\'t move up. You\'re selling commoditized work in a contestable market. This is the squeeze that kills mid-tier firms.',
        actions: [
            'HARD TRUTH: Investing in AI to be 20% more efficient is not enough.',
            'Consider: Exit, merger, or dramatic niche-down.',
            'Or: Revisit the diagnostic. Can you REALLY not get lean or pivot?',
            'The middle is not a strategy. Choose a direction or the market will choose for you.',
        ],
        cta: 'Need a strategic advisor to find your escape route?',
    },
};

const SurvivalBlueprint: React.FC<SurvivalBlueprintProps> = ({
    pathSummary,
    onClose,
    onReset,
}) => {
    const outcome = pathSummary.outcome || 'efficiency';
    const blueprint = OUTCOME_BLUEPRINTS[outcome] || OUTCOME_BLUEPRINTS.efficiency;

    const severityColors = {
        green: 'border-[#33ff00] bg-[#33ff00]/10',
        yellow: 'border-[#ffb000] bg-[#ffb000]/10',
        red: 'border-[#ff3333] bg-[#ff3333]/10',
    };

    const severityTextColors = {
        green: 'text-[#33ff00]',
        yellow: 'text-[#ffb000]',
        red: 'text-[#ff3333]',
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/95 overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className={`max-w-2xl w-full border-2 ${severityColors[blueprint.severity]} rounded-lg font-vt323`}>
                    {/* Header */}
                    <div className={`${severityTextColors[blueprint.severity]} bg-black px-6 py-4 border-b border-current flex justify-between items-center`}>
                        <div>
                            <div className="text-sm opacity-70">SURVIVAL BLUEPRINT</div>
                            <h1 className="text-3xl font-bold">{blueprint.title}</h1>
                        </div>
                        <button
                            onClick={onClose}
                            className="hover:bg-white/10 px-3 py-1 rounded text-2xl"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Path Breadcrumb */}
                    <div className="px-6 py-3 bg-black/50 border-b border-[#33ff00]/30">
                        <div className="text-[#33ff00]/60 text-sm mb-1">YOUR PATH:</div>
                        <div className="text-[#33ff00] text-lg">{pathSummary.pathDescription}</div>
                    </div>

                    {/* Diagnosis */}
                    <div className="px-6 py-4 border-b border-[#33ff00]/30">
                        <h2 className={`text-xl ${severityTextColors[blueprint.severity]} mb-2`}>
                            {'>'} DIAGNOSIS
                        </h2>
                        <p className="text-white/90 text-xl leading-relaxed">
                            {blueprint.diagnosis}
                        </p>
                    </div>

                    {/* Action Plan */}
                    <div className="px-6 py-4 border-b border-[#33ff00]/30">
                        <h2 className={`text-xl ${severityTextColors[blueprint.severity]} mb-3`}>
                            {'>'} YOUR 3-STEP ACTION PLAN
                        </h2>
                        <ol className="space-y-3">
                            {blueprint.actions.map((action, idx) => (
                                <li key={idx} className="flex gap-3 text-white/80 text-lg">
                                    <span className={`${severityTextColors[blueprint.severity]} font-bold`}>
                                        {idx + 1}.
                                    </span>
                                    <span>{action}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* CTA */}
                    <div className="px-6 py-6 bg-black/30">
                        <p className="text-[#33ff00] text-xl mb-4">{blueprint.cta}</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="#contact"
                                className={`flex-1 text-center px-6 py-3 ${severityTextColors[blueprint.severity]} border-2 border-current rounded-lg hover:bg-white/10 transition-all text-lg font-bold`}
                            >
                                📞 Book a Genetic Audit (15 min)
                            </a>
                            <button
                                onClick={onReset}
                                className="px-6 py-3 text-[#33ff00]/60 border border-[#33ff00]/30 rounded-lg hover:bg-white/5 transition-all text-lg"
                            >
                                🔄 Run New Diagnostic
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3 text-center text-[#33ff00]/40 text-sm border-t border-[#33ff00]/20">
                        GENETIC BUSINESS ARCHITECTURETM · ROBCO INDUSTRIES · 2026
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurvivalBlueprint;
