'use client';
import { useState } from 'react';

export default function EstimatorPage() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    async function getEstimate() {
        setLoading(true);
        const res = await fetch('/api/gpt/estimator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idea: input }),
        });
        const data = await res.json();
        setResponse(data.reply);
        setLoading(false);
    }

    return (
        <div className="max-w-2xl mx-auto p-6 text-white">
        <h1 className="text-3xl mb-4 font-bold">💬 What Would You Build?</h1>
        <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your idea..."
        className="w-full h-32 p-4 bg-black border border-gray-700 rounded resize-none"
        />
        <button
        onClick={getEstimate}
        className="mt-4 px-6 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400"
        disabled={loading}
        >
        {loading ? 'Thinking…' : 'Estimate'}
        </button>

        {response && (
            <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded whitespace-pre-wrap">
            {response}
            </div>
        )}
        </div>
    );
}
