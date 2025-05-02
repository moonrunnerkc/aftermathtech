import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();

    const personas = [
        { name: '👨‍💻 Dev Strategist', style: 'Respond as a pragmatic senior developer architect focused on clarity, performance, and tech stack justification.' },
        { name: '🧠 Copywriter', style: 'Respond as a creative AI copywriter optimizing for emotional resonance and clear CTAs.' },
        { name: '🤨 Skeptic', style: 'Respond as a skeptical investor poking holes in assumptions and feasibility.' },
    ];

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
    }

    const gptResponses = await Promise.all(
        personas.map(async (persona) => {
            const fullPrompt = `${persona.style}\n\nUser Prompt:\n${prompt}`;

            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: fullPrompt }],
                }),
            });

            const data = await res.json();
            const reply = data.choices?.[0]?.message?.content || 'No response.';

        return {
            persona: persona.name,
            reply,
        };
        })
    );

    return NextResponse.json({ responses: gptResponses });
}
