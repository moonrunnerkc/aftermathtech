import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { idea } = await req.json();

    const prompt = `
    You are an AI project scoping assistant. Given a user's idea, return a structured response including:

    1. Summary of the project
    2. Estimated time to complete (in weeks)
    3. Suggested tech stack (frontend, backend, AI tools)
    4. Ballpark cost (in USD)

    User Idea:
    "${idea}"

    Respond in clean Markdown format.
    `;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.error("🚨 MISSING API KEY");
        return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
    }

    try {
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

        if (!res.ok) {
            console.error("🔴 OpenAI Error:", data);
            return NextResponse.json({ error: data }, { status: res.status });
        }

        const reply = data.choices?.[0]?.message?.content || 'No response from GPT.';
        console.log("✅ GPT Reply:", reply);
        return NextResponse.json({ reply });
    } catch (err) {
        console.error("🔥 Server Error:", err);
        return NextResponse.json({ error: 'Server error.' }, { status: 500 });
    }
}
