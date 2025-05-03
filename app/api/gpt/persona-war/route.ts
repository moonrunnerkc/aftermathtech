import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    const prompt = body.prompt;

    if (!prompt) {
        return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    const personas = [
        { name: 'Strategist', style: 'Direct, tactical, focused on outcomes' },
        { name: 'Visionary', style: 'Expansive, abstract, explores big ideas' },
        { name: 'Critic', style: 'Skeptical, sharp, looks for weak points' },
    ];

    const reply = personas.map((p) => {
        return `🧠 ${p.name} (${p.style}):\nResponse to "${prompt}" would emphasize their unique POV.\n`;
    }).join('\n');

    return NextResponse.json({ reply });
}
