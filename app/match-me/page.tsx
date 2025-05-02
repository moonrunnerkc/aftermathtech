'use client';
import { useState } from 'react';

export default function MatchMePage() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleMatch() {
        setLoading(true);
        const res = await fetch('/api/gpt/match-me', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input }),
        });
        const data = await res.json();
        setResponse(data.reply);
        setLoading(false);
    }

    return (
        <div className="max-w-3xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">🔍 Match Me to a Service</h1>
        <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe what you&apos;re trying to build or solve..."
        className="w-full h-32 p-4 bg-black border border-gray-700 rounded resize-none"
        />
        <button
        onClick={handleMatch}
        className="mt-4 px-6 py-2 bg-blue-500 text-black font-bold rounded hover:bg-blue-400"
        disabled={loading}
        >
        {loading ? 'Matching…' : 'Match Me'}
        </button>

        {response && (
            <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded whitespace-pre-wrap">
            {response}
            </div>
        )}
        </div>
    );
}
