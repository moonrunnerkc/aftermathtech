// ✅ Updated /api/gpt/persona-war/route.ts with real GPT responses for 3 personas

import { NextResponse } from 'next/server';

const personas = [
    {
        name: 'Strategist',
        style: 'Direct, tactical, focused on outcomes',
        system: 'You are a strategist AI. Respond with tactical, outcome-driven analysis. Be brief, sharp, and emphasize results.'
    },
    {
        name: 'Visionary',
        style: 'Expansive, abstract, explores big ideas',
        system: 'You are a visionary AI. Respond with abstract thinking, big-picture ideas, and creative perspective. Sound like a futurist.'
    },
    {
        name: 'Critic',
        style: 'Skeptical, sharp, looks for weak points',
        system: 'You are a critical AI. Analyze from a skeptical, confrontational stance. Look for flaws and challenge assumptions.'
    },
];

export async function POST(req: Request) {
    const { prompt } = await req.json();

    if (!prompt) {
        return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    const results = await Promise.all(
        personas.map(async (persona) => {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.OpenAIKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        { role: 'system', content: persona.system },
                        { role: 'user', content: prompt },
                    ],
                    temperature: 0.6,
                }),
            });

            const data = await res.json();
            const content = data.choices?.[0]?.message?.content?.trim() || '[No response]';

            return `🧠 ${persona.name} (${persona.style}):\n${content}`;
        })
    );

    return NextResponse.json({ reply: results.join('\n\n') });
}
