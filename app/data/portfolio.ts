// data/portfolio.ts

export const projects = [
   {
    slug: 'blackbox-mind-v3',
    title: 'Blackbox Mind v3: Meta-Cognitive Synthetic Intelligence+',
    summary: 'A contradiction-driven cognition engine that evolves its goals, beliefs, and identity — without needing human prompts.',
    tech: ['Python', 'Z3 Theorem Prover', 'llama.cpp', 'Neo4j', 'networkx', 'matplotlib', 'graphviz', 'JSON', 'SQLite'],
    content: `
🧠 Belief Ecology Engine forms a dynamic mental ecosystem where beliefs mutate, compete, and decay naturally.

⚖️ Recursive Contradiction Tracing logs not just failures but the causal chain behind them, enabling long-term correction.

🧬 Contradiction-Formed Identity evolves the system’s personality over time based on which internal battles it wins or loses.

🪞 Meta-Observer Sub-Agent silently monitors identity drift, belief decay, and decision loops — making it self-aware and self-correcting.

🧭 Adaptive Goal Collapse lets it re-prioritize and mutate objectives on its own as belief credibility changes.

🚧 Currently building: Symbolic logic validator, goal forking engine, visual introspection graph, and LLM-simulated inner voice layer.

🌐 Live Preview: Coming soon — full system launch in late Summer 2025
    `,
    github: 'https://github.com/moonrunnerkc/belief-ecology',
    medium: 'https://medium.com/@bradkinnard/belief-ecology-a-self-regulating-cognitive-memory-architecture-for-autonomous-ai-systems-b113e2f0c36e',
    usage: `This project is still in development. Review the GitHub repo for cognitive architecture design. Medium write-up explains the conceptual engine. Deployment will be made available Summer 2025.`,
  },
  {
  slug: 'belief-ecology',
  title: 'Belief Ecology: A Self-Regulating Cognitive Memory Architecture',
  summary: 'A novel cognitive structure where beliefs act like biological entities — evolving, competing, and mutating within an autonomous AI mind.',
  tech: ['Python', 'Neo4j', 'SQLite', 'networkx', 'matplotlib', 'graphviz'],
  content: `
🌱 Living Belief Ecosystem — beliefs are treated as organic units with fitness scores, subject to reinforcement, decay, mutation, and death.

🔁 Self-Regulation — the system rebalances its belief pool over time based on internal conflict, relevance decay, and emotional tags.

🧠 Applied in Blackbox Mind v3 — provides the memory substrate and dynamic reasoning context for identity mutation and contradiction-based learning.

🔬 Independent Architecture — designed to function standalone or integrate into any cognitive AI needing long-term autonomous thought evolution.

🧪 Experimental Belief Mutation — merges and morphs related beliefs into higher-order inferences, building a scaffold for emergent self-modification.

🚧 In development: Emotion-weighted reinforcement logic, decay entropy models, and ecological replay prioritization.

🌐 Live Preview: Coming soon — full demo module with mutation cycles and visualized ecosystem planned for Summer 2025
  `,
  github: 'https://github.com/moonrunnerkc/belief-ecology',
  medium: 'https://medium.com/@bradkinnard/belief-ecology-a-self-regulating-cognitive-memory-architecture-for-autonomous-ai-systems-b113e2f0c36e',
  usage: `Follow the GitHub repo for architecture diagrams and evolving modules. Medium abstract provides background context. Live demos will be pushed in the next release cycle.`,
},
  {
  slug: 'autonomous-ai-engineer',
  title: 'Autonomous AI Engineer',
  summary: 'Autonomous AI engineer with self-structuring memory, reflexive planning, and zero-human reliance.',
  tech: ['llama.cpp', 'FAISS', 'Flask', 'Vanilla JS', 'PyTorch', 'Markdown', 'HTML/CSS'],
  content: `
💾 Reflexive memory architecture — Daily logs are persistently stored, chunked, vectorized, and semantically retrieved for context-aware planning and regeneration.

🧠 Self-evolving logic — Recalls past decisions, codebases, and conversations to refine internal modules and regenerate stale logic over time.

📂 File-context-aware prompts — Injects scoped memory based on current file and intent — no redundant prompt entry.

🔍 Offline vector store — FAISS-based semantic index scoped by project, tag, and timestamp with pruning logic.

🧪 Under construction: Summarization engine, file watchers, and intent-based memory routing.

🌐 Live Preview: Runs locally via Flask dev server — deployment pipeline in development
  `,
  github: '', // Placeholder since link is "Coming soon"
  medium: '', // No Medium link was provided
  usage: `Clone the repo. Launch Flask server. Load a code project. The assistant uses historical logs + semantic vector recall to assist coding sessions. Local-only for now.`,
},
  {
    slug: 'lunarbeacon',
    title: 'LunarBeacon AI',
    summary: 'Satellite signal authentication via lunar reflection modeling + GPT-4.',
    tech: ['FastAPI', 'OpenAI', 'Orbital Physics', 'Geospatial'],
    content: `
🛰️ LunarBeacon AI  
🔹 Authenticates satellite commands using moonlight signal reflections  
🔹 Verifies comms during outages or spoofing  
🔹 Uses GPT-4 + orbital telemetry for intelligent checks  
🔹 Built for defense, satellite, and cybersecurity operations

Live Demo: https://lunarbeacon.netlify.app/
    `,
    usage: `Open the demo and simulate a spoofed satellite signal scenario. The system will validate it using moon position data and return a threat probability.`,
  },
  {
    slug: 'killgrid',
    title: 'KillGrid — Autonomous Orbital Threat Detection',
    summary: 'Detects satellite proximity threats, predicts collisions, and runs containerized with a live dashboard.',
    tech: ['Node.js', 'Docker', 'Realtime AI', 'Custom Dashboard'],
    content: `
🔹 Detects real-time satellite proximity threats  
🔹 Predicts future collisions (T+60s)  
🔹 Fully containerized with a live, encrypted dashboard  
🔹 Requires zero backend — runs anywhere

Live: https://killgrid-ai.netlify.app/
    `,
    usage: `Feed in satellite telemetry and watch real-time proximity events. Collision prediction is shown on the dashboard. Runs locally or via Docker container.`,
  },
  {
    slug: 'neutronvault',
    title: 'NeutronVault',
    summary: 'Pulsar-based encryption for a post-quantum world.',
    tech: ['FastAPI', 'React', 'Tailwind', 'Cryptography'],
    content: `
🔐 NeutronVault  
🔹 Solo-deployable engine using pulsar timing data for entropy  
🔹 Real-time entropy → AES key → secure exchange  
🔹 Verifiable identities, no third-party reliance  
🔹 Offline-capable once seeded

Coming Soon
    `,
    usage: `Deploy the backend. Initialize with pulsar seed entropy. Use the frontend to generate quantum-resilient encryption keys.`,
  },
  {
    slug: 'fridge',
    title: "What's In My Fridge",
    summary: 'A real-time GPT app that recommends meals based on your fridge contents.',
    tech: ['Next.js', 'GPT-4', 'Tailwind'],
    content: `
🧠 GPT-driven cooking assistant  
🔹 Users upload fridge contents image or enter a list — GPT suggests meals  
🔹 Designed to prove real-world AI utility in daily life  
🔹 Built for performance and clarity

Live: https://whats-in-my-fridge-two.vercel.app/
    `,
    usage: `Go to the app. Upload a fridge photo or list ingredients. GPT returns optimized recipe suggestions.`,
  },
  {
    slug: 'promptforge',
    title: 'Promptforge',
    summary: 'Open playground for prompt engineering — forge, preview, and refine prompts live.',
    tech: ['Netlify', 'React', 'OpenAI'],
    content: `
🎯 Prompt prototyping tool  
🔹 Create, store, test, and refine prompts  
🔹 Great for internal prompt tuning and client demos  
🔹 Accessible, fast, and open-source aligned

Live: https://promptforge-app.netlify.app/
    `,
    usage: `Create a new prompt block. Set behavior. Test output across GPT configurations. Ideal for internal dev/testing cycles.`,
  },
  {
    slug: 'estimator',
    title: 'Aftermath Estimator',
    summary: 'GPT-powered tool that scopes projects from idea to MVP — time, cost, stack, skills.',
    tech: ['Next.js', 'GPT-4', 'Tailwind', 'API Routing'],
    content: `
🔹 Estimates cost, time, stack, and skills needed  
🔹 Uses GPT-4 with tuned system prompt  
🔹 Fully responsive, real-time output  
🔹 Powered by OpenAI chat completions API

Try It Now: https://www.aftermathtech.com/estimator
    `,
    usage: `Open the app. Describe your project idea. You’ll get an estimate of dev hours, budget range, tech stack, and required skills.`,
  },
  {
    slug: 'match-me',
    title: 'Match Me GPT',
    summary: 'Auto-suggests the most relevant Aftermath service based on your business need.',
    tech: ['GPT-4', 'Next.js', 'SearchParams', 'Dynamic Redirects'],
    content: `
🔹 Ask GPT what you're trying to build  
🔹 GPT maps it to the right service  
🔹 Auto-scrolls and highlights result  
🔹 Built with fuzzy match + GPT validation

Try It Now: https://www.aftermathtech.com/match-me
    `,
    usage: `Describe your goal — GPT matches it to a specific Aftermath offering. You get redirected + visually scrolled to the right section.`,
  },
];
