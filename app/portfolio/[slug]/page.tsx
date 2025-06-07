import { notFound } from 'next/navigation';
import { projects } from '@/data/portfolio';

type ProjectParams = {
  params: {
    slug: string;
  };
};

// Ensure URL extraction works for any line with a raw link
function extractUrl(text: string): string {
  const match = text.match(/https?:\/\/[^\s)]+/);
  return match ? match[0] : '#';
}

// ✅ Static route generation
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// ✅ Main render component (non-async, typed properly)
export default function Page({ params }: { params: { slug: string } })
{
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
        {project.content.split('\n').map((line, idx) => {
          const trimmed = line.trim();

          // 🧠 Filter for common bullet lines
          if (
            ['🔹', '🧠', '🚧', '🌱', '💾', '📂', '🔬', '🛰️', '🎯', '🔐'].some((symbol) =>
              trimmed.startsWith(symbol)
            )
          ) {
            return <p key={idx}>{trimmed}</p>;
          }

          // 🌐 Render external links as buttons
          if (
            trimmed.startsWith('🌐') ||
            trimmed.startsWith('Live') ||
            trimmed.startsWith('Try') ||
            trimmed.startsWith('GitHub:') ||
            trimmed.startsWith('Medium:')
          ) {
            return (
              <p key={idx} className="mt-4">
                <a
                  href={extractUrl(trimmed)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-600 text-black font-semibold rounded hover:bg-green-500 transition"
                >
                  🔗{' '}
                  {trimmed.startsWith('GitHub')
                    ? 'GitHub Repo'
                    : trimmed.startsWith('Medium')
                    ? 'Medium Article'
                    : 'Visit Project'}
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
