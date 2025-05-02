import Link from 'next/link';
import { projects } from '@/data/portfolio';


const projects = [
    {
        slug: 'ad-copy-optimizer',
        title: 'Ad Copy Optimizer',
        summary: 'GPT-powered system that rewrites Facebook/Google ad copy in multiple tones for A/B testing.',
        tech: ['GPT-4', 'Tailwind', 'OpenAI API'],
    },
    {
        slug: 'quote-generator',
        title: 'AI Quote Generator',
        summary: 'Interactive tool that creates scoped proposals based on client language input.',
        tech: ['GPT-4', 'Next.js', 'Serverless'],
    },
    {
        slug: 'prompt-war-room',
        title: 'Prompt War Room',
        summary: 'AI testing arena that lets users pit multiple GPT personas against the same input.',
        tech: ['GPT-4', 'Custom Prompt Stack', 'React'],
    },
];

export default function PortfolioPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold mb-6">📁 AI Systems Portfolio</h1>
        <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((proj) => (
            <Link
            key={proj.slug}
            href={`/portfolio/${proj.slug}`}
            className="block bg-gray-900 border border-gray-700 rounded p-5 hover:bg-gray-800 transition"
            >
            <h2 className="text-2xl font-bold">{proj.title}</h2>
            <p className="text-gray-400 mt-2">{proj.summary}</p>
            <div className="text-sm text-gray-500 mt-2">
            Stack: {proj.tech.join(', ')}
            </div>
            </Link>
        ))}
        </div>
        </div>
    );
}
