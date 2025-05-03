'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const services = [
    {
        key: 'GPT-powered automation',
        title: 'GPT-powered automation',
        tagline: 'Eliminate bottlenecks with intelligent agents.',
        description: 'Custom-built automations using GPT-4 for lead routing, onboarding flows, and backend workflows. You describe the bottleneck, we build the AI that removes it.',
        badge: '#GPT-4 #Automation #NoCode',
    },
    {
        key: 'AI ad systems',
        title: 'AI ad systems',
        tagline: 'Content variation and targeting at scale.',
        description: 'We generate, test, and optimize ads using AI. Think infinite headlines, adaptive targeting, and ROI-driven performance.',
        badge: '#Ads #Multivariate #RealtimeGPT',
    },
    {
        key: 'AI eCommerce builder',
        title: 'AI eCommerce builder',
        tagline: 'Smarter product pages, higher conversions.',
        description: 'AI-generated copy, smart recommendations, and conversion-optimized pages — no templates, just data-driven design from GPT.',
        badge: '#eCommerce #AIUX #SmartStack',
    },
    {
        key: 'AI content rewriting engine',
        title: 'AI content rewriting engine',
        tagline: 'Repurpose content into endless formats.',
        description: 'Blogs into threads. Podcasts into landing pages. Raw ideas into polished campaigns. Fully customized content rewriters built per client.',
        badge: '#Content #Repurpose #Realtime',
    },
    {
        key: 'Custom GPT agent development',
        title: 'Custom GPT agent development',
        tagline: 'Your own AI specialist, trained to act.',
        description: 'We build your AI co-pilot. Trained on your voice, docs, logic. Built to execute and improve autonomously.',
        badge: '#Agents #FineTuning #PrivateGPT',
    },
];

export default function ServicesPage() {
    const searchParams = useSearchParams();
    const selected = searchParams.get('match');
    const scrollRefs = useRef({});

    useEffect(() => {
        if (selected && scrollRefs.current[selected]) {
            scrollRefs.current[selected].scrollIntoView({ behavior: 'smooth', block: 'center' });
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
            ref={(el) => scrollRefs.current[svc.key] = el}
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
