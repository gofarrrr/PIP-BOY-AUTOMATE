// Gemini Live API integration hook
// Note: This uses the Gemini API with audio input/output capabilities

import { useState, useCallback, useRef, useEffect } from 'react';
import type {
    ExtractedSignal,
    TranscriptEntry,
    GeminiLiveCallbacks,
    GraphNodeId
} from '../types/interview';
import {
    GEMINI_API_KEY,
    GEMINI_MODEL,
    INTERVIEWER_SYSTEM_PROMPT,
    GEMINI_TOOLS,
    isGeminiConfigured
} from '../services/geminiConfig';

type SessionState = 'idle' | 'connecting' | 'connected' | 'error' | 'ended';

interface UseGeminiLiveReturn {
    sessionState: SessionState;
    error: Error | null;
    isConfigured: boolean;
    startSession: () => Promise<boolean>;
    endSession: () => void;
    sendMessage: (text: string) => Promise<void>;
    sendAudio: (audioData: Float32Array) => void;
}

// For MVP, we'll use the standard Gemini API with generateContent
// Real-time streaming would require WebSocket connection or Live API
export function useGeminiLive(callbacks: GeminiLiveCallbacks): UseGeminiLiveReturn {
    const [sessionState, setSessionState] = useState<SessionState>('idle');
    const [error, setError] = useState<Error | null>(null);

    const conversationHistoryRef = useRef<Array<{ role: string; parts: Array<{ text: string }> }>>([]);
    const audioBufferRef = useRef<Float32Array[]>([]);
    const processingRef = useRef(false);

    const isConfigured = isGeminiConfigured();

    // Process buffered audio and send to Gemini
    const processAudioBuffer = useCallback(async () => {
        if (processingRef.current || audioBufferRef.current.length === 0) return;

        processingRef.current = true;

        try {
            // Combine audio chunks
            const totalLength = audioBufferRef.current.reduce((sum, chunk) => sum + chunk.length, 0);
            const combined = new Float32Array(totalLength);
            let offset = 0;
            for (const chunk of audioBufferRef.current) {
                combined.set(chunk, offset);
                offset += chunk.length;
            }
            audioBufferRef.current = [];

            // For MVP, we'll simulate transcription with a placeholder
            // In production, this would use Gemini's audio input capability
            console.log('Audio buffer processed, length:', combined.length);

        } catch (err) {
            console.error('Error processing audio:', err);
        } finally {
            processingRef.current = false;
        }
    }, []);

    const startSession = useCallback(async (): Promise<boolean> => {
        if (!isConfigured) {
            setError(new Error('Gemini API key not configured'));
            setSessionState('error');
            return false;
        }

        try {
            setSessionState('connecting');

            // Initialize conversation with system prompt
            conversationHistoryRef.current = [];

            // Send initial greeting
            const response = await sendToGemini(
                "The user has just started the interview. Introduce yourself briefly and ask them to describe the task they're considering for automation.",
                true
            );

            if (response) {
                setSessionState('connected');
                callbacks.onTranscript(response, true);
                return true;
            }

            throw new Error('Failed to start session');
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to start session');
            setError(error);
            setSessionState('error');
            callbacks.onError(error);
            return false;
        }
    }, [isConfigured, callbacks]);

    const sendToGemini = async (userMessage: string, isSystemMessage = false): Promise<string | null> => {
        if (!GEMINI_API_KEY) return null;

        try {
            // Add message to history
            if (!isSystemMessage) {
                conversationHistoryRef.current.push({
                    role: 'user',
                    parts: [{ text: userMessage }]
                });
            }

            const requestBody = {
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: INTERVIEWER_SYSTEM_PROMPT }]
                    },
                    ...conversationHistoryRef.current,
                    ...(isSystemMessage ? [{ role: 'user', parts: [{ text: userMessage }] }] : [])
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 500,
                },
                tools: GEMINI_TOOLS
            };

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                }
            );

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();

            // Handle function calls (signal extraction)
            if (data.candidates?.[0]?.content?.parts) {
                for (const part of data.candidates[0].content.parts) {
                    if (part.functionCall?.name === 'extract_signal') {
                        const args = part.functionCall.arguments;
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

                    if (part.text) {
                        // Add response to history
                        conversationHistoryRef.current.push({
                            role: 'model',
                            parts: [{ text: part.text }]
                        });
                        return part.text;
                    }
                }
            }

            // Extract text response
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
                conversationHistoryRef.current.push({
                    role: 'model',
                    parts: [{ text }]
                });
                return text;
            }

            return null;
        } catch (err) {
            console.error('Gemini API error:', err);
            throw err;
        }
    };

    const sendMessage = useCallback(async (text: string): Promise<void> => {
        if (sessionState !== 'connected') {
            console.warn('Session not connected');
            return;
        }

        try {
            const response = await sendToGemini(text);
            if (response) {
                callbacks.onTranscript(response, true);
            }
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to send message');
            setError(error);
            callbacks.onError(error);
        }
    }, [sessionState, callbacks]);

    const sendAudio = useCallback((audioData: Float32Array): void => {
        // Buffer audio data
        audioBufferRef.current.push(audioData);

        // Process buffer periodically (every ~1 second of audio at 16kHz)
        if (audioBufferRef.current.length >= 4) {
            processAudioBuffer();
        }
    }, [processAudioBuffer]);

    const endSession = useCallback((): void => {
        audioBufferRef.current = [];
        conversationHistoryRef.current = [];
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
    };
}
