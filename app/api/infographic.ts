import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Strategy Card Generator using Gemini Native Image Generation
 * Uses Gemini 2.0 Flash for high-quality artistic infographics
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
        return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    try {
        const { summary, verdict } = req.body;

        if (!summary || !verdict) {
            return res.status(400).json({ error: 'Summary and verdict are required' });
        }

        // Extract key insights from the conversation summary
        const summaryLines = summary.split('\n').filter((line: string) => line.trim().length > 10);
        const keyInsights = summaryLines.slice(-6).join('\n');

        // Artistic prompt for Gemini image generation
        const imagePrompt = `Create a stunning pop-art style infographic poster for a business strategy verdict.

DESIGN STYLE:
- High-end editorial design like Wired or Bloomberg Businessweek
- Bold, dynamic composition with strong visual hierarchy
- Modern sans-serif typography (clean, readable)
- Rich, saturated colors with high contrast
- Artistic and visually striking - this should look like gallery art, not a boring PDF

COLOR PALETTE (use exactly these):
- Primary: Deep Forest Green (#1E3D2F) for backgrounds
- Accent: Vibrant Coral (#FF6B4A) for highlights and CTAs
- Light: Warm Cream (#F9F8F6) for contrast areas
- Sharp, clean edges and professional finish

CONTENT TO VISUALIZE:

VERDICT: ${verdict}
${verdict === 'AUTOMATE' ? '(Theme: Efficiency, robots, gears, flowing systems, speed)' : ''}
${verdict === 'AUGMENT' ? '(Theme: Human-AI collaboration, enhancement, growth, amplification)' : ''}
${verdict === 'PROTECT' ? '(Theme: Defense, shields, fortresses, moats, secure positioning)' : ''}

KEY INSIGHTS:
${keyInsights}

LAYOUT REQUIREMENTS:
- The word "${verdict}" should be the massive hero element (very large, bold typography)
- Include an artistic illustration or icon representing the verdict theme
- Add a subtle brand mark "aiornot.biz" in the corner
- Aspect ratio: 16:9 (widescreen poster format)
- Make it visually STUNNING - worthy of framing on a wall

DO NOT include any explanatory text outside the design. Generate only the infographic image.`;

        // Call Gemini API for image generation
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiKey}`;

        const response = await fetch(geminiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: imagePrompt
                    }]
                }],
                generationConfig: {
                    responseModalities: ["IMAGE", "TEXT"],
                    temperature: 0.9,
                },
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API error:', errorText);
            return res.status(response.status).json({ error: 'Failed to generate infographic' });
        }

        const data = await response.json();

        // Extract image from Gemini response
        // Response structure: { candidates: [{ content: { parts: [{ inlineData: { mimeType, data } }] } }] }
        const candidates = data.candidates;
        if (!candidates || candidates.length === 0) {
            console.error('No candidates in Gemini response:', data);
            return res.status(500).json({ error: 'No image generated' });
        }

        const parts = candidates[0]?.content?.parts;
        if (!parts || parts.length === 0) {
            console.error('No parts in Gemini response:', data);
            return res.status(500).json({ error: 'No image data in response' });
        }

        // Find the image part
        const imagePart = parts.find((part: any) => part.inlineData);
        if (!imagePart || !imagePart.inlineData) {
            console.error('No image data found in parts:', parts);
            return res.status(500).json({ error: 'Image generation failed' });
        }

        const { mimeType, data: base64Data } = imagePart.inlineData;

        // Return the base64 image
        return res.status(200).json({
            image: `data:${mimeType};base64,${base64Data}`,
            type: 'image'
        });

    } catch (error) {
        console.error('Infographic API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
