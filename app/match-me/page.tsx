'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';


export default function MatchMePage() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    async function match() {
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
        placeholder="Describe what you're trying to build or solve..."
        className="w-full h-32 p-4 bg-black border border-gray-700 rounded resize-none"
        />
        <motion.button
        onClick={getEstimate} // or match()
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 250 }}
    className="mt-4 px-6 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400"
    disabled={loading}
    >
    {loading ? 'Thinking...' : 'Estimate'} // or 'Match Me'
    </motion.button>


        {response && (
            <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded whitespace-pre-wrap">
            {response}
            </div>
        )}
        </div>
    );
}
