import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { input } = await req.json();

    if (!input) {
        return NextResponse.json({ error: 'Missing input' }, { status: 400 });
    }

    const prompt = `You're a strategist for a GPT automation agency. A user described their business or idea and wants to know if GPT or automation can help. If there is any way AI could assist — such as customer service, scheduling, content, marketing, ecommerce — suggest the best-fit service from the following options:

    - GPT-powered automation
    - AI ad systems
    - AI eCommerce builder
    - AI content rewriting engine
    - Custom GPT agent development

    Client input: "${input}"

    Respond in 1–2 sentences. Be helpful and direct. If there's truly no match, say "No match found. Provide more Details."`;


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
