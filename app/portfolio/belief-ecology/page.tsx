import { ProjectDetail } from '@/components/ProjectDetail';

export default function BeliefEcologyPage() {
  return (
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

🔗 GitHub: [github.com/moonrunnerkc/belief-ecology](https://github.com/moonrunnerkc/belief-ecology)  
📄 Medium Abstract - https://medium.com/@bradkinnard/belief-ecology-a-self-regulating-cognitive-memory-architecture-for-autonomous-ai-systems-b113e2f0c36e 
🌐 Visual Demo Coming Summer 2025
      `}
    />
  );
}
