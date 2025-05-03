'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type Service = {
    key: string;
    title: string;
    tagline: string;
    description: string;
    badge: string;
};

const services: Service[] = [
    {
        key: 'GPT-powered automation',
        title: 'GPT-powered automation',
        tagline: 'Eliminate bottlenecks with intelligent agents.',
        description: 'Automate lead routing, onboarding, and backend ops with GPT-4. You define the friction — we build the agent.',
        badge: '#GPT-4 #Automation #Custom',
    },
    {
        key: 'AI ad systems',
        title: 'AI ad systems',
        tagline: 'Smarter ad variations. Higher conversions.',
        description: 'We use GPT to generate and A/B test high-volume ad variants tuned to your niche and CTR goals.',
        badge: '#PaidMedia #AutoVariants #RealtimeGPT',
    },
    {
        key: 'AI eCommerce builder',
        title: 'AI eCommerce builder',
        tagline: 'Build smarter stores, not templates.',
        description: 'We create GPT-trained product copy, smart bundles, and dynamic landing flows that adapt to user behavior.',
        badge: '#eCom #NoTemplate #AIUX',
    },
    {
        key: 'Content rewriting engine',
        title: 'Content rewriting engine',
        tagline: 'Take one idea, make 50 assets.',
        description: 'Drop your article, podcast, or idea — we give you threads, ads, product pages, and SEO-boosted variants.',
        badge: '#ContentRepurpose #MultiChannel',
    },
    {
        key: 'Custom GPT agent development',
        title: 'Custom GPT agent development',
        tagline: 'Your own AI with a job description.',
        description: 'Train a GPT to work like a staff member — schedule-driven, goal-aligned, and task-executing on your stack.',
        badge: '#Agents #AutoOps #Trainable',
    },
    {
        key: 'AI funnel builder',
        title: 'AI funnel builder',
        tagline: 'Turn raw traffic into optimized sequences.',
        description: 'From email to checkout — every interaction in the funnel is generated and tested by a custom AI layer.',
        badge: '#Funnels #Optimized #AIUX',
    },
    {
        key: 'Prompt-engineered content campaigns',
        title: 'Prompt-engineered content campaigns',
        tagline: 'One prompt. Massive reach.',
        description: 'We engineer base prompts that scale into dozens of consistent outputs across formats and platforms.',
        badge: '#PromptStrategy #ContentSystems',
    },
    {
        key: 'Realtime chat-based lead capture',
        title: 'Realtime chat-based lead capture',
        tagline: 'Forms are dead. Conversations close.',
        description: 'Convert visits with GPT-powered chat that asks, qualifies, routes, and logs — no scripts, no forms.',
        badge: '#ConversationalAI #Leads',
    },
    {
        key: 'AI document analysis',
        title: 'AI document analysis',
        tagline: 'Let GPT scan your docs and make them useful.',
        description: 'Upload PDFs, contracts, SOPs — we embed them and build searchable GPT interfaces that understand context.',
        badge: '#Docs #Embeddings #SearchGPT',
    },
    {
        key: 'Persona-matched GPT agents',
        title: 'Persona-matched GPT agents',
        tagline: 'Train GPT to match a tone, voice, or brand persona.',
        description: 'We fine-tune GPT responses to match specific tones: aggressive sales, helpful coach, skeptical expert, and more.',
        badge: '#ToneControl #VoiceTuning',
    },
];

export default function ServicesPage() {
    const searchParams = useSearchParams();
    const selected = searchParams.get('match');
    const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [highlighted, setHighlighted] = useState<string | null>(null);

    useEffect(() => {
        if (selected) {
            console.log('Selected match:', selected);
            setTimeout(() => {
                const ref = scrollRefs.current[selected];
                console.log('Scroll ref:', ref);
                if (ref) {
                    ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setHighlighted(selected);
                }
            }, 500); // delay ensures DOM is ready
        }
    }, [selected]);

    return (
        <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold mb-6">🚀 AI Services Built with Real GPT Integration</h1>
        <p className="text-gray-400 mb-10 max-w-xl">
        No slides. No fluff. Everything here is custom-coded, API-integrated, and built to perform. Choose your function, or ask what fits.
        </p>

        <div className="grid gap-8 sm:grid-cols-2">
        {services.map((svc, idx) => {
            const isHighlighted = highlighted === svc.key;
            return (
                <motion.div
                key={idx}
                ref={(el: HTMLDivElement | null) => {
                    scrollRefs.current[svc.key] = el;
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`bg-gray-900 border rounded-xl p-6 transition ${
                    isHighlighted
                    ? 'border-green-500 ring-2 ring-green-400'
                    : 'border-gray-700 hover:bg-gray-800'
                }`}
                >
                <h2 className="text-2xl font-bold text-white">{svc.title}</h2>
                <p className="text-green-400 mt-1">{svc.tagline}</p>
                <p className="text-gray-300 mt-4 text-sm leading-relaxed">{svc.description}</p>
                <p className="text-xs text-gray-500 mt-4">{svc.badge}</p>
                </motion.div>
            );
        })}
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
