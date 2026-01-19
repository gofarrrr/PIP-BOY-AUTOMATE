import React, { useEffect, useState } from 'react';
import { READINESS_NODES } from '../constants-readiness';
import { PathSummary } from '../hooks/useReadinessDiagnostic';

interface ReadinessReportProps {
    pathSummary: PathSummary;
    onClose: () => void;
    onReset: () => void;
}

const ReadinessReport: React.FC<ReadinessReportProps> = ({ pathSummary, onClose, onReset }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const outcomeNode = READINESS_NODES.find(n => n.id === pathSummary.outcome);
    if (!outcomeNode) return null;

    // The outcome description fields correspond to the sections of our report
    const diagnosis = outcomeNode.description.why;
    const evaluation = outcomeNode.description.evaluate;
    const prescription = outcomeNode.description.read; // Prescriptions are in the 'read' field for outcomes

    return (
        <div className={`fixed inset-0 z-[100] bg-black/95 flex flex-col font-vt323 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            {/* HUD Header */}
            <div className="bg-[#33ff00] text-black px-6 py-2 flex justify-between items-center shadow-[0_0_20px_rgba(51,255,0,0.4)]">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter">AI READINESS REPORT [V3.1]</h1>
                    <p className="text-xs font-bold leading-none">ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-sm font-bold">STATUS: {pathSummary.outcomeLabel?.toUpperCase()}</p>
                    <p className="text-xs">ID: {pathSummary.outcome?.toUpperCase()}</p>
                </div>
            </div>

            {/* Main Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* Header Section */}
                    <section className="border-b-2 border-[#33ff00]/30 pb-8 animate-in fade-in slide-in-from-top duration-700">
                        <h2 className="text-[#33ff00] text-5xl md:text-7xl font-bold mb-4 tracking-tighter uppercase">
                            {pathSummary.outcomeLabel}
                        </h2>
                        <div className="flex flex-wrap gap-4 text-xl">
                            <span className="bg-[#33ff00]/10 text-[#33ff00] px-3 py-1 border border-[#33ff00]/30">
                                ARCHETYPE_IDENTIFIED
                            </span>
                            <span className="bg-[#33ff00]/10 text-[#33ff00] px-3 py-1 border border-[#33ff00]/30">
                                PRESCRIPTION_READY
                            </span>
                        </div>
                    </section>

                    {/* Diagnosis & Analysis */}
                    <div className="grid md:grid-cols-2 gap-12">
                        <section className="space-y-4 animate-in fade-in slide-in-from-left duration-1000 delay-300">
                            <h3 className="text-[#33ff00] text-2xl font-bold border-b border-[#33ff00]/50 pb-1">
                                [ ANALYSIS ]
                            </h3>
                            <p className="text-[#33ff00]/90 text-2xl leading-tight italic">
                                "{diagnosis}"
                            </p>
                        </section>

                        <section className="space-y-4 animate-in fade-in slide-in-from-right duration-1000 delay-500">
                            <h3 className="text-[#33ff00] text-2xl font-bold border-b border-[#33ff00]/50 pb-1">
                                [ COMMON SYMPTOMS ]
                            </h3>
                            <p className="text-[#33ff00]/80 text-xl leading-snug">
                                {evaluation}
                            </p>
                        </section>
                    </div>

                    {/* Progression Path */}
                    <section className="bg-[#33ff00]/5 border-2 border-[#33ff00]/20 p-6 md:p-8 animate-in fade-in zoom-in duration-700 delay-700">
                        <h3 className="text-[#33ff00] text-xl font-bold mb-4">[ DIAGNOSTIC_PATH_SUMMARY ]</h3>
                        <div className="space-y-3">
                            {pathSummary.decisions.map((d, i) => (
                                <div key={i} className="flex items-start gap-4 border-l-2 border-[#33ff00]/30 pl-4 py-1">
                                    <span className="text-[#33ff00]/40 font-bold min-w-[20px]">{i + 1}.</span>
                                    <div>
                                        <span className="text-[#33ff00]/60 uppercase text-sm block tracking-widest">{d.label}</span>
                                        <span className="text-[#33ff00] text-xl font-bold">{d.choice.toUpperCase()}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-start gap-4 border-l-2 border-[#33ff00] pl-4 py-2 mt-2">
                                <span className="text-[#33ff00] animate-pulse">●</span>
                                <div>
                                    <span className="text-[#33ff00] uppercase text-sm font-bold block tracking-widest">FINAL_STATUS</span>
                                    <span className="text-[#33ff00] text-2xl font-bold">{pathSummary.outcomeLabel?.toUpperCase()}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PRESCRIPTION - The Action Plan */}
                    <section className="space-y-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-1000">
                        <div className="flex items-center gap-4">
                            <div className="h-0.5 flex-1 bg-[#33ff00]/30"></div>
                            <h3 className="text-[#33ff00] text-3xl font-bold px-4">THE PRESCRIPTION</h3>
                            <div className="h-0.5 flex-1 bg-[#33ff00]/30"></div>
                        </div>

                        <div className="bg-[#33ff00] text-black p-8 rounded-sm">
                            <p className="text-2xl md:text-3xl font-bold leading-tight uppercase mb-4">
                                IMMEDIATE CORRECTIVE MEASURES:
                            </p>
                            <p className="text-xl md:text-2xl font-bold leading-snug">
                                {prescription.replace('PRESCRIPTION: ', '')}
                            </p>
                        </div>
                    </section>

                    {/* Lead Gen CTA */}
                    <section className="text-center py-12 border-t-2 border-[#33ff00]/30 space-y-8">
                        <div>
                            <h3 className="text-[#33ff00] text-3xl font-bold mb-2 uppercase">Ready to Evolve?</h3>
                            <p className="text-[#33ff00]/70 text-xl max-w-2xl mx-auto">
                                Schedule a 1-on-1 Genetic Audit to formalize this prescription and identify technical implementation partners.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                            <a
                                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2e9Vl7T8uT8uT8uT8uT8uT8uT8uT8uT8uT8uT8uT8u" // Mock URL
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#33ff00] text-black px-10 py-5 text-2xl font-bold hover:bg-[#33ff00]/80 transition-all shadow-[0_0_20px_rgba(51,255,0,0.5)] uppercase flex items-center gap-4 group"
                            >
                                <span>BOOK GENETIC AUDIT</span>
                                <span className="group-hover:translate-x-2 transition-transform">{'>>'}</span>
                            </a>

                            <button
                                onClick={onReset}
                                className="text-[#33ff00]/60 hover:text-[#33ff00] text-xl border-b border-transparent hover:border-[#33ff00] transition-all"
                            >
                                [ RESTART DIAGNOSTIC ]
                            </button>
                        </div>
                    </section>
                </div>
            </div>

            {/* Persistence Bar */}
            <div className="bg-[#001d00] border-t border-[#33ff00]/30 p-4 font-vt323 flex justify-between items-center h-16 pointer-events-auto">
                <button
                    onClick={onClose}
                    className="text-[#33ff00] hover:bg-[#33ff00]/10 px-4 py-2 border border-[#33ff00]/30 flex items-center gap-2 group transition-all"
                >
                    <span>[ RETURN_TO_MAP ]</span>
                </button>
                <div className="text-[#33ff00]/40 text-xs text-right italic leading-tight">
                    COPYRIGHT 2024 ROBCO INDUSTRIES<br />
                    SECURE PIP-BOY DATA CHANNEL 08-R
                </div>
            </div>
        </div>
    );
};

export default ReadinessReport;
