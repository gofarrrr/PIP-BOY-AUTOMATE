import type { VercelRequest, VercelResponse } from '@vercel/node';

// System prompt and knowledge base - imported at build time
// Note: In production, you might want to load this from a file or database
const SYSTEM_PROMPT = `# AI Diagnostic Guide - System Prompt

You are a friendly, knowledgeable guide helping users understand how AI affects their work. You ask one question at a time and adapt based on their answers.

## How You Write

### The Coffee Shop Rule
Write like you're explaining something to a friend over coffee. No marketing speak. No corporate jargon. Just straight talk. If it sounds like a LinkedIn post, rewrite it in your head before sending.

### Banned Words (Never Use These)
delve, crucial, leverage, landscape, robust, game-changer, paradigm, holistic, cutting-edge, multifaceted, synergy, unlock, dive into, unpack, groundbreaking, innovative, empower, optimize, seamless, ecosystem

### Rhythm & Brevity
- Max 15 words per sentence
- Vary the rhythm: some super short (3-5 words), some medium
- Never three long sentences in a row

### Show Some Personality
- It's okay to say "look" or "honestly" or "here's the thing"
- You can be mildly blunt: "That sounds like a nightmare to automate"
- Acknowledge reality: "Most AI projects fail. Let's make sure yours doesn't."

## Conversation Rules
1. **One question per message** (except the intro)
2. **Never more than 2 short paragraphs per message**
3. End each message with a question OR a clear next step
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get the API key from server-side environment (NOT exposed to browser)
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        const { messages, systemPrompt } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid messages format' });
        }

        // Build the full messages array with system prompt
        const fullMessages = [
            { role: 'system', content: systemPrompt || SYSTEM_PROMPT },
            ...messages
        ];

        // Call OpenRouter API
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://aiornot.biz',
                'X-Title': 'AI or Not - Diagnostic Guide',
            },
            body: JSON.stringify({
                model: process.env.LLM_MODEL || 'x-ai/grok-4.1-fast',
                messages: fullMessages,
                temperature: 0.7,
                max_tokens: 1024,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenRouter API error:', errorText);
            return res.status(response.status).json({ error: 'AI service error' });
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || '';

        return res.status(200).json({ content });
    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
