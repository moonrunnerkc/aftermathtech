// app/contact/page.tsx

import Image from 'next/image';

export const metadata = {
  title: 'Contact – Aftermath Technologies',
  description: 'Reach out to Brad Kinnard for AI architecture, software engineering, and custom GPT systems.',
};

export default function ContactPage() {
  return (
    
    <div className="max-w-3xl mx-auto px-6 py-16 text-white space-y-12">
        <center>
      {/* Hero image and heading */}
      <div className="flex flex-col items-center text-center">
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-neon-green mb-6">
          <Image
            src="/custom-ai-gpt.jpeg"
            alt="Brad Kinnard"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-neon-green mb-1">Brad Kinnard</h1>
        <p className="text-gray-400 text-lg">
          AI Architect · Software Engineer · Owner of Aftermath Technologies
        </p>
      </div>

      {/* Contact details */}
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-neon-cyan">📞 Phone</h2>
          <p className="text-gray-300">816-726-6248</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-12 space-y-8 sm:space-y-0">
  {/* Email */}
  <div className="flex-1">
    <h2 className="text-xl font-semibold text-neon-cyan">📧 Email</h2>
    <p className="text-gray-300">
      <a
        href="mailto:brad@aftermathtech.com"
        className="underline hover:text-neon-green"
      >
        brad@aftermathtech.com
      </a>
    </p>
  </div>

  {/* Social */}
  <div className="flex-1">
    <h2 className="text-xl font-semibold text-neon-cyan">🔗 Social</h2>
    <ul className="text-gray-300 space-y-1">
      <li>
        <a
          href="https://www.linkedin.com/in/brad-kinnard/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neon-green"
        >
          LinkedIn
        </a>
      </li>
      <li>
        <a
          href="https://www.facebook.com/aftermathwebdesign/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neon-green"
        >
          Facebook
        </a>
      </li>
    </ul>
  </div>
</div>


        <div>
          <h2 className="text-xl font-semibold text-neon-cyan">🧠 Skills</h2>
          <ul className="text-gray-300 list-disc list-inside">
            <li>AI Architecture & Prompt Engineering</li>
            <li>GPT-4, OpenAI API</li>
            <li>Next.js, React, Tailwind CSS</li>
            <li>FastAPI, Node.js, Docker</li>
            <li>Real-time AI dashboards</li>
            <li>Secure backend infrastructure</li>
            <li>AI product deployment pipelines</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-neon-cyan">🧬 Background</h2>
          <p className="text-gray-300">
            Brad Kinnard is a senior AI systems engineer and founder of Aftermath Technologies.
            With a focus on secure, scalable, real-world GPT deployments, Brad builds everything
            from defense-grade tools like KillGrid to civilian AI services like Match Me and Estimator.
            He operates full-stack with no dependencies and builds high-performance code, fast.
          </p>
        </div>

        <div>
          <a
            href="mailto:brad@aftermathtech.com"
            className="inline-block mt-4 px-6 py-3 bg-neon-green text-black font-semibold rounded hover:bg-neon-cyan transition"
          >
            Send Email
          </a>
        </div>
      </div></center>
    </div>
  );
}
