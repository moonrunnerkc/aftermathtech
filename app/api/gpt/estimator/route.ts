import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { idea } = await req.json();

    if (!idea) {
        return NextResponse.json({ error: 'Missing idea input' }, { status: 400 });
    }

    const prompt = `Estimate the time, cost, and team required to build this idea using GPT-based automation. Be realistic, concise, and clear. Format the output in bullet points.\n\nIdea: "${idea}"`;

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        }),
    });

    const data = await gptRes.json();
    const reply = data.choices?.[0]?.message?.content || '⚠️ GPT returned no content';

    return NextResponse.json({ reply });
}
