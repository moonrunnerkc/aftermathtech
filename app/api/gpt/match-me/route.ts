// 🔹 app/api/gpt/match-me/route.ts
export async function POST(req: Request) {
    const body = await req.json();
    const input = body.input;

    if (!input) {
        return new Response(JSON.stringify({ error: 'Missing input' }), { status: 400 });
    }

    const lower = input.toLowerCase();
    let reply = 'No match found.';

    if (lower.includes('automation')) reply = '✅ You need our Automation Systems Service';
    else if (lower.includes('ecommerce')) reply = '✅ We recommend the GPT eCommerce Builder';
    else if (lower.includes('content')) reply = '✅ Consider the AI Content Engine Suite';

    return new Response(JSON.stringify({ reply }), { status: 200 });
}
