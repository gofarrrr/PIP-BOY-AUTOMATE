// Main Interview Mode container component

import React, { useState, useCallback, useEffect, useRef } from 'react';
import type {
    InterviewState,
    InterviewPhase,
    ExtractedSignal,
    TranscriptEntry,
    InterviewSummary,
    GraphNodeId,
    CognitiveMotif,
    KeyFactor
} from '../types/interview';
import { useAudioCapture } from '../hooks/useAudioCapture';
import { useGeminiLive } from '../hooks/useGeminiLive';
import { isGeminiConfigured, NODE_LABELS } from '../services/geminiConfig';
import AudioVisualizer from './AudioVisualizer';
import InterviewTranscript from './InterviewTranscript';
import InterviewSummaryDisplay from './InterviewSummary';

interface InterviewModeProps {
    onClose: () => void;
    onRevealNodes: (nodes: GraphNodeId[]) => void;
}

const InterviewMode: React.FC<InterviewModeProps> = ({ onClose, onRevealNodes }) => {
    // Interview state
    const [state, setState] = useState<InterviewState>({
        phase: 'idle',
        signals: [],
        motifs: [],
        transcript: [],
        revealedNodes: [],
        currentPath: [],
    });

    const [isTyping, setIsTyping] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [summary, setSummary] = useState<InterviewSummary | null>(null);

    const transcriptIdRef = useRef(0);

    // Generate unique transcript ID
    const generateId = () => {
        transcriptIdRef.current += 1;
        return `transcript-${transcriptIdRef.current}`;
    };

    // Add entry to transcript
    const addTranscriptEntry = useCallback((speaker: 'user' | 'ai', text: string, signals?: ExtractedSignal[]) => {
        const entry: TranscriptEntry = {
            id: generateId(),
            speaker,
            text,
            timestamp: Date.now(),
            signals,
        };
        setState(prev => ({
            ...prev,
            transcript: [...prev.transcript, entry],
        }));
    }, []);

    // Handle signal extraction
    const handleSignalExtracted = useCallback((signal: ExtractedSignal) => {
        console.log('Signal extracted:', signal);

        setState(prev => {
            const newSignals = [...prev.signals, signal];
            const newRevealedNodes = prev.revealedNodes.includes(signal.nodeId)
                ? prev.revealedNodes
                : [...prev.revealedNodes, signal.nodeId];

            // Update path based on signal
            const newPath = [...prev.currentPath];
            if (!newPath.includes(signal.nodeId)) {
                newPath.push(signal.nodeId);
            }

            // Check if we should extract a cognitive motif
            const newMotifs = [...prev.motifs];
            if (signal.cognitiveMotif) {
                const existingMotif = newMotifs.find(m => m.pattern === signal.cognitiveMotif);
                if (existingMotif) {
                    existingMotif.frequency += 1;
                    existingMotif.examples.push(signal.reasoning);
                } else {
                    newMotifs.push({
                        id: `motif-${newMotifs.length}`,
                        pattern: signal.cognitiveMotif,
                        examples: [signal.reasoning],
                        frequency: 1,
                    });
                }
            }

            return {
                ...prev,
                signals: newSignals,
                revealedNodes: newRevealedNodes,
                currentPath: newPath,
                motifs: newMotifs,
            };
        });

        // Notify parent to update graph
        onRevealNodes([signal.nodeId]);
    }, [onRevealNodes]);

    // Gemini callbacks
    const geminiCallbacks = {
        onTranscript: (text: string, isFinal: boolean) => {
            if (isFinal) {
                addTranscriptEntry('ai', text);
                setIsTyping(false);
            }
        },
        onAudioResponse: (audioData: ArrayBuffer) => {
            // TODO: Play audio response
            console.log('Audio response received:', audioData.byteLength);
        },
        onSignalExtracted: handleSignalExtracted,
        onError: (error: Error) => {
            console.error('Gemini error:', error);
            addTranscriptEntry('ai', `Error: ${error.message}`);
        },
        onSessionEnd: () => {
            console.log('Session ended');
        },
    };

    // Initialize hooks
    const audioCapture = useAudioCapture({
        onAudioLevel: (level) => {
            // Audio level is handled by the hook state
        },
    });

    const gemini = useGeminiLive(geminiCallbacks);

    // Start interview
    const handleStart = useCallback(async () => {
        if (!isGeminiConfigured()) {
            addTranscriptEntry('ai', 'Error: Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env.local file.');
            return;
        }

        setState(prev => ({ ...prev, phase: 'intro', startTime: Date.now() }));

        // Start audio capture
        const audioStarted = await audioCapture.startRecording();
        if (!audioStarted) {
            addTranscriptEntry('ai', 'Error: Could not access microphone. Please grant permission and try again.');
            return;
        }

        // Start Gemini session
        setIsTyping(true);
        const sessionStarted = await gemini.startSession();
        if (!sessionStarted) {
            audioCapture.stopRecording();
            return;
        }

        setState(prev => ({ ...prev, phase: 'discovery' }));
    }, [audioCapture, gemini, addTranscriptEntry]);

    // Send user message
    const handleSendMessage = useCallback(async () => {
        if (!userInput.trim()) return;

        const message = userInput.trim();
        setUserInput('');
        addTranscriptEntry('user', message);

        setIsTyping(true);
        await gemini.sendMessage(message);
    }, [userInput, gemini, addTranscriptEntry]);

    // Handle keyboard input
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // End interview and generate summary
    const handleEndInterview = useCallback(() => {
        audioCapture.stopRecording();
        gemini.endSession();

        // Determine verdict based on signals
        const determineVerdict = (): 'automate' | 'augment' | 'diy' => {
            const signalMap = new Map<string, ExtractedSignal>(state.signals.map(s => [s.nodeId, s]));

            // Simple logic based on signals
            const often = signalMap.get('often');
            const complex = signalMap.get('complex');
            const risk = signalMap.get('risk');
            const judgment = signalMap.get('judgment');

            if (!often || often.answer === 'no') return 'diy';
            if (complex?.answer === 'no' && risk?.answer === 'no' && judgment?.answer === 'no') return 'automate';
            return 'augment';
        };

        // Build key factors
        const keyFactors: KeyFactor[] = state.signals.map(signal => ({
            nodeId: signal.nodeId,
            label: NODE_LABELS[signal.nodeId] || signal.nodeId,
            answer: signal.answer,
            impact: signal.answer === 'yes' && ['risk', 'complex', 'judgment'].includes(signal.nodeId)
                ? 'negative'
                : signal.answer === 'yes'
                    ? 'positive'
                    : 'neutral',
            reasoning: signal.reasoning,
        }));

        const interviewSummary: InterviewSummary = {
            verdict: determineVerdict(),
            path: state.currentPath,
            keyFactors,
            motifs: state.motifs,
            duration: state.startTime ? (Date.now() - state.startTime) / 1000 : 0,
            transcript: state.transcript,
        };

        setSummary(interviewSummary);
        setState(prev => ({ ...prev, phase: 'complete', endTime: Date.now() }));
    }, [audioCapture, gemini, state]);

    // Render based on phase
    if (state.phase === 'complete' && summary) {
        return (
            <div className="fixed inset-0 bg-black z-50 overflow-auto">
                <InterviewSummaryDisplay
                    summary={summary}
                    onViewTrace={() => console.log('View trace')}
                    onExport={() => console.log('Export')}
                    onStartNew={() => {
                        setSummary(null);
                        setState({
                            phase: 'idle',
                            signals: [],
                            motifs: [],
                            transcript: [],
                            revealedNodes: [],
                            currentPath: [],
                        });
                    }}
                    onClose={onClose}
                />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col font-vt323">
            {/* Header */}
            <div className="p-4 border-b border-[#33ff00]/30 flex items-center justify-between">
                <div className="text-[#33ff00] text-xl">
                    🎙️ PIP-BOY INTERVIEW MODE
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-[#33ff00]/50 text-sm">
                        Phase: {state.phase.toUpperCase()}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#33ff00] hover:text-white transition-colors px-2"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
                {state.phase === 'idle' ? (
                    // Start screen
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="text-[#33ff00] text-2xl mb-4">
                            COGNITIVE INTERVIEW
                        </div>
                        <div className="text-[#33ff00]/70 text-center max-w-md mb-8">
                            I'll ask you about a task you're considering for automation.
                            Speak naturally—I'm listening for how you think, not just what you say.
                        </div>

                        {!isGeminiConfigured() && (
                            <div className="text-yellow-400 text-center mb-4 p-4 border border-yellow-400/30 rounded">
                                ⚠️ Gemini API key not configured.<br />
                                Add VITE_GEMINI_API_KEY to your .env.local file.
                            </div>
                        )}

                        <button
                            onClick={handleStart}
                            disabled={!isGeminiConfigured()}
                            className="px-8 py-4 text-xl bg-[#33ff00] text-black rounded-lg hover:bg-[#33ff00]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            START INTERVIEW
                        </button>
                    </div>
                ) : (
                    // Active interview
                    <>
                        {/* Transcript area */}
                        <div className="flex-1 border border-[#33ff00]/30 rounded-lg mb-4 overflow-hidden bg-black/50">
                            <InterviewTranscript
                                entries={state.transcript}
                                isTyping={isTyping}
                            />
                        </div>

                        {/* Audio visualizer */}
                        <div className="mb-4">
                            <AudioVisualizer
                                audioLevel={audioCapture.audioLevel}
                                isActive={audioCapture.isRecording && !audioCapture.isPaused}
                            />
                        </div>

                        {/* Input area */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your response or speak..."
                                className="flex-1 bg-black border border-[#33ff00]/50 rounded px-4 py-2 text-[#33ff00] placeholder-[#33ff00]/30 focus:outline-none focus:border-[#33ff00]"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!userInput.trim() || isTyping}
                                className="px-4 py-2 bg-[#33ff00] text-black rounded hover:bg-[#33ff00]/80 disabled:opacity-50 transition-colors"
                            >
                                SEND
                            </button>
                            <button
                                onClick={handleEndInterview}
                                className="px-4 py-2 border border-[#33ff00] text-[#33ff00] rounded hover:bg-[#33ff00]/10 transition-colors"
                            >
                                END
                            </button>
                        </div>

                        {/* Revealed nodes indicator */}
                        {state.revealedNodes.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="text-[#33ff00]/50">Detected:</span>
                                {state.revealedNodes.map(nodeId => (
                                    <span
                                        key={nodeId}
                                        className="px-2 py-0.5 bg-[#33ff00]/10 border border-[#33ff00]/30 rounded text-[#33ff00] text-sm"
                                    >
                                        {NODE_LABELS[nodeId] || nodeId}
                                    </span>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default InterviewMode;
