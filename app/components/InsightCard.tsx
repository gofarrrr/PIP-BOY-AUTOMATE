import React from 'react';
import { TacticalInsight } from '../constants-strategy';

interface InsightCardProps {
    insight: TacticalInsight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
    return (
        <div className="mt-8 border border-[#ff3333]/30 bg-[#1a0505] rounded-lg p-6 relative overflow-hidden group hover:border-[#ff3333]/60 transition-all">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,51,51,0.5)]">
                            {insight.icon}
                        </span>
                        <div>
                            <div className="text-[#ff3333] text-xs font-vt323 tracking-widest uppercase mb-1">
                                TACTICAL INSIGHT INJECTION
                            </div>
                            <h3 className="text-xl font-bold text-white font-vt323 tracking-wide">
                                {insight.title}
                            </h3>
                        </div>
                    </div>
                    <div className="text-[#ff3333]/60 text-xs font-vt323 border border-[#ff3333]/20 px-2 py-1 rounded bg-[#0a0000]">
                        {insight.trigger}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-[#0a0000]/50 p-4 rounded border-l-2 border-[#ff3333]/50">
                        <h4 className="text-[#ff3333] text-sm font-bold mb-1 font-vt323 uppercase">The Concept</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {insight.concept}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-red-900/10 rounded border border-red-500/10">
                            <h4 className="text-red-400 text-xs font-bold mb-1 font-vt323 uppercase">⚠️ The Trap</h4>
                            <p className="text-gray-400 text-xs leading-relaxed">
                                {insight.warning}
                            </p>
                        </div>
                        <div className="p-3 bg-green-900/10 rounded border border-green-500/10">
                            <h4 className="text-green-400 text-xs font-bold mb-1 font-vt323 uppercase">⚡ The Action</h4>
                            <p className="text-gray-400 text-xs leading-relaxed">
                                {insight.advice}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#ff3333]/10 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default InsightCard;
