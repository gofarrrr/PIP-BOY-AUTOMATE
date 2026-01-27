import OpenAI from 'openai';

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

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const LLM_MODEL = import.meta.env.VITE_LLM_MODEL || 'google/gemini-2.0-flash-exp:free';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

/**
 * Initialize the OpenRouter client (uses OpenAI SDK)
 */
function getClient() {
    if (!OPENROUTER_API_KEY) {
        throw new Error('VITE_OPENROUTER_API_KEY is not set. Please add it to your .env file.');
    }

    return new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: OPENROUTER_API_KEY,
        defaultHeaders: {
            'HTTP-Referer': 'https://aiornot.biz',
            'X-Title': 'AI or Not - Diagnostic Guide',
        },
        dangerouslyAllowBrowser: true, // Required for client-side usage
    });
}

/**
 * Send a message to the AI Diagnostic Guide and get a response
 */
export async function sendMessage(
    conversationHistory: ChatMessage[],
    userMessage: string
): Promise<string> {
    const client = getClient();

    // Build the conversation for OpenAI format
    const messages: OpenAI.ChatCompletionMessageParam[] = [
        { role: 'system', content: fullSystemPrompt },
        ...conversationHistory.map(msg => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
        })),
        { role: 'user', content: userMessage },
    ];

    try {
        const response = await client.chat.completions.create({
            model: LLM_MODEL,
            messages,
            temperature: 0.7,
            max_tokens: 1024,
        });

        const text = response.choices?.[0]?.message?.content;

        if (!text) {
            throw new Error('No response from AI');
        }

        return text;
    } catch (error) {
        console.error('OpenRouter API error:', error);
        throw error;
    }
}

/**
 * Get the initial greeting from the AI
 */
export async function getInitialGreeting(): Promise<string> {
    const client = getClient();

    try {
        const response = await client.chat.completions.create({
            model: LLM_MODEL,
            messages: [
                { role: 'system', content: fullSystemPrompt },
                { role: 'user', content: 'Start the conversation with your intro message. Remember to be warm, brief, and ask what\'s on my mind about AI.' },
            ],
            temperature: 0.7,
            max_tokens: 512,
        });

        const text = response.choices?.[0]?.message?.content;

        if (!text) {
            return getFallbackGreeting();
        }

        return text;
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
