import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { idea } = await req.json();

    if (!idea) {
        return NextResponse.json({ error: 'Missing idea input' }, { status: 400 });
    }

    const prompt = `You're a technical project manager and GPT engineer. Given this client idea: "${idea}", estimate the MVP build in hours, cost, stack, and required skills. Format the result in markdown bullets. Be specific and assertive.`;

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

    const raw = await gptRes.text();

    try {
        const data = JSON.parse(raw);
        const reply = data.choices?.[0]?.message?.content;

        if (!reply) {
            return NextResponse.json({ reply: `⚠️ GPT gave no message.\nRaw:\n${raw}` });
        }

        return NextResponse.json({ reply });
    } catch (err) {
        return NextResponse.json({ reply: `❌ Failed to parse GPT response:\n${raw}` });
    }
}
