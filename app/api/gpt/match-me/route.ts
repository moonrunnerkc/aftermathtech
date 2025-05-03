import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { input } = await req.json();

    if (!input) {
        return NextResponse.json({ error: 'Missing input' }, { status: 400 });
    }

    const prompt = `You're an AI systems strategist. A client just submitted this request:

    "${input}"

    Based on the input, match them to the best-fit service from this list:

    - GPT-powered automation
    - AI ad systems
    - AI eCommerce builder
    - AI content rewriting engine
    - Custom GPT agent development

    You must return one match. No disclaimers. Be blunt. Only respond with the exact name of the matched service.`;


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
