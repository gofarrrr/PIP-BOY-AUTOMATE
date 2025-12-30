// Gemini API configuration and prompts

import type { FunctionDeclaration, GeminiTool } from '../types/interview';

// API Key from environment
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

// Model configuration
export const GEMINI_MODEL = 'gemini-2.0-flash-exp'; // Using latest available

// System prompt for the interviewer agent
export const INTERVIEWER_SYSTEM_PROMPT = `You are a PIP-BOY analyst conducting a cognitive interview about a task the user is considering automating.

Your goal is NOT to get simple yes/no answers. You need to extract:
1. The user's actual reasoning about their work
2. Their emotional relationship to the task
3. The causal logic they use ("because", "when", "unless", "that's why")
4. Edge cases and exceptions they handle
5. Hidden dependencies and blockers

CONVERSATION STYLE:
- Warm but professional, like a helpful consultant
- Curious and exploratory, not interrogating
- Reflect back what you hear to confirm understanding
- Probe gently on interesting threads
- Use natural language, avoid jargon
- Keep responses concise (2-3 sentences max unless summarizing)

INTERVIEW FLOW:
1. INTRO: Brief introduction, ask them to describe the task
2. DISCOVERY: Listen for frequency, enjoyment, complexity signals
3. PROBING: Ask targeted follow-ups based on what you've heard
4. GAP-FILLING: Clarify contradictions or missing information
5. SUMMARY: Synthesize findings and give recommendation

SIGNAL DETECTION:
When you detect a clear signal about frequency, enjoyment, complexity, process clarity, success criteria, judgment needs, or risk - call the extract_signal function.

Only call extract_signal when you're reasonably confident (>0.6) about the answer.
Include the user's actual words as reasoning.
If you detect a recurring pattern in their thinking, include it as a cognitive motif.

IMPORTANT:
- Don't rush through questions - let the user speak fully
- If something is unclear, ask for clarification
- Look for contradictions and gently explore them
- The goal is understanding, not form-filling`;

// Function declaration for signal extraction
export const EXTRACT_SIGNAL_FUNCTION: FunctionDeclaration = {
    name: 'extract_signal',
    description: 'Extract an automation-relevant signal from the user\'s speech. Call this when you detect clear information about frequency, enjoyment, complexity, process clarity, success criteria, judgment requirements, or risk level.',
    parameters: {
        type: 'object',
        properties: {
            nodeId: {
                type: 'string',
                enum: ['often', 'enjoy', 'complex', 'steps', 'success', 'judgment', 'risk'],
                description: 'The graph node this signal relates to'
            },
            answer: {
                type: 'string',
                enum: ['yes', 'no', 'unclear'],
                description: 'The detected answer for this node'
            },
            confidence: {
                type: 'number',
                description: 'Confidence level from 0 to 1'
            },
            reasoning: {
                type: 'string',
                description: 'The user\'s actual words or close paraphrase that led to this signal'
            },
            cognitiveMotif: {
                type: 'string',
                description: 'Optional: A recurring reasoning pattern detected, e.g., "Wait for prerequisites before starting"'
            }
        },
        required: ['nodeId', 'answer', 'confidence', 'reasoning']
    }
};

// Tools configuration for Gemini
export const GEMINI_TOOLS: GeminiTool[] = [
    {
        functionDeclarations: [EXTRACT_SIGNAL_FUNCTION]
    }
];

// Node labels for display
export const NODE_LABELS: Record<string, string> = {
    often: 'Frequency',
    enjoy: 'Enjoyment',
    augmenting: 'Worth Augmenting',
    complex: 'Complexity',
    steps: 'Process Clarity',
    success: 'Success Criteria',
    judgment: 'Judgment Required',
    risk: 'Risk Level',
    automate: 'Automate',
    augment: 'Augment',
    diy: 'Do It Yourself'
};

// Verdict explanations
export const VERDICT_EXPLANATIONS = {
    automate: 'This task is a strong candidate for full automation. Low risk, clear process, no judgment calls needed.',
    augment: 'This task benefits from human oversight with tool assistance. Use AI/automation to help, but stay in the loop.',
    diy: 'Keep doing this yourself. The task is too rare, too complex, or provides value you want to preserve.'
};

// Helper to check if API key is configured
export function isGeminiConfigured(): boolean {
    return !!GEMINI_API_KEY && GEMINI_API_KEY.length > 0;
}
