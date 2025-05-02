import { notFound } from 'next/navigation';
import { projects } from '@/data/portfolio';

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const data = projects.find((p) => p.slug === params.slug);

    if (!data) return notFound();

    return (
        <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        <p className="text-gray-400 text-lg mb-6">{data.summary}</p>
        <div className="bg-gray-900 border border-gray-700 p-6 rounded whitespace-pre-wrap">
        {data.description}
        </div>
        </div>
    );
}

