export const projects = [
    {
        slug: 'killgrid',
        title: 'KillGrid — Autonomous Orbital Threat Detection',
        summary: 'Detects satellite proximity threats, predicts collisions, and runs entirely containerized with a live dashboard.',
        tech: ['Node.js', 'Docker', 'Realtime AI', 'Custom Dashboard'],
        content: `
        KillGrid is an autonomous orbital threat detection system.

        🔹 Detects real-time satellite proximity threats
        🔹 Predicts future collisions (T+60s)
        🔹 Fully containerized with a live, encrypted dashboard
        🔹 Requires zero backend — runs anywhere

        A live preview of the system is here:
        🌐 [KillGrid Live](https://lnkd.in/g5p7qsk4)
        `,
    },
    {
        slug: 'estimator',
        title: 'Aftermath Estimator',
        summary: 'GPT-powered tool that scopes projects from idea to MVP — estimates time, cost, stack, and skillset on the fly.',
        tech: ['Next.js', 'GPT-4', 'Tailwind', 'API Routing'],
        content: `
        Aftermath Estimator is an AI tool that turns raw project ideas into scoped MVP builds.

        🔹 Estimates cost, time, stack, and skills needed
        🔹 Uses GPT-4 with tuned system prompt
        🔹 Fully responsive, real-time output
        🔹 Powered by OpenAI's chat completions API
        `,
    },
    {
        slug: 'war-room',
        title: 'Persona War Room',
        summary: 'An AI testing ground that runs your prompt through strategist, visionary, and critic GPT personas.',
        tech: ['Next.js', 'OpenAI API', 'Framer Motion', 'Custom Prompt Chains'],
        content: `
        The Persona War Room is a prompt evaluation battleground.

        🔹 Submit any idea or question
        🔹 GPT responds in 3 distinct personas: Strategist, Visionary, Critic
        🔹 Built to test tone, argument strength, and AI-driven feedback loops
        `,
    },
    {
        slug: 'match-me',
        title: 'Match Me GPT',
        summary: 'Auto-suggests the most relevant service based on your business need.',
        tech: ['GPT-4', 'Next.js', 'SearchParams', 'Dynamic Redirects'],
        content: `
        Match Me is a GPT-powered intake engine.

        🔹 Asks what you're trying to do
        🔹 GPT maps it to a specific service
        🔹 Auto-redirects with scroll-to-highlight UI
        🔹 Normalized fuzzy match and GPT validation
        `,
    }
];
