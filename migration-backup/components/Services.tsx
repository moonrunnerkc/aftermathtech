'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { services } from '@/data/services';

export default function Services() {
  const searchParams = useSearchParams();
  const selected = searchParams?.get('match')?.toLowerCase();
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (selected && scrollRefs.current[selected]) {
      setTimeout(() => {
        scrollRefs.current[selected]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, [selected]);

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-10">
      <h1 className="text-center text-4xl font-bold mb-10 text-neon-green">🚀 AI Services</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => {
          const isMatch = selected === svc.slug.toLowerCase();

          return (
            <div
              key={svc.slug}
              ref={(el) => {
                scrollRefs.current[svc.slug.toLowerCase()] = el;
              }}
              
              className={`card transition-all duration-300 ${
                isMatch
                  ? 'border-neon-green animate-pulse'
                  : 'hover:border-neon-cyan'
              }`}
            >
              <h2 className="text-xl font-semibold text-white mb-2">{svc.title}</h2>
              <p className="text-sm text-gray-300 mb-2">{svc.description}</p>
              <ul className="text-xs text-gray-500 list-disc list-inside">
                {svc.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
