'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const services = [
    // ... same services array
];

export default function Services() {
    const searchParams = useSearchParams();
    const selected = searchParams.get('match');
    const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        if (selected && scrollRefs.current[selected]) {
            scrollRefs.current[selected]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [selected]);

    return (
        <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold mb-6">🚀 AI Services Built with Real GPT Integration</h1>
        <p className="text-gray-400 mb-10 max-w-xl">
        No slides. No fluff. Everything here is custom-coded, API-integrated, and built to perform. Choose your function, or ask what fits.
        </p>

        <div className="grid gap-8 sm:grid-cols-2">
        {services.map((svc, idx) => (
            <motion.div
            key={idx}
            ref={(el: HTMLDivElement | null) => {
                scrollRefs.current[svc.key] = el;
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:bg-gray-800 transition"
            >
            <h2 className="text-2xl font-bold text-white">{svc.title}</h2>
            <p className="text-green-400 mt-1">{svc.tagline}</p>
            <p className="text-gray-300 mt-4 text-sm leading-relaxed">{svc.description}</p>
            <p className="text-xs text-gray-500 mt-4">{svc.badge}</p>
            </motion.div>
        ))}
        </div>

        <div className="mt-12">
        <Link
        href="/match-me"
        className="inline-block bg-green-500 text-black font-bold px-6 py-3 rounded hover:bg-green-400 transition"
        >
        Not sure what you need? Try Match Me
        </Link>
        </div>
        </div>
    );
}
