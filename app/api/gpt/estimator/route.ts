// 🔹 app/api/gpt/estimator/route.ts
export async function POST(req: Request) {
    const body = await req.json();
    const input = body.idea;

    if (!input) {
        return new Response(JSON.stringify({ error: 'Missing idea input' }), { status: 400 });
    }

    const reply = `Rough estimate: $5–8k to build '${input}' using GPT-4 automation.`;

    return new Response(JSON.stringify({ reply }), { status: 200 });
}
