'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MatchMePage() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function getMatch() {
        setLoading(true);
        try {
            const res = await fetch('/api/gpt/match-me', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input }),
            });

            const data = await res.json();

            if (data.redirect) {
                router.push(data.redirect);
            } else {
                alert('⚠️ Could not find a match.');
            }
        } catch (err) {
            alert('❌ GPT error.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 text-white">
        <h1 className="text-3xl mb-4 font-bold">🔍 Match Me to a Service</h1>
        <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your situation, project, or need..."
        className="w-full h-32 p-4 bg-black border border-gray-700 rounded resize-none"
        />
        <button
        onClick={getMatch}
        className="mt-4 px-6 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400"
        disabled={loading}
        >
        {loading ? 'Thinking...' : 'Match Me'}
        </button>
        </div>
    );
}
