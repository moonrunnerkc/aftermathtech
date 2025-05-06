'use client';

import { services } from '@/data/services';

export default function ServicesPage() {
  return (
    <div className="bg-black text-white min-h-screen px-6 sm:px-10 py-16">
      <h1 className="text-4xl font-bold text-neon-green text-center mb-12">
        ⚙️ AI Services by Aftermath Technologies
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((svc) => (
          <div
            key={svc.slug}
            className="border border-gray-700 hover:border-neon-green transition p-6 rounded bg-gray-900 shadow-md"
          >
            <h2 className="text-xl font-semibold text-white mb-2">{svc.title}</h2>
            <p className="text-sm text-gray-400 mb-3">{svc.description}</p>
            <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
              {svc.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
