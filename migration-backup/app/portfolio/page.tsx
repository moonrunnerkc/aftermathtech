// app/portfolio/page.tsx

import { projects } from '@/data/portfolio';
import Link from 'next/link';

export const metadata = {
  title: 'Portfolio – Aftermath Technologies',
  description: 'Projects and tools built by Brad Kinnard – AI Architect and Software Engineer.',
};

export default function PortfolioPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold text-neon-green mb-12 text-center">
        Portfolio
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 border border-gray-800 shadow-lg hover:shadow-neon-green transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-neon-cyan mb-2">
              {project.title}
            </h2>
            <p className="text-gray-300 mb-4">{project.summary}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-800 text-sm px-3 py-1 rounded-full text-gray-400 border border-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto">
              <Link
                href={`/portfolio/${project.slug}`}
                className="inline-block mt-4 px-4 py-2 bg-neon-green text-black font-semibold rounded hover:bg-neon-cyan transition"
              >
                View Project
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
