'use client';

import { ProjectDetail } from '@/components/ProjectDetail';
import Link from 'next/link';
import { FaLink } from 'react-icons/fa';

export default function BlackboxMindPage() {
  return (
    <div>
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
        content={`
🧠 **Belief Ecology Engine** — Dynamic mental ecosystem where beliefs mutate, compete, and decay naturally.

⚖️ **Recursive Contradiction Tracing** — Logs failures and their causal chains for deeper correction.

🧬 **Contradiction-Formed Identity** — System evolves identity based on internal contradictions.

🪞 **Meta-Observer Agent** — Monitors identity drift, decay, and decision cycles — enabling self-awareness.

🧭 **Adaptive Goal Collapse** — Lets the system reshape its goals as beliefs shift.

🚧 In Development:  
Symbolic logic validator, goal forking engine, introspection graph, and simulated inner voice layer.

🌐 Live Preview: Coming Summer 2025
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
