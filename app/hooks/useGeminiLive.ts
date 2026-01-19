// Gemini Live API integration hook with real-time audio
// Uses WebSocket-based Live API for bidirectional streaming

import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, EndSensitivity } from '@google/genai';
import type {
    ExtractedSignal,
    GeminiLiveCallbacks,
    GraphNodeId
} from '../types/interview';
import {
    GEMINI_API_KEY,
    GEMINI_MODEL,
    INTERVIEWER_SYSTEM_PROMPT,
    isGeminiConfigured
} from '../services/geminiConfig';
import { floatTo16BitPCM, arrayBufferToBase64, AudioPlayer } from '../utils/audioUtils';

type SessionState = 'idle' | 'connecting' | 'connected' | 'error' | 'ended';

// Model for Live API
const LIVE_MODEL = `models/${GEMINI_MODEL}`;

interface UseGeminiLiveReturn {
    sessionState: SessionState;
    error: Error | null;
    isConfigured: boolean;
    startSession: () => Promise<boolean>;
    endSession: () => void;
    sendMessage: (text: string) => Promise<void>;
    sendAudio: (audioData: Float32Array) => void;
    sendAudioStreamEnd: () => void;
}

export function useGeminiLive(callbacks: GeminiLiveCallbacks): UseGeminiLiveReturn {
    const [sessionState, setSessionState] = useState<SessionState>('idle');
    const [error, setError] = useState<Error | null>(null);

    const sessionRef = useRef<any>(null);
    const sessionStateRef = useRef<SessionState>('idle'); // Ref to avoid stale closures
    const audioPlayerRef = useRef<AudioPlayer | null>(null);
    const transcriptBufferRef = useRef<string>('');

    // Keep ref in sync with state
    useEffect(() => {
        sessionStateRef.current = sessionState;
    }, [sessionState]);

    const isConfigured = isGeminiConfigured();

    // Initialize audio player
    useEffect(() => {
        audioPlayerRef.current = new AudioPlayer(24000);
        return () => {
            audioPlayerRef.current?.stop();
        };
    }, []);

    // Handle incoming messages from Gemini
    const handleMessage = useCallback((message: any) => {
        console.log('📨 Received message:', JSON.stringify(message, null, 2));

        try {
            // Handle interruption
            if (message.serverContent?.interrupted) {
                console.log('⏹️ Interrupted - user started speaking');
                audioPlayerRef.current?.reset();
                return;
            }

            // Handle input transcription (what the user said)
            if (message.serverContent?.inputTranscription?.text) {
                const userText = message.serverContent.inputTranscription.text;
                console.log('👤 User said:', userText);
                callbacks.onTranscript(userText, true, 'user');
            }

            // Handle output transcription (what the AI said - text version of audio)
            if (message.serverContent?.outputTranscription?.text) {
                const aiText = message.serverContent.outputTranscription.text;
                console.log('🤖 AI said:', aiText);
                callbacks.onTranscript(aiText, true, 'ai');
            }

            // Handle model turn (response with audio)
            if (message.serverContent?.modelTurn?.parts) {
                console.log('🗣️ Model turn with', message.serverContent.modelTurn.parts.length, 'parts');
                for (const part of message.serverContent.modelTurn.parts) {
                    // Handle audio response
                    if (part.inlineData?.data) {
                        console.log('🔊 Audio data received, length:', part.inlineData.data.length);
                        audioPlayerRef.current?.play(part.inlineData.data);
                    }

                    // Handle text in response (fallback if transcription not working)
                    if (part.text) {
                        console.log('📝 Text in modelTurn:', part.text);
                        transcriptBufferRef.current += part.text;
                    }
                }
            }

            // Handle turn complete
            if (message.serverContent?.turnComplete) {
                console.log('✅ Turn complete');
                if (transcriptBufferRef.current) {
                    callbacks.onTranscript(transcriptBufferRef.current, true, 'ai');
                    transcriptBufferRef.current = '';
                }
            }

            // Handle function calls (signal extraction)
            if (message.toolCall) {
                console.log('🔧 Tool call:', message.toolCall);
                for (const fc of message.toolCall.functionCalls || []) {
                    if (fc.name === 'extract_signal') {
                        const args = fc.args;
                        const signal: ExtractedSignal = {
                            nodeId: args.nodeId as GraphNodeId,
                            answer: args.answer,
                            confidence: args.confidence || 0.7,
                            reasoning: args.reasoning || '',
                            cognitiveMotif: args.cognitiveMotif,
                            timestamp: Date.now()
                        };
                        callbacks.onSignalExtracted(signal);
                    }
                }
            }
        } catch (err) {
            console.error('Error handling message:', err);
        }
    }, [callbacks]);

    const startSession = useCallback(async (): Promise<boolean> => {
        if (!isConfigured || !GEMINI_API_KEY) {
            setError(new Error('Gemini API key not configured'));
            setSessionState('error');
            return false;
        }

        try {
            setSessionState('connecting');
            console.log('🚀 Starting Gemini Live session...');
            console.log('📌 Model:', LIVE_MODEL);
            console.log('🔑 API Key present:', !!GEMINI_API_KEY);

            const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
            console.log('✅ GoogleGenAI instance created');

            // Config with VAD tuning to prevent interruptions during natural pauses
            const config = {
                responseModalities: [Modality.AUDIO],
                systemInstruction: INTERVIEWER_SYSTEM_PROMPT,
                // Configure VAD to be less sensitive to pauses between words
                realtimeInputConfig: {
                    automaticActivityDetection: {
                        // LOW = allow longer pauses before triggering end of speech
                        endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
                        // You can also adjust startOfSpeechSensitivity if needed
                        // startOfSpeechSensitivity: 'START_SENSITIVITY_LOW',
                    }
                }
            };
            console.log('📋 Config prepared');

            console.log('🔗 Attempting to connect...');
            const session = await ai.live.connect({
                model: LIVE_MODEL,
                config,
                callbacks: {
                    onopen: () => {
                        console.log('🟢 WebSocket CONNECTED!');
                        setSessionState('connected');
                    },
                    onmessage: handleMessage,
                    onerror: (e: any) => {
                        console.error('🔴 WebSocket ERROR:', e);
                        setError(new Error(e.message || 'WebSocket error'));
                        callbacks.onError(new Error(e.message || 'Connection error'));
                    },
                    onclose: (e: any) => {
                        console.log('🟡 WebSocket CLOSED:', e?.reason || 'No reason');
                        setSessionState('ended');
                        callbacks.onSessionEnd();
                    },
                },
            });

            console.log('✅ Session object received');
            sessionRef.current = session;
            // No initial text prompt - just stream audio directly
            console.log('🎤 Ready! Speak to start the conversation...');

            return true;
        } catch (err) {
            console.error('❌ Failed to start session:', err);
            const error = err instanceof Error ? err : new Error('Failed to start session');
            setError(error);
            setSessionState('error');
            callbacks.onError(error);
            return false;
        }
    }, [isConfigured, handleMessage, callbacks]);

    const audioSentCountRef = useRef<number>(0);

    const sendAudio = useCallback((audioData: Float32Array): void => {
        // Use ref to avoid stale closure issue
        if (!sessionRef.current || sessionStateRef.current !== 'connected') return;

        try {
            // Convert Float32 to 16-bit PCM and base64 encode
            const pcmBuffer = floatTo16BitPCM(audioData);
            const base64Data = arrayBufferToBase64(pcmBuffer);

            // Log first few sends to verify data
            audioSentCountRef.current++;
            if (audioSentCountRef.current <= 3) {
                console.log(`🎵 Audio chunk #${audioSentCountRef.current}:`, {
                    inputSamples: audioData.length,
                    pcmBytes: pcmBuffer.byteLength,
                    base64Length: base64Data.length,
                    samplePreview: base64Data.substring(0, 50) + '...'
                });
            }

            // Send real-time audio input using SDK's 'audio' property
            sessionRef.current.sendRealtimeInput({
                audio: {
                    data: base64Data,
                    mimeType: 'audio/pcm;rate=16000'
                }
            });
        } catch (err) {
            console.error('Error sending audio:', err);
        }
    }, []); // No dependencies needed - uses refs

    // Signal that audio stream has ended (user stopped speaking for >1 second)
    const sendAudioStreamEnd = useCallback((): void => {
        if (!sessionRef.current || sessionStateRef.current !== 'connected') return;

        try {
            console.log('🔇 Sending audioStreamEnd signal');
            sessionRef.current.sendRealtimeInput({ audioStreamEnd: true });
        } catch (err) {
            console.error('Error sending audioStreamEnd:', err);
        }
    }, []); // No dependencies needed - uses refs

    const sendMessage = useCallback(async (text: string): Promise<void> => {
        if (!sessionRef.current || sessionState !== 'connected') {
            console.warn('Session not connected');
            return;
        }

        try {
            // Send text message
            sessionRef.current.sendClientContent({ turns: text, turnComplete: true });
        } catch (err) {
            console.error('Error sending message:', err);
            const error = err instanceof Error ? err : new Error('Failed to send message');
            setError(error);
            callbacks.onError(error);
        }
    }, [sessionState, callbacks]);

    const endSession = useCallback((): void => {
        if (sessionRef.current) {
            try {
                sessionRef.current.close();
            } catch (err) {
                console.error('Error closing session:', err);
            }
            sessionRef.current = null;
        }

        audioPlayerRef.current?.stop();
        transcriptBufferRef.current = '';
        setSessionState('ended');
        callbacks.onSessionEnd();
    }, [callbacks]);

    return {
        sessionState,
        error,
        isConfigured,
        startSession,
        endSession,
        sendMessage,
        sendAudio,
        sendAudioStreamEnd,
    };
}
