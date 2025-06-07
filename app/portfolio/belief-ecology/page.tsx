'use client';

import { ProjectDetail } from '@/components/ProjectDetail';
import Link from 'next/link';
import { FaLink } from 'react-icons/fa';

export default function BeliefEcologyPage() {
  return (
    <div>
      <ProjectDetail
        title="Belief Ecology: A Self-Regulating Cognitive Memory Architecture"
        tech={['Python', 'Neo4j', 'SQLite', 'networkx', 'matplotlib', 'graphviz']}
        content={`
🌱 **Living Belief Ecosystem** — Beliefs have fitness scores, mutate, decay, and die.

🔁 **Self-Regulation** — Internal conflict and relevance decay rebalance the belief pool.

🧠 **Core of Blackbox v3** — Used in memory substrate and evolving reasoning.

🔬 **Independent Module** — Portable cognitive engine for any autonomous system.

🚧 Upcoming:  
Emotion-weighted reinforcement, entropy models, and ecosystem visualization.

🌐 Visual Demo Coming Summer 2025
        `}
      />

      <div className="flex gap-4 justify-center mt-8">
        <Link
          href="https://github.com/moonrunnerkc/belief-ecology"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2 bg-green-600 text-black font-semibold rounded hover:bg-green-500 transition"
        >
          <FaLink className="mr-2" />
          GitHub Repo
        </Link>
        <Link
          href="https://medium.com/@bradkinnard/belief-ecology-a-self-regulating-cognitive-memory-architecture-for-autonomous-ai-systems-b113e2f0c36e"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2 bg-green-600 text-black font-semibold rounded hover:bg-green-500 transition"
        >
          <FaLink className="mr-2" />
          Medium Abstract
        </Link>
      </div>
    </div>
  );
}
