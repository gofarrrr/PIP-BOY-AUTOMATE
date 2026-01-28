import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Nano Banana Pro Artistic Strategy Card Generator
 * Uses native image generation for visually stunning output.
 */

// Artistic prompt template for pop-art infographic style
const ARTISTIC_PROMPT_TEMPLATE = `
<persona>
You are an award-winning infographic designer creating a premium Strategy Card poster for a business client. Your work has been featured in Wired, Bloomberg Businessweek, and design museums.
</persona>

<style>
CRITICAL: This should look like ART, not a boring PDF document.

- Pop-art meets editorial design (think: Wired magazine covers, Bloomberg Businessweek graphics)
- Bold geometric shapes and clean data visualization
- High contrast, punchy colors, modern sans-serif typography
- Stylized, artistic icons and visual metaphors (NOT generic clipart)
- Dynamic composition with visual hierarchy that draws the eye
- This should feel like a poster you'd frame on your wall
</style>

<brand_colors>
- Primary: Deep Forest Green (#1E3D2F) - use for backgrounds and key elements
- Accent: Vibrant Coral (#FF6B4A) - use for highlights and CTAs
- Neutral: Warm Cream (#F9F8F6) - use for contrast and text backgrounds
- Text: Dark charcoal for readability
</brand_colors>

<layout>
- Bold, large typography for the main verdict (AUTOMATE, AUGMENT, or PROTECT)
- A striking visual metaphor or illustrated icon representing the verdict
- 3-4 key insights in scannable format
- One tactical recommendation callout
- Brand mark: "aiornot.biz" subtly placed
- Aspect ratio: 16:9 (widescreen poster format)
</layout>

<visual_metaphors>
- AUTOMATE = Gears, robots, flowing assembly lines, efficiency symbols
- AUGMENT = Human + AI collaboration, enhancement, amplification visuals
- PROTECT = Shields, fortresses, moats, defensive positioning, safe harbors
</visual_metaphors>
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

        // Extract key insights from summary (first 3-4 relevant lines)
        const summaryLines = summary.split('\n').filter((line: string) => line.trim().length > 10);
        const keyInsights = summaryLines.slice(-6, -1).join('\n');

        // Construct the artistic image prompt
        const imagePrompt = `
Create a stunning pop-art style Strategy Card infographic poster.

VERDICT: ${verdict}
${verdict === 'AUTOMATE' ? 'Visual theme: Efficiency, automation, gears and flowing systems' : ''}
${verdict === 'AUGMENT' ? 'Visual theme: Human-AI collaboration, enhancement, amplification' : ''}
${verdict === 'PROTECT' ? 'Visual theme: Defense, moats, fortress, secure positioning' : ''}

KEY INSIGHTS FROM DIAGNOSTIC:
${keyInsights}

REQUIREMENTS:
- Make the verdict "${verdict}" the hero element with bold, impactful typography
- Include an artistic, stylized illustration representing the verdict (not clipart)
- Use the brand colors: Forest Green (#1E3D2F), Coral (#FF6B4A), Cream (#F9F8F6)
- Add 3-4 scannable insight points from the diagnostic
- Include one punchy tactical recommendation
- Small brand mark: "aiornot.biz" 
- This should look like premium editorial design, NOT a boring document
- Make it visually stunning and shareable
`;

        // Try native image generation first
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://aiornot.biz',
                'X-Title': 'AI or Not - Strategy Card Generator',
            },
            body: JSON.stringify({
                // Use Gemini for image generation
                model: process.env.INFOGRAPHIC_MODEL || 'google/gemini-2.0-flash-exp:free',
                messages: [
                    { role: 'system', content: ARTISTIC_PROMPT_TEMPLATE },
                    { role: 'user', content: imagePrompt }
                ],
                temperature: 0.8, // Higher for more creative output
                // Request image output if supported
                response_format: { type: 'text' }, // Will contain image data or description
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenRouter API error:', errorText);
            return res.status(response.status).json({ error: 'Failed to generate infographic' });
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || '';

        // Check for image in response (various formats)
        const imageInMessage = data.choices?.[0]?.message?.image;
        const imageInContent = content.match(/data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+/);

        if (imageInMessage) {
            // Native image response
            return res.status(200).json({
                image: imageInMessage,
                type: 'image'
            });
        } else if (imageInContent) {
            // Base64 image in content
            return res.status(200).json({
                image: imageInContent[0],
                type: 'image'
            });
        } else if (content.startsWith('<svg') || content.includes('<?xml')) {
            // SVG fallback
            const cleanSvg = content.replace(/```svg/g, '').replace(/```/g, '').trim();
            return res.status(200).json({ svg: cleanSvg, type: 'svg' });
        } else {
            // Text description - generate artistic SVG as fallback
            console.log('No image in response, generating artistic SVG fallback');
            return await generateArtisticSvgFallback(apiKey, verdict, keyInsights, res);
        }
    } catch (error) {
        console.error('Infographic API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Fallback: Generate an artistic SVG if native image gen isn't available
 */
async function generateArtisticSvgFallback(
    apiKey: string,
    verdict: string,
    insights: string,
    res: VercelResponse
) {
    const svgPrompt = `Generate a visually stunning SVG infographic poster (1200x675px, 16:9 ratio).

VERDICT: ${verdict}

DESIGN REQUIREMENTS:
- Use bold geometric shapes as background elements (circles, rectangles, abstract forms)
- Main verdict "${verdict}" in massive, bold typography (at least 80px)
- Color scheme: Background Forest Green (#1E3D2F), Accent Coral (#FF6B4A), Cream (#F9F8F6)
- Add 3-4 insight bullets in clean, modern typography
- Include a stylized abstract icon representing the verdict
- Add "aiornot.biz" as a subtle brand mark
- This should look like a PREMIUM POSTER, not a boring document

KEY INSIGHTS:
${insights}

CRITICAL: Output ONLY raw SVG code. No markdown, no explanations. Make it visually striking.`;

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
            temperature: 0.7,
        }),
    });

    if (!fallbackResponse.ok) {
        return res.status(500).json({ error: 'Failed to generate infographic' });
    }

    const data = await fallbackResponse.json();
    let svgCode = data.choices?.[0]?.message?.content || '';
    svgCode = svgCode.replace(/```svg/g, '').replace(/```/g, '').replace(/```xml/g, '').trim();

    // Ensure it starts with SVG tag
    if (!svgCode.startsWith('<svg')) {
        const svgMatch = svgCode.match(/<svg[\s\S]*<\/svg>/);
        if (svgMatch) {
            svgCode = svgMatch[0];
        }
    }

    return res.status(200).json({ svg: svgCode, type: 'svg' });
}
