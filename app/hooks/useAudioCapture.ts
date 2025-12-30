// Audio capture hook for browser microphone access

import { useState, useCallback, useRef, useEffect } from 'react';
import type { AudioCaptureState } from '../types/interview';

interface UseAudioCaptureOptions {
    onAudioData?: (data: Float32Array) => void;
    onAudioLevel?: (level: number) => void;
    sampleRate?: number;
}

interface UseAudioCaptureReturn extends AudioCaptureState {
    startRecording: () => Promise<boolean>;
    stopRecording: () => void;
    pauseRecording: () => void;
    resumeRecording: () => void;
    getMediaStream: () => MediaStream | null;
}

export function useAudioCapture(options: UseAudioCaptureOptions = {}): UseAudioCaptureReturn {
    const { onAudioData, onAudioLevel, sampleRate = 16000 } = options;

    const [state, setState] = useState<AudioCaptureState>({
        isRecording: false,
        isPaused: false,
        hasPermission: false,
        permissionDenied: false,
        audioLevel: 0,
    });

    const mediaStreamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Cleanup function
    const cleanup = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        if (processorRef.current) {
            processorRef.current.disconnect();
            processorRef.current = null;
        }

        if (analyserRef.current) {
            analyserRef.current.disconnect();
            analyserRef.current = null;
        }

        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }

        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    // Update audio level visualization
    const updateAudioLevel = useCallback(() => {
        if (!analyserRef.current || state.isPaused) {
            animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
            return;
        }

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average level
        const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        const normalizedLevel = Math.min(average / 128, 1); // Normalize to 0-1

        setState(prev => ({ ...prev, audioLevel: normalizedLevel }));
        onAudioLevel?.(normalizedLevel);

        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
    }, [state.isPaused, onAudioLevel]);

    const startRecording = useCallback(async (): Promise<boolean> => {
        try {
            // Request microphone permission
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate,
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                },
            });

            mediaStreamRef.current = stream;

            // Create audio context
            audioContextRef.current = new AudioContext({ sampleRate });
            const source = audioContextRef.current.createMediaStreamSource(stream);

            // Create analyser for visualization
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256;
            source.connect(analyserRef.current);

            // Create processor for audio data callback
            if (onAudioData) {
                // Using ScriptProcessorNode (deprecated but widely supported)
                // TODO: Migrate to AudioWorklet for better performance
                processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
                processorRef.current.onaudioprocess = (event) => {
                    if (!state.isPaused) {
                        const inputData = event.inputBuffer.getChannelData(0);
                        onAudioData(new Float32Array(inputData));
                    }
                };
                source.connect(processorRef.current);
                processorRef.current.connect(audioContextRef.current.destination);
            }

            setState({
                isRecording: true,
                isPaused: false,
                hasPermission: true,
                permissionDenied: false,
                audioLevel: 0,
            });

            // Start level monitoring
            animationFrameRef.current = requestAnimationFrame(updateAudioLevel);

            return true;
        } catch (error) {
            console.error('Failed to start recording:', error);

            const isDenied = error instanceof DOMException &&
                (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError');

            setState(prev => ({
                ...prev,
                isRecording: false,
                hasPermission: false,
                permissionDenied: isDenied,
            }));

            return false;
        }
    }, [sampleRate, onAudioData, updateAudioLevel]);

    const stopRecording = useCallback(() => {
        cleanup();
        setState({
            isRecording: false,
            isPaused: false,
            hasPermission: true, // Keep permission status
            permissionDenied: false,
            audioLevel: 0,
        });
    }, [cleanup]);

    const pauseRecording = useCallback(() => {
        setState(prev => ({ ...prev, isPaused: true }));
    }, []);

    const resumeRecording = useCallback(() => {
        setState(prev => ({ ...prev, isPaused: false }));
    }, []);

    const getMediaStream = useCallback(() => {
        return mediaStreamRef.current;
    }, []);

    return {
        ...state,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        getMediaStream,
    };
}
