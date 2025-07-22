'use client';

import { ProjectDetail } from '@/components/ProjectDetail';
import { projects } from '@/data/portfolio';
import Link from 'next/link';
import { FaGithub, FaMedium } from 'react-icons/fa';

export default function BeliefEcologyPage() {
  const project = projects.find((p) => p.slug === 'belief-ecology');

  if (!project) return <div className="text-red-500">Project not found.</div>;

  return (
    <div className="text-white px-4 py-12 max-w-4xl mx-auto">
      <ProjectDetail
        title={project.title}
        tech={project.tech}
        content={project.content}
      />

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {project.github && (
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">GitHub</p>
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-black font-semibold rounded hover:bg-green-500 transition"
            >
              <FaGithub />
              GitHub Repo
            </Link>
          </div>
        )}

        {project.medium && (
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Medium</p>
            <Link
              href={project.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 transition"
            >
              <FaMedium />
              Medium Abstract
            </Link>
          </div>
        )}
      </div>

      {project.usage && (
        <div className="mt-12 border-t border-gray-700 pt-8">
          <h3 className="text-xl font-semibold text-neon-cyan mb-2">🛠 How to Use</h3>
          <p className="whitespace-pre-line text-gray-300">{project.usage}</p>
        </div>
      )}
    </div>
  );
}
