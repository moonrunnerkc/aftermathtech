'use client';
import { useState } from 'react';

export default function WarRoomPage() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    async function submit() {
        setLoading(true);
        try {
            const res = await fetch('/api/gpt/persona-war', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();
            setResponse(data.reply || 'No response received.');
        } catch {
            setResponse('❌ Error calling GPT API.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6 text-white max-w-2xl mx-auto">
        <h1 className="text-3xl mb-4 font-bold">🧠 GPT War Room</h1>
        <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Drop a prompt to simulate persona feedback..."
        className="w-full h-32 p-4 bg-black border border-gray-700 rounded resize-none"
        />
        <button
        onClick={submit}
        className="mt-4 px-6 py-2 bg-purple-500 text-black font-bold rounded hover:bg-purple-400"
        disabled={loading}
        >
        {loading ? 'Running simulation...' : 'Launch Prompt'}
        </button>

        {response && (
            <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded whitespace-pre-wrap">
            {response}
            </div>
        )}
        </div>
    );
}

