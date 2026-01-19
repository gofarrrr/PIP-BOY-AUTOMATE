// Audio utilities for Gemini Live API

/**
 * Convert Float32Array audio data to 16-bit PCM
 */
export function floatTo16BitPCM(float32Array: Float32Array): ArrayBuffer {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);

    for (let i = 0; i < float32Array.length; i++) {
        // Clamp value between -1 and 1
        let val = Math.max(-1, Math.min(1, float32Array[i]));
        // Convert to 16-bit signed integer
        val = val < 0 ? val * 0x8000 : val * 0x7FFF;
        view.setInt16(i * 2, val, true); // little-endian
    }

    return buffer;
}

/**
 * Convert ArrayBuffer to base64 string
 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

/**
 * Convert base64 string to ArrayBuffer
 */
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

/**
 * Convert 16-bit PCM to Float32Array for Web Audio playback
 */
export function pcm16ToFloat32(pcmData: ArrayBuffer): Float32Array {
    const dataView = new DataView(pcmData);
    const float32 = new Float32Array(pcmData.byteLength / 2);

    for (let i = 0; i < float32.length; i++) {
        const int16 = dataView.getInt16(i * 2, true); // little-endian
        float32[i] = int16 / 0x8000; // Convert to -1 to 1 range
    }

    return float32;
}

/**
 * Create an audio player for Gemini responses
 */
export class AudioPlayer {
    private audioContext: AudioContext | null = null;
    private nextStartTime: number = 0;
    private sampleRate: number = 24000; // Gemini outputs 24kHz audio
    private scheduledSources: AudioBufferSourceNode[] = [];

    constructor(sampleRate: number = 24000) {
        this.sampleRate = sampleRate;
    }

    async play(base64Audio: string): Promise<void> {
        if (!this.audioContext) {
            this.audioContext = new AudioContext({ sampleRate: this.sampleRate });
        }

        const pcmData = base64ToArrayBuffer(base64Audio);
        const float32Data = pcm16ToFloat32(pcmData);

        // Create audio buffer
        const audioBuffer = this.audioContext.createBuffer(
            1, // mono
            float32Data.length,
            this.sampleRate
        );
        audioBuffer.getChannelData(0).set(float32Data);

        // Create source node
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);

        // Schedule playback
        const currentTime = this.audioContext.currentTime;
        const startTime = Math.max(currentTime, this.nextStartTime);
        source.start(startTime);

        // Track the source
        this.scheduledSources.push(source);

        // Remove from tracking when ended
        source.onended = () => {
            this.scheduledSources = this.scheduledSources.filter(s => s !== source);
        };

        // Update next start time for seamless playback
        this.nextStartTime = startTime + audioBuffer.duration;
    }

    stop(): void {
        this.reset(); // Stop all playing sources first
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
    }

    reset(): void {
        // Stop all scheduled/playing sources
        this.scheduledSources.forEach(source => {
            try {
                source.stop();
            } catch (e) {
                // Ignore errors if source already stopped
            }
        });
        this.scheduledSources = [];
        this.nextStartTime = 0;

        // If context exists, sync nextStartTime to current time to be safe
        if (this.audioContext) {
            this.nextStartTime = this.audioContext.currentTime;
        }
    }
}
