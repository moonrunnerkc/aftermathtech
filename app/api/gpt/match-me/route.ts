import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { input } = await req.json();

    if (!input) {
        return NextResponse.json({ error: 'Missing input' }, { status: 400 });
    }

    const prompt = `You're a strategist for a GPT automation agency. Based on the client's request, match them to the most appropriate AI-powered service offering. Be direct.\n\nClient input: "${input}"`;

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.6,
        }),
    });

    const data = await gptRes.json();
    const reply = data.choices?.[0]?.message?.content || 'No match found.';

    return NextResponse.json({ reply });
}
