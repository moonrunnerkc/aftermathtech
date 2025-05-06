'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-800 px-6 py-4 flex justify-between items-center text-white">
      <Link href="/" className="text-neon-green font-bold text-lg tracking-wide">
        Aftermath Technologies
      </Link>

      <div className="flex gap-6 text-sm">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`hover:text-neon-cyan transition ${
              pathname === href ? 'text-neon-green font-semibold' : 'text-gray-400'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
