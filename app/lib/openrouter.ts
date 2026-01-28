// Read system prompt from file at build time (Vite will inline this)
import systemPromptContent from '../prompts/diagnostic-system.md?raw';

// Import all knowledge base content
import copyMistakes from '../COPY-MISTAKES.md?raw';
import copyTask from '../COPY-TASK.md?raw';
import copyStrategy from '../COPY-STRATEGY.md?raw';
import copyReadiness from '../COPY-READINESS.md?raw';
import copyKnowledge from '../COPY-KNOWLEDGE.md?raw';

// Import research and deep-dive content
import manifestoV2 from '../reshuffle-knowledge/manifesto_v2.md?raw';
import cluster1 from '../reshuffle-knowledge/cluster_1_diagnosis.md?raw';
import cluster2 from '../reshuffle-knowledge/cluster_2_positioning.md?raw';
import cluster3 from '../reshuffle-knowledge/cluster_3_levers.md?raw';
import cluster4 from '../reshuffle-knowledge/cluster_4_archetypes.md?raw';
import cluster5 from '../reshuffle-knowledge/cluster_5_rebundling.md?raw';
import cluster6 from '../reshuffle-knowledge/cluster_6_deep_dives.md?raw';
import rubricDefs from '../reshuffle-knowledge/rubric_definitions.md?raw';
import transcript from '../reshuffle-knowledge/transcript_ben_ai_business_2026.md?raw';

// Combine all knowledge into a comprehensive context
const knowledgeBase = `
---
# KNOWLEDGE BASE
The following content is your deep knowledge about AI strategy, tasks, and business positioning.
Use this to give informed, nuanced answers. Reference specific concepts when relevant.
---

## COMMON MISTAKES
${copyMistakes}

## TASK ASSESSMENT FRAMEWORK
${copyTask}

## STRATEGY & POSITIONING
${copyStrategy}

## READINESS ASSESSMENT
${copyReadiness}

## KNOWLEDGE EXTRACTION
${copyKnowledge}

## MANIFESTO & PHILOSOPHY
${manifestoV2}

## DIAGNOSTIC CLUSTERS
### Cluster 1: Diagnosis
${cluster1}

### Cluster 2: Positioning
${cluster2}

### Cluster 3: Levers
${cluster3}

### Cluster 4: Archetypes
${cluster4}

### Cluster 5: Rebundling
${cluster5}

### Cluster 6: Deep Dives
${cluster6}

## RUBRIC DEFINITIONS
${rubricDefs}

## EXPERT INSIGHTS (Transcript)
${transcript}
`;

// Full system prompt = instructions + knowledge base
const fullSystemPrompt = systemPromptContent + '\n\n' + knowledgeBase;

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

/**
 * Detect if we're in production (Vercel) or local development
 */
function getApiEndpoint(): string {
    // In production, use the Edge Function
    // In development, we'll still use direct OpenRouter calls for convenience
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        return '/api/chat';
    }
    // For local dev, we use direct calls (you need VITE_OPENROUTER_API_KEY in .env)
    return 'direct';
}

/**
 * Send a message via the secure /api/chat endpoint (production)
 */
async function sendViaProxy(
    conversationHistory: ChatMessage[],
    userMessage: string
): Promise<string> {
    const messages = [
        ...conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content,
        })),
        { role: 'user', content: userMessage },
    ];

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages,
            systemPrompt: fullSystemPrompt,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'API request failed');
    }

    const data = await response.json();
    return data.content;
}

/**
 * Send a message directly to OpenRouter (local development only)
 */
async function sendDirect(
    conversationHistory: ChatMessage[],
    userMessage: string
): Promise<string> {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const model = import.meta.env.VITE_LLM_MODEL || 'x-ai/grok-4.1-fast';

    if (!apiKey) {
        throw new Error('VITE_OPENROUTER_API_KEY is not set. Please add it to your .env file.');
    }

    const messages = [
        { role: 'system', content: fullSystemPrompt },
        ...conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content,
        })),
        { role: 'user', content: userMessage },
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://aiornot.biz',
            'X-Title': 'AI or Not - Diagnostic Guide',
        },
        body: JSON.stringify({
            model,
            messages,
            temperature: 0.7,
            max_tokens: 1024,
        }),
    });

    if (!response.ok) {
        throw new Error('OpenRouter API error');
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
}

export async function sendMessage(
    conversationHistory: ChatMessage[],
    userMessage: string
): Promise<string> {
    const endpoint = getApiEndpoint();

    if (endpoint === 'direct') {
        return sendDirect(conversationHistory, userMessage);
    } else {
        return sendViaProxy(conversationHistory, userMessage);
    }
}

/**
 * Generate a strategy infographic based on the chat summary
 */
export async function generateInfographic(
    summary: string,
    verdict: string
): Promise<string> {
    const response = await fetch('/api/infographic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ summary, verdict }),
    });

    if (!response.ok) {
        throw new Error('Failed to generate strategy card');
    }

    const data = await response.json();
    return data.svg;
}


/**
 * Get the initial greeting from the AI
 */
export async function getInitialGreeting(): Promise<string> {
    try {
        return await sendMessage([], 'Start the conversation with your intro message. Remember to be warm, brief, and ask what\'s on my mind about AI.');
    } catch (error) {
        console.error('Error getting initial greeting:', error);
        return getFallbackGreeting();
    }
}

/**
 * Fallback greeting if API fails
 */
function getFallbackGreeting(): string {
    return "Hey! I'm here to help you figure out how AI fits into your work. What's been on your mind lately—automating tasks, worried about how AI affects your business, or looking to help your team work smarter?";
}
