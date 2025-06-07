'use client';

import { ProjectDetail } from '@/components/ProjectDetail';
import Link from 'next/link';
import { FaGithub, FaMedium } from 'react-icons/fa';

export default function BlackboxMindPage() {
  const content = `
🧠 Belief Ecology Engine — Dynamic mental ecosystem where beliefs mutate, compete, and decay naturally.

⚖️ Recursive Contradiction Tracing — Logs failures and their causal chains for deeper correction.

🧬 Contradiction-Formed Identity — System evolves identity based on internal contradictions.

🪞 Meta-Observer Agent — Monitors identity drift, decay, and decision cycles — enabling self-awareness.

🧭 Adaptive Goal Collapse — Lets the system reshape its goals as beliefs shift.

🚧 In Development:
Symbolic logic validator, goal forking engine, introspection graph, and simulated inner voice layer.

🌐 Live Preview: Coming Summer 2025
  `;

  return (
    <div className="text-white px-4 py-12 max-w-4xl mx-auto">
      <ProjectDetail
        title="Blackbox Mind v3: Meta-Cognitive Synthetic Intelligence+"
        tech={[
          'Python',
          'Z3 Theorem Prover',
          'llama.cpp',
          'Neo4j',
          'networkx',
          'matplotlib',
          'graphviz',
          'JSON',
          'SQLite',
        ]}
        content={content}
      />

      <div className="mt-10 flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-400 mb-1">GitHub Repository</p>
          <Link
            href="https://github.com/moonrunnerkc/belief-ecology"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-black font-semibold rounded hover:bg-green-500 transition"
          >
            <FaGithub />
            GitHub Repo
          </Link>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-gray-400 mb-1">Medium Abstract</p>
          <Link
            href="https://medium.com/@bradkinnard/belief-ecology-a-self-regulating-cognitive-memory-architecture-for-autonomous-ai-systems-b113e2f0c36e"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 transition"
          >
            <FaMedium />
            Medium Abstract
          </Link>
        </div>
      </div>
    </div>
  );
}
