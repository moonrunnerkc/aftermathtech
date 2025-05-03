// 🔹 app/api/gpt/persona-war/route.ts
export async function POST(req: Request) {
    const body = await req.json();
    const prompt = body.prompt;

    if (!prompt) {
        return new Response(JSON.stringify({ error: 'Missing prompt' }), { status: 400 });
    }

    const reply = `🔊 GPT Response Simulation: "${prompt}" evaluated across three AI persona styles.`;

    return new Response(JSON.stringify({ reply }), { status: 200 });
}
