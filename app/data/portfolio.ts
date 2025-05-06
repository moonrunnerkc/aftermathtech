export const projects = [
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

🌐 [Coming Soon](https://neutronvault.dev)
    `,
    usage: `NeutronVault is a backend tool. To use:
- Deploy the FastAPI server
- Configure pulsar seed entropy
- Use the dashboard to generate and validate cryptographic keys`,
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

🌐 [Live Demo](https://lunarbeacon.netlify.app/)
    `,
    usage: `Visit the demo. Simulate a command scenario or choose a test pattern.  
LunarBeacon will analyze signal reliability and flag authenticity issues. GPT assists in commentary.`,
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

🌐 [KillGrid Live](https://killgrid-ai.netlify.app/)
    `,
    usage: `Run the dashboard locally or via container.  
Feed in satellite coordinates or simulate orbits.  
Watch real-time threat zones and predicted collision alerts.`,
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

🌐 [Live](https://whats-in-my-fridge-two.vercel.app/)
    `,
    usage: `Upload a photo of your fridge or type your ingredients.  
GPT will return suggested meals based on available items.`,
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

🌐 [Live](https://promptforge-app.netlify.app/)
    `,
    usage: `Write your prompt, choose model behavior, and run it live.  
Use this to prototype responses and share with collaborators.`,
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
    `,
    usage: `Describe your project idea clearly.  
GPT will return an estimate with hours, budget, tech stack, and required skills.`,
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
    `,
    usage: `Just describe your goal (e.g. "I need a pitch deck AI" or "I want to train my own GPT").  
The system maps it to the right Aftermath service and redirects you instantly.`,
  },
];

