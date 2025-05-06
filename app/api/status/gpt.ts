import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.openai.com/v1/models', {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    if (!res.ok) return NextResponse.json({ status: 'down' }, { status: 503 });
    return NextResponse.json({ status: 'ok' });
  } catch {
    return NextResponse.json({ status: 'down' }, { status: 503 });
  }
}
