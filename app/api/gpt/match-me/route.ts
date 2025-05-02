import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { input } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    const prompt = `
    You are a technical project lead at Aftermath Technologies.
    The user is describing their business pain or goal.

    Your job:
    1. Identify the core need
    2. Recommend which Aftermath service solves it (GPT integration, backend automation, AI UX, etc)
    3. Describe a rough solution strategy
    4. End with a short, confident pitch — tone: anti-corporate, terse, intelligent

    User Input:
    "${input}"
    `;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
        }),
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || 'System could not match.';
    return NextResponse.json({ reply });
}
