'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

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

export default function Services() {
    const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const searchParams = useSearchParams();
    const selected = searchParams.get('match');

    useEffect(() => {
        if (!selected) return;

        const el = scrollRefs.current[selected];
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
    }, [selected]);

    return (
        <div className="min-h-screen bg-black text-white px-6 py-12">
        <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">🔧 AI-Powered Services</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
        Every service here is GPT-integrated, container-ready, and battle-tested for deployment. If you don’t see what you need — prompt me.
        </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
        {services.map((svc) => (
            <div
            key={svc.key}
            ref={(el) => {
                scrollRefs.current[svc.key] = el;
            }}

            className={`border border-gray-800 p-6 rounded bg-gray-900 hover:bg-gray-800 transition
                ${svc.key === selected ? 'border-green-500 ring-2 ring-green-500' : ''}`}
                >
                <h2 className="text-2xl font-bold mb-1">{svc.title}</h2>
                <p className="text-sm text-gray-400 mb-2">{svc.tagline}</p>
                <p className="text-gray-300 text-sm">{svc.description}</p>
                <div className="text-xs text-green-400 mt-3">{svc.badge}</div>
                </div>
        ))}
        </div>
        </div>
    );
}
