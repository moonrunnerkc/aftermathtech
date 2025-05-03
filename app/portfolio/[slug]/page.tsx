import { notFound } from 'next/navigation';
import { projects } from '@/data/portfolio';

type Props = {
    params: { slug: string };
};

export default function ProjectPage({ params }: Props) {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) return notFound();

    return (
        <div className="max-w-3xl mx-auto py-16 px-6 text-white">
        <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
        <p className="text-gray-400 mb-6">{project.summary}</p>

        <div className="flex flex-wrap gap-2 mb-10">
        {project.tech.map((tech, idx) => (
            <span
            key={idx}
            className="px-3 py-1 rounded-full bg-gray-800 text-sm text-green-400 border border-green-600"
            >
            {tech}
            </span>
        ))}
        </div>

        <article className="prose prose-invert max-w-none prose-p:leading-relaxed prose-a:text-green-400">
        {project.content.split('\n').map((line, idx) =>
            line.startsWith('🔹') ? (
                <p key={idx} className="leading-relaxed">
                {line}
                </p>
            ) : line.startsWith('🌐') ? (
                <p key={idx} className="mt-4">
                <a href={line.replace(/^🌐\s*/, '').trim()} target="_blank" rel="noopener noreferrer">
                🔗 {line.replace(/^🌐\s*/, '').trim()}
                </a>
                </p>
            ) : (
                <p key={idx}>{line}</p>
            )
        )}
        </article>
        </div>
    );
}
