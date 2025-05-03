import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { input } = await req.json();

    if (!input) {
        return NextResponse.json({ error: 'Missing input' }, { status: 400 });
    }

    const prompt = `You're an AI strategist matching clients to services.

    Client said:
    "${input}"

    Choose ONE match from this list:
    - GPT-powered automation
    - AI ad systems
    - AI eCommerce builder
    - AI content rewriting engine
    - Custom GPT agent development

    Respond ONLY with one of the above lines. No extras, no explanations.`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
        }),
    });

    const data = await res.json();
    let reply = data.choices?.[0]?.message?.content?.trim();

    const validMatches = [
        'GPT-powered automation',
        'AI ad systems',
        'AI eCommerce builder',
        'AI content rewriting engine',
        'Custom GPT agent development',
    ];

    if (!validMatches.includes(reply)) {
        reply = 'No match found.';
    }

    return NextResponse.json({ reply });
}
