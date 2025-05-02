export const projects = [
    {
        slug: 'ad-copy-optimizer',
        title: 'Ad Copy Optimizer',
        summary: 'Rewrite and test ad variations with GPT-4.',
        description: `This system ingests a brand or product description and outputs ad copy variations in multiple tones and formats.
        It uses GPT-4 with prompt chaining to simulate A/B testing logic and user sentiment scoring.

        **Stack:** Next.js, GPT-4 API, Tailwind`,
        tech: ['GPT-4', 'Tailwind', 'OpenAI API'],
    },
    {
        slug: 'quote-generator',
        title: 'AI Quote Generator',
        summary: 'Scoping engine that builds quote proposals from input.',
        description: `Users describe what they want — this tool turns it into:
        - Scope
        - Tech Stack
        - Estimated Time
        - Price Range

        **Stack:** GPT-4, Vercel Serverless`,
        tech: ['GPT-4', 'Vercel Functions', 'Markdown'],
    },
    {
        slug: 'prompt-war-room',
        title: 'Prompt War Room',
        summary: 'Compare GPT personas side-by-side.',
        description: `This tool creates split-screen output from multiple GPT system prompts. Great for testing tone, creativity, and interpretation.

        **Stack:** GPT-4, React State Engine`,
        tech: ['GPT-4', 'App Router', 'Prompt Engineering'],
    }
];
