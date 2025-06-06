import { ProjectDetail } from '@/components/ProjectDetail';

export default function BlackboxMindPage() {
  return (
    <ProjectDetail
      title="Blackbox Mind v3: Meta-Cognitive Synthetic Intelligence+"
      tech={['Python', 'Z3 Theorem Prover', 'llama.cpp', 'Neo4j', 'networkx', 'matplotlib', 'graphviz', 'JSON', 'SQLite']}
      content={`
🧠 **Belief Ecology Engine** — Dynamic mental ecosystem where beliefs mutate, compete, and decay naturally.

⚖️ **Recursive Contradiction Tracing** — Logs failures and their causal chains for deeper correction.

🧬 **Contradiction-Formed Identity** — System evolves identity based on internal contradictions.

🪞 **Meta-Observer Agent** — Monitors identity drift, decay, and decision cycles — enabling self-awareness.

🧭 **Adaptive Goal Collapse** — Lets the system reshape its goals as beliefs shift.

🚧 In Development:
Symbolic logic validator, goal forking engine, introspection graph, and simulated inner voice layer.

🔗 GitHub: [github.com/moonrunnerkc/belief-ecology](https://github.com/moonrunnerkc/belief-ecology)  
📄 Medium: Belief Ecology Abstract  
🌐 Live Preview: Coming Summer 2025
      `}
    />
  );
}
