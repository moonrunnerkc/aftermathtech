'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { projects } from '@/data/portfolio';

// Dynamically import motion.div to avoid export * error
const MotionDiv = dynamic(
    () => import('framer-motion').then((mod) => mod.motion.div),
                          { ssr: false }
);

export default function PortfolioPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold mb-6">📁 AI Systems Portfolio</h1>
        <div className="grid gap-6 sm:grid-cols-2">
        {Array.isArray(projects) && projects.map((proj) => (

            <MotionDiv
            key={proj.slug}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300 }}
            >
            <Link
            href={`/portfolio/${proj.slug}`}
            className="block bg-gray-900 border border-gray-700 rounded p-5 hover:bg-gray-800 transition"
            >
            <h2 className="text-2xl font-bold">{proj.title}</h2>
            <p className="text-gray-400 mt-2">{proj.summary}</p>
            <div className="text-sm text-gray-500 mt-2">
            Stack: {proj.tech.join(', ')}
            </div>
            </Link>
            </MotionDiv>
        ))}
        </div>
        </div>
    );
}
