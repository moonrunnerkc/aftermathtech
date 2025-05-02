import { notFound } from 'next/navigation';
import { projects } from '@/data/portfolio';

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params;

    const project = projects.find((p) => p.slug === slug);
    if (!project) return notFound();

    return (
        <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-400 text-lg mb-6">{project.summary}</p>
        <div className="bg-gray-900 border border-gray-700 p-6 rounded whitespace-pre-wrap">
        {project.description}
        </div>
        </div>
    );
}
