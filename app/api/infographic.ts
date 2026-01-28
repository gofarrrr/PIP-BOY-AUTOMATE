import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Nano Banana Pro Infographic Generator
 * Uses Gemini 3 Pro Image (google/gemini-3-pro-image-preview) via OpenRouter
 * for native image generation with style consistency.
 */

// XML-structured prompt template for maximum consistency
const INFOGRAPHIC_PROMPT_TEMPLATE = `
<persona>
You are a professional infographic designer specializing in business strategy visualization.
Create premium, on-brand visual content that feels strategic and tactical.
</persona>

<constraints>
- Color scheme: 
  - Background: Cream (#F9F8F6)
  - Primary: Dark Forest Green (#1E3D2F)
  - Accent: Coral/Orange (#FF6B4A)
  - Text: Dark (#1A1A1A)
- Font hierarchy: Bold sans-serif headers, clean body text
- Style: Linocut / Woodblock print aesthetic with bold, thick lines
- Layout: Clean, minimal, professional "Strategy Canvas" feel
- Static visual only - no animations
- Aspect ratio: 16:9 for presentations/sharing
</constraints>

<context>
Brand: aiornot.biz // AI Strategy Diagnostic
Audience: Business owners and decision-makers evaluating AI adoption
</context>

<task>
Generate an infographic "Strategy Card" showing:
1. Title bar: "aiornot.biz // STRATEGY VERDICT"
2. Main VERDICT in large, bold typography (one of: AUTOMATE, AUGMENT, or PROTECT)
3. 3-4 Key Insights summarized from the user's situation
4. A tactical recommendation line (e.g., "Niche down or merge", "Build a high-trust moat")
5. A simple linocut-style icon representing the verdict

Design reference: Modern professional infographic with woodblock/linocut illustration aesthetic
</task>
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        const { summary, verdict } = req.body;

        if (!summary || !verdict) {
            return res.status(400).json({ error: 'Summary and verdict are required' });
        }

        // Construct the user prompt with diagnostic data
        const userPrompt = `
Generate a Strategy Card infographic with:

VERDICT: ${verdict}

USER SITUATION SUMMARY:
${summary}

Follow the brand constraints and design style strictly. Make the verdict prominent and the insights scannable.
`;

        // OpenRouter API call with Nano Banana Pro configuration
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://aiornot.biz',
                'X-Title': 'AI or Not - Strategy Card Generator',
            },
            body: JSON.stringify({
                // Nano Banana Pro for native image generation
                model: process.env.INFOGRAPHIC_MODEL || 'google/gemini-2.5-flash-preview-native-audio-dialog',
                messages: [
                    { role: 'system', content: INFOGRAPHIC_PROMPT_TEMPLATE },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7, // Optimal for style consistency

                // Critical: Enable image generation response
                // Note: OpenRouter may require specific model support for these
                // Fallback to text-to-SVG if native image not available
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenRouter API error:', errorText);

            // If the model doesn't support native image gen, fall back to SVG
            return await generateFallbackSVG(apiKey, verdict, summary, res);
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || '';

        // Check if we got an image (base64) or text (SVG)
        // OpenRouter returns images in specific format when using image models
        if (content.startsWith('<svg') || content.includes('<?xml')) {
            // SVG response - clean and return
            const cleanSvg = content.replace(/```svg/g, '').replace(/```/g, '').trim();
            return res.status(200).json({ svg: cleanSvg, type: 'svg' });
        } else if (content.startsWith('data:image') || data.choices?.[0]?.message?.image) {
            // Native image response (base64)
            const imageData = data.choices?.[0]?.message?.image || content;
            return res.status(200).json({ image: imageData, type: 'image' });
        } else {
            // Text response - try to extract SVG or generate fallback
            console.log('Unexpected response format, using fallback');
            return await generateFallbackSVG(apiKey, verdict, summary, res);
        }
    } catch (error) {
        console.error('Infographic API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Fallback: Generate SVG via text completion if native image gen fails
 */
async function generateFallbackSVG(
    apiKey: string,
    verdict: string,
    summary: string,
    res: VercelResponse
) {
    const svgPrompt = `Generate a standalone SVG infographic (800x600px) for:
VERDICT: ${verdict}
SUMMARY: ${summary}

Use these colors: Background #F9F8F6, Primary #1E3D2F, Accent #FF6B4A
Include: Title "aiornot.biz // STRATEGY VERDICT", large verdict text, 3-4 bullet insights, tactical note.
Output ONLY raw SVG code, no markdown.`;

    const fallbackResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://aiornot.biz',
            'X-Title': 'AI or Not - SVG Fallback',
        },
        body: JSON.stringify({
            model: 'x-ai/grok-4.1-fast',
            messages: [{ role: 'user', content: svgPrompt }],
            temperature: 0.5,
        }),
    });

    if (!fallbackResponse.ok) {
        return res.status(500).json({ error: 'Failed to generate infographic' });
    }

    const data = await fallbackResponse.json();
    let svgCode = data.choices?.[0]?.message?.content || '';
    svgCode = svgCode.replace(/```svg/g, '').replace(/```/g, '').trim();

    return res.status(200).json({ svg: svgCode, type: 'svg' });
}
