'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen px-6 text-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl font-bold sm:text-6xl text-neon-green drop-shadow-md">
          We Build AI That Works.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-400">
          No fluff. Just code. Scalable, secure, autonomous.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/portfolio"
            className="button-glow text-black bg-neon-green hover:bg-neon-cyan"
          >
            Explore Work
          </Link>
          <Link
            href="/match-me"
            className="button-glow text-black bg-white hover:bg-gray-200"
          >
            Get a Custom Build
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
