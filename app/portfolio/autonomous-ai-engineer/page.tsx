import { ProjectDetail } from '@/components/ProjectDetail';

export default function AutonomousEngineerPage() {
  return (
    <ProjectDetail
      title="Autonomous AI Engineer"
      tech={['llama.cpp', 'FAISS', 'Flask', 'Vanilla JS', 'PyTorch', 'Markdown', 'HTML/CSS']}
      content={`
💾 **Reflexive Memory Architecture** — Logs, chunks, vectorizes and retrieves context-aware memory.

🧠 **Self-Evolving Logic** — Learns from past decisions and regenerates outdated logic.

📂 **File-Context Prompts** — Injects scoped memory dynamically during development.

🔍 **Offline Vector Store** — FAISS-backed memory indexed by project, tags, and timestamps.

🚧 In Progress:
Summarization engine, file watchers, intent-based memory routing.

🔗 GitHub: Coming Soon  
🖥️ Local Flask Runtime (pipeline in dev)
      `}
    />
  );
}
