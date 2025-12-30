// Interview feature types

export type InterviewPhase =
    | 'idle'           // Not started
    | 'intro'          // AI introduction
    | 'discovery'      // Open questions
    | 'probing'        // Targeted follow-ups
    | 'gap-filling'    // Clarification
    | 'summary'        // Final verdict
    | 'complete';      // Done

export type GraphNodeId =
    | 'often'
    | 'enjoy'
    | 'augmenting'
    | 'complex'
    | 'steps'
    | 'success'
    | 'judgment'
    | 'risk'
    | 'automate'
    | 'augment'
    | 'diy';

export type SignalAnswer = 'yes' | 'no' | 'unclear';

export interface ExtractedSignal {
    nodeId: GraphNodeId;
    answer: SignalAnswer;
    confidence: number;        // 0-1
    reasoning: string;         // User's actual words
    cognitiveMotif?: string;   // Extracted pattern
    timestamp: number;
}

export interface CognitiveMotif {
    id: string;
    pattern: string;           // e.g., "Wait for prerequisites"
    examples: string[];        // User quotes that demonstrate this
    frequency: number;         // How often detected
}

export interface InterviewState {
    phase: InterviewPhase;
    signals: ExtractedSignal[];
    motifs: CognitiveMotif[];
    transcript: TranscriptEntry[];
    revealedNodes: GraphNodeId[];
    currentPath: GraphNodeId[];
    verdict?: 'automate' | 'augment' | 'diy';
    startTime?: number;
    endTime?: number;
}

export interface TranscriptEntry {
    id: string;
    speaker: 'user' | 'ai';
    text: string;
    timestamp: number;
    signals?: ExtractedSignal[];  // Signals detected in this entry
}

export interface InterviewSummary {
    verdict: 'automate' | 'augment' | 'diy';
    path: GraphNodeId[];
    keyFactors: KeyFactor[];
    motifs: CognitiveMotif[];
    duration: number;           // seconds
    transcript: TranscriptEntry[];
}

export interface KeyFactor {
    nodeId: GraphNodeId;
    label: string;
    answer: SignalAnswer;
    impact: 'positive' | 'negative' | 'neutral';
    reasoning: string;
}

// Gemini Live API types
export interface GeminiSessionConfig {
    apiKey: string;
    model: string;
    systemInstruction: string;
    tools: GeminiTool[];
}

export interface GeminiTool {
    functionDeclarations: FunctionDeclaration[];
}

export interface FunctionDeclaration {
    name: string;
    description: string;
    parameters: {
        type: string;
        properties: Record<string, unknown>;
        required?: string[];
    };
}

export interface GeminiLiveCallbacks {
    onTranscript: (text: string, isFinal: boolean) => void;
    onAudioResponse: (audioData: ArrayBuffer) => void;
    onSignalExtracted: (signal: ExtractedSignal) => void;
    onError: (error: Error) => void;
    onSessionEnd: () => void;
}

// Audio capture types
export interface AudioCaptureState {
    isRecording: boolean;
    isPaused: boolean;
    hasPermission: boolean;
    permissionDenied: boolean;
    audioLevel: number;        // 0-1 for visualization
}
