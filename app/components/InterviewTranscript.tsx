// Interview transcript display component

import React, { useRef, useEffect } from 'react';
import type { TranscriptEntry, ExtractedSignal } from '../types/interview';
import { NODE_LABELS } from '../services/geminiConfig';

interface InterviewTranscriptProps {
    entries: TranscriptEntry[];
    isTyping?: boolean;
}

const InterviewTranscript: React.FC<InterviewTranscriptProps> = ({
    entries,
    isTyping = false
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new entries
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [entries]);

    const renderSignalBadge = (signal: ExtractedSignal) => {
        const label = NODE_LABELS[signal.nodeId] || signal.nodeId;
        const bgColor = signal.answer === 'yes'
            ? 'bg-green-900/50'
            : signal.answer === 'no'
                ? 'bg-red-900/50'
                : 'bg-yellow-900/50';

        return (
            <span
                key={`${signal.nodeId}-${signal.timestamp}`}
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${bgColor} text-[#33ff00] border border-[#33ff00]/30 mr-1 mt-1`}
            >
                {label}: {signal.answer.toUpperCase()}
                {signal.confidence < 0.8 && ' ?'}
            </span>
        );
    };

    return (
        <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 font-vt323"
            style={{ maxHeight: '300px' }}
        >
            {entries.length === 0 && (
                <div className="text-[#33ff00]/40 text-center py-8">
                    {'{>'} Waiting for conversation to begin...
                </div>
            )}

            {entries.map((entry) => (
                <div key={entry.id} className="space-y-1">
                    {/* Speaker label */}
                    <div className={`text-sm ${entry.speaker === 'ai' ? 'text-[#33ff00]' : 'text-[#33ff00]/70'}`}>
                        {entry.speaker === 'ai' ? '>> PIP-BOY:' : '>> YOU:'}
                    </div>

                    {/* Message text */}
                    <div
                        className={`pl-4 ${entry.speaker === 'ai' ? 'text-[#33ff00]' : 'text-white/80'}`}
                    >
                        {entry.text}
                    </div>

                    {/* Signal badges */}
                    {entry.signals && entry.signals.length > 0 && (
                        <div className="pl-4 flex flex-wrap">
                            {entry.signals.map(renderSignalBadge)}
                        </div>
                    )}
                </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
                <div className="text-[#33ff00]/50 animate-pulse">
                    {'{>'} Processing...
                </div>
            )}
        </div>
    );
};

export default InterviewTranscript;
