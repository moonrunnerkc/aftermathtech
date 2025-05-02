'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const taglines = [
  "Build automations that replace teams.",
  "Deploy systems, not just software.",
  "Turn prompts into platforms.",
  "We build AI you can sell.",
  "GPT is the backend. You are the boss."
];

export default function HomePage() {
  const [line, setLine] = useState('');

  useEffect(() => {
    setLine(taglines[Math.floor(Math.random() * taglines.length)]);
  }, []);

  const cards = [
    { href: '/estimator', title: '🧮 Estimate My Project', desc: 'Describe your idea — get timeline, stack, and pricing.' },
    { href: '/war-room', title: '🧠 Prompt War Room', desc: 'See how different GPT personas respond to the same prompt.' },
    { href: '/portfolio', title: '📁 AI Systems Portfolio', desc: 'Browse interactive builds and prompt-engineered systems.' },
    { href: '/match-me', title: '🔍 Match Me to a Service', desc: 'Tell us what you need — we’ll show what we’d build.' },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
    <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-4xl sm:text-6xl font-bold mb-4">Aftermath Technologies</h1>
    <p className="text-xl text-gray-400 mb-10">{line}</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {cards.map((card) => (
      <motion.div
      key={card.href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
      >
      <Link
      href={card.href}
      className="block p-6 bg-gray-900 border border-gray-700 rounded hover:bg-gray-800 transition"
      >
      <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
      <p>{card.desc}</p>
      </Link>
      </motion.div>
    ))}
    </div>
    </div>
    </div>
  );
}
