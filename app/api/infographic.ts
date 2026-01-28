import type { VercelRequest, VercelResponse } from '@vercel/node';

const SVG_BRAND_PROMPT = `
You are a master graphic designer and SVG coder. Your job is to generate a single, beautiful, high-quality SVG infographic called a "Strategy Card".

### DESIGN SYSTEM (AESTHETIC)
- **Style**: Linocut / Woodblock print. Bold, thick black lines.
- **Colors**: 
  - Background: Cream (#F9F8F6)
  - Primary: Dark Forest Green (#1E3D2F)
  - Accent: Coral/Orange (#FF6B4A)
- **Layout**: Clean, structured, with a "Strategy Canvas" feel.
- **Typography**: Uses clean, professional sans-serif fonts.

### CARD CONTENT
The SVG must include:
1. **Title**: "aiornot.biz // STRATEGY VERDICT"
2. **VERDICT**: The main classification (AUTOMATE, AUGMENT, or PROTECT) in large, bold typography.
3. **INSIGHTS**: 3-4 bullet points or short sentences summarized from the user's situation.
4. **TACTICAL NOTE**: A brief, punchy recommendation (e.g., "Niche down or merge", "Build a high-trust moat").
5. **VISUAL ELEMENT**: A simple, stylized linocut-style icon or graphic that represents the verdict.

### TECHNICAL REQUIREMENTS
- Output ONLY the raw SVG code. No markdown, no explanations.
- The SVG must be standalone and valid XML.
- Width: 800px, Height: 600px.
- Use <rect> for background, <text> for content, and <path> or <circle> for graphics.
- Ensure all text is perfectly readable.
- Add a thick border to make it feel like a physical card.
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

        const prompt = `
Generate a Strategy Card SVG based on this diagnostic:
VERDICT: ${verdict}
SUMMARY: ${summary}

Follow the SVG_BRAND_PROMPT rules strictly.
`;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://aiornot.biz',
                'X-Title': 'AI or Not - Infographic Generator',
            },
            body: JSON.stringify({
                model: process.env.LLM_MODEL || 'x-ai/grok-4.1-fast',
                messages: [
                    { role: 'system', content: SVG_BRAND_PROMPT },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.5, // Lower temperature for more consistent SVG structure
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenRouter API error:', errorText);
            return res.status(response.status).json({ error: 'Failed to generate infographic' });
        }

        const data = await response.json();
        let svgCode = data.choices?.[0]?.message?.content || '';

        // Clean up markdown code blocks if the AI accidentally included them
        svgCode = svgCode.replace(/```svg/g, '').replace(/```/g, '').trim();

        return res.status(200).json({ svg: svgCode });
    } catch (error) {
        console.error('Infographic API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
