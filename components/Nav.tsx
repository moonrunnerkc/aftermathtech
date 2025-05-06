'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/war-room', label: 'War Room' },
  { href: '/estimator', label: 'Estimator' },
  { href: '/match-me', label: 'Match Me' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [gptUp, setGptUp] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkGPT = async () => {
      try {
        const res = await fetch('/api/status/gpt');
        if (isMounted) setGptUp(res.ok);
      } catch {
        if (isMounted) setGptUp(false);
      }
    };

    checkGPT(); // initial
    const interval = setInterval(checkGPT, 60000); // every 60s

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-black/70 border-b border-gray-800">
      <div className="px-6 py-4 flex justify-between items-center text-white">
        {/* Brand + GPT badge */}
        <div className="flex items-center gap-2">
          <Link href="/" className="text-neon-green font-bold text-lg tracking-wide">
            Aftermath Technologies
          </Link>
          {gptUp !== null && (
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                gptUp ? 'bg-neon-green' : 'bg-red-500'
              }`}
              title={gptUp ? 'GPT OK' : 'GPT DOWN'}
            />
          )}
        </div>

        {/* Hamburger toggle (mobile only) */}
        <button className="sm:hidden" onClick={() => setOpen(!open)} aria-label="Toggle Menu">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop links */}
        <div className="hidden sm:flex gap-6 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`pb-1 transition border-b-2 ${
                pathname === href
                  ? 'border-neon-green text-neon-green font-semibold'
                  : 'border-transparent text-gray-400 hover:border-neon-cyan hover:text-neon-cyan'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden px-6 pb-4 flex flex-col gap-4 bg-black/90">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`transition border-b ${
                pathname === href
                  ? 'border-neon-green text-neon-green font-semibold'
                  : 'border-transparent text-gray-400 hover:border-neon-cyan hover:text-neon-cyan'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
