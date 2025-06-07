// app/portfolio/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { projects } from '@/data/portfolio';

function extractUrl(text: string): string {
  const match = text.match(/https?:\/\/[^\s)]+/);
  return match ? match[0] : '#';
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
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
        {project.content.split('\n').map((line, idx) => {
          const trimmed = line.trim();

          if (
            trimmed.startsWith('🔹') ||
            trimmed.startsWith('🧠') ||
            trimmed.startsWith('🚧') ||
            trimmed.startsWith('🌱') ||
            trimmed.startsWith('💾') ||
            trimmed.startsWith('📂') ||
            trimmed.startsWith('🧪') ||
            trimmed.startsWith('🔬') ||
            trimmed.startsWith('🛰️') ||
            trimmed.startsWith('🔐') ||
            trimmed.startsWith('🎯') ||
            trimmed.startsWith('💡') ||
            trimmed.startsWith('🧭') ||
            trimmed.startsWith('🪞') ||
            trimmed.startsWith('⚖️') ||
            trimmed.startsWith('🧬') ||
            trimmed.startsWith('🌐') ||
            trimmed.startsWith('Live') ||
            trimmed.startsWith('Try')
          ) {
            return <p key={idx}>{trimmed}</p>;
          }

          if (
            trimmed.startsWith('GitHub:') ||
            trimmed.startsWith('Medium:')
          ) {
            const label = trimmed.startsWith('GitHub:') ? 'GitHub Repo' : 'Medium Article';
            return (
              <p key={idx} className="mt-4">
                <a
                  href={extractUrl(trimmed)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-600 text-black font-semibold rounded hover:bg-green-500 transition"
                >
                  🔗 {label}
                </a>
              </p>
            );
          }

          return trimmed ? <p key={idx}>{trimmed}</p> : null;
        })}

        {project.usage && (
          <div className="mt-8 p-4 bg-gray-900 border border-gray-700 rounded">
            <h3 className="text-lg font-bold mb-2 text-neon-cyan">🛠 How to Use</h3>
            <p className="whitespace-pre-line text-gray-300">{project.usage}</p>
          </div>
        )}
      </article>
    </div>
  );
}
