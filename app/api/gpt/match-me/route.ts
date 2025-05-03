import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { input } = await req.json();

    if (!input) {
        return NextResponse.json({ error: 'Missing input' }, { status: 400 });
    }

    const validMatches = [
        'GPT-powered automation',
        'AI ad systems',
        'AI eCommerce builder',
        'Content rewriting engine',
        'Custom GPT agent development',
        'AI funnel builder',
        'Prompt-engineered content campaigns',
        'Realtime chat-based lead capture',
        'AI document analysis',
        'Persona-matched GPT agents',
    ];

    const prompt = `You're an AI strategist matching clients to services.

    Client said:
    "${input}"

    Choose ONE from this list:
    ${validMatches.map((s) => `- ${s}`).join('\n')}

    Respond with the exact line. No extra commentary, no formatting, no quotes.`;

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.2,
        }),
    });

    const raw = await gptRes.text();

    try {
        const data = JSON.parse(raw);
        const reply = data.choices?.[0]?.message?.content?.trim();

        const match = validMatches.find((m) => reply?.toLowerCase().includes(m.toLowerCase()));

        if (!match) {
            return NextResponse.json({
                reply: `⚠️ No match found.\n\nRaw: ${reply}`,
            });
        }

        return NextResponse.json({ redirect: `/services?match=${encodeURIComponent(match)}` });
    } catch {
        return NextResponse.json({
            reply: `❌ Failed to parse GPT response:\n${raw}`,
        });
    }
}
