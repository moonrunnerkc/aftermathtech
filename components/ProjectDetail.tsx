'use client';

import React from 'react';

export type ProjectDetailProps = {
  title: string;
  tech: string[];
  content: string;
};

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ title, tech, content }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">{title}</h1>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {tech.map((item, index) => (
          <span
            key={index}
            className="bg-gray-800 text-sm font-mono px-3 py-1 rounded border border-gray-600"
          >
            {item}
          </span>
        ))}
      </div>

      <div
        className="prose prose-invert max-w-none whitespace-pre-wrap text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
      />
    </div>
  );
};
