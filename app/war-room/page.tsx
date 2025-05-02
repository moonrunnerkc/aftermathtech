'use client';
import { useState } from 'react';

export default function WarRoom() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState<{ persona: string; reply: string }[]>([]);
    const [loading, setLoading] = useState(false);

    async function runTest() {
        setLoading(true);
        const res = await fetch('/api/gpt/persona-war', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: input }),
        });
        const data = await res.json();
        setResults(data.responses);
        setLoading(false);
    }

    return (
        <div className="max-w-4xl mx-auto p-6 text-white">
        <h1 className="text-3xl mb-4 font-bold">🧠 AI-Persona War Room</h1>
        <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a prompt to compare personas..."
        className="w-full h-32 p-4 bg-black border border-gray-700 rounded resize-none"
        />
        <button
        onClick={runTest}
        className="mt-4 px-6 py-2 bg-indigo-500 text-black font-bold rounded hover:bg-indigo-400"
        disabled={loading}
        >
        {loading ? 'Simulating...' : 'Run Persona Test'}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {results.map((res, i) => (
            <div key={i} className="p-4 bg-gray-900 border border-gray-700 rounded whitespace-pre-wrap">
            <h2 className="text-lg font-bold mb-2">{res.persona}</h2>
            {res.reply}
            </div>
        ))}
        </div>
        </div>
    );
}
