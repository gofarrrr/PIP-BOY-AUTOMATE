import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Strategy Card SVG Generator
 * Uses Grok to generate artistic SVG infographics
 */

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

        // Extract key insights from summary
        const summaryLines = summary.split('\n').filter((line: string) => line.trim().length > 10);
        const keyInsights = summaryLines.slice(-6).join('\n');

        // Artistic SVG prompt
        const svgPrompt = `Generate a visually stunning SVG infographic poster.

DIMENSIONS: width="1200" height="675" (16:9 ratio)

VERDICT: ${verdict}

DESIGN REQUIREMENTS:
1. BACKGROUND: Use a full-width dark forest green (#1E3D2F) rectangle as the background
2. TITLE BANNER: Add "aiornot.biz // STRATEGY VERDICT" at the top in cream (#F9F8F6) text
3. MAIN VERDICT: Display "${verdict}" in MASSIVE bold coral/orange (#FF6B4A) typography (font-size 120px or larger)
4. SUBTITLE: Add a short tagline below the verdict in cream text
5. INSIGHTS SECTION: Create a cream (#F9F8F6) rounded rectangle panel with 3-4 bullet points in dark text
6. TACTICAL NOTE: Add a coral-colored accent box with one punchy recommendation
7. DECORATIVE ELEMENTS: Add some geometric shapes (circles, lines) for visual interest
8. BRAND: Small "aiornot.biz" watermark in bottom corner

COLOR PALETTE (use exactly these):
- Background: #1E3D2F (dark forest green)
- Accent: #FF6B4A (coral/orange)
- Light: #F9F8F6 (cream)
- Text Dark: #1A1A1A

KEY INSIGHTS TO INCLUDE:
${keyInsights}

TECHNICAL REQUIREMENTS:
- Output ONLY raw SVG code starting with <svg
- Use viewBox="0 0 1200 675"
- Use <rect>, <text>, <circle>, <line> elements
- Use font-family="Arial, sans-serif"
- Make all text readable and well-positioned
- This should look like a premium poster, not a boring document

OUTPUT ONLY THE SVG CODE. NO MARKDOWN. NO EXPLANATION.`;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://aiornot.biz',
                'X-Title': 'AI or Not - Strategy Card',
            },
            body: JSON.stringify({
                model: process.env.LLM_MODEL || 'x-ai/grok-4.1-fast',
                messages: [{ role: 'user', content: svgPrompt }],
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenRouter API error:', errorText);
            return res.status(response.status).json({ error: 'Failed to generate infographic' });
        }

        const data = await response.json();
        let svgCode = data.choices?.[0]?.message?.content || '';

        // Clean up any markdown formatting
        svgCode = svgCode.replace(/```svg/gi, '').replace(/```xml/gi, '').replace(/```/g, '').trim();

        // Extract just the SVG if there's extra text
        const svgMatch = svgCode.match(/<svg[\s\S]*<\/svg>/i);
        if (svgMatch) {
            svgCode = svgMatch[0];
        }

        // Validate it's actually SVG
        if (!svgCode.startsWith('<svg')) {
            console.error('Invalid SVG response:', svgCode.substring(0, 200));
            return res.status(500).json({ error: 'Failed to generate valid SVG' });
        }

        return res.status(200).json({ svg: svgCode, type: 'svg' });
    } catch (error) {
        console.error('Infographic API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
