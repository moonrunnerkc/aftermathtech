// app/resources/page.tsx
import { Metadata } from 'next'
import ResourcesClient from './ResourcesClient'

export const metadata: Metadata = {
  title: 'Resources - AftermathTech | AI Learning & Development Tools',
  description: 'Access comprehensive AI resources, documentation, tutorials, and tools for offline-first AI development and implementation.',
  keywords: 'AI resources, machine learning tutorials, offline AI documentation, developer tools, AI guides, AftermathTech resources',
  openGraph: {
    title: 'Resources - AftermathTech',
    description: 'Comprehensive resources for AI development and offline-first solutions.',
    type: 'website',
    url: '/resources'
  }
}

// Mock resources data - in production this would come from a CMS or database
const resources = [
  {
    id: '1',
    title: 'Offline AI Development Guide',
    type: 'Guide',
    category: 'Documentation',
    description: 'Complete guide to building AI systems that work without internet connectivity.',
    content: 'Learn the fundamentals of creating robust AI applications that can operate independently of network connections.',
    downloadUrl: '/downloads/offline-ai-guide.pdf',
    size: '2.5 MB',
    pages: 45,
    lastUpdated: '2024-01-15',
    featured: true,
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    tags: ['AI', 'Offline', 'Development', 'Guide']
  },
  {
    id: '2',
    title: 'Edge Computing Best Practices',
    type: 'Whitepaper',
    category: 'Research',
    description: 'Research paper on optimizing AI models for edge computing environments.',
    content: 'Comprehensive analysis of edge computing strategies and their implementation in AI systems.',
    downloadUrl: '/downloads/edge-computing-whitepaper.pdf',
    size: '1.8 MB',
    pages: 32,
    lastUpdated: '2024-01-10',
    featured: true,
    difficulty: 'Advanced',
    estimatedTime: '1-2 hours',
    tags: ['Edge Computing', 'Research', 'Optimization']
  },
  {
    id: '3',
    title: 'Machine Learning Model Compression Toolkit',
    type: 'Tool',
    category: 'Software',
    description: 'Python toolkit for compressing ML models for offline deployment.',
    content: 'Open-source tools and utilities for reducing model size while maintaining accuracy.',
    downloadUrl: '/downloads/ml-compression-toolkit.zip',
    size: '15.2 MB',
    pages: null,
    lastUpdated: '2024-01-20',
    featured: false,
    difficulty: 'Advanced',
    estimatedTime: '30 minutes setup',
    tags: ['Python', 'Tools', 'Compression', 'Open Source']
  },
  {
    id: '4',
    title: 'Getting Started with TensorFlow Lite',
    type: 'Tutorial',
    category: 'Education',
    description: 'Step-by-step tutorial for deploying TensorFlow models on mobile devices.',
    content: 'Hands-on tutorial covering model conversion, optimization, and mobile deployment.',
    downloadUrl: '/tutorials/tensorflow-lite-tutorial',
    size: '850 KB',
    pages: 28,
    lastUpdated: '2024-01-12',
    featured: false,
    difficulty: 'Beginner',
    estimatedTime: '45 minutes',
    tags: ['TensorFlow', 'Mobile', 'Tutorial', 'Beginner']
  },
  {
    id: '5',
    title: 'AI Privacy and Security Framework',
    type: 'Framework',
    category: 'Security',
    description: 'Comprehensive framework for implementing privacy-preserving AI systems.',
    content: 'Guidelines and implementation strategies for secure, privacy-first AI applications.',
    downloadUrl: '/downloads/ai-privacy-framework.pdf',
    size: '3.1 MB',
    pages: 56,
    lastUpdated: '2024-01-18',
    featured: true,
    difficulty: 'Intermediate',
    estimatedTime: '3-4 hours',
    tags: ['Privacy', 'Security', 'Framework', 'Best Practices']
  },
  {
    id: '6',
    title: 'Offline Data Synchronization Patterns',
    type: 'Guide',
    category: 'Architecture',
    description: 'Design patterns for handling data sync in offline-first applications.',
    content: 'Architectural patterns and strategies for robust offline data management.',
    downloadUrl: '/downloads/data-sync-patterns.pdf',
    size: '1.9 MB',
    pages: 38,
    lastUpdated: '2024-01-08',
    featured: false,
    difficulty: 'Intermediate',
    estimatedTime: '2 hours',
    tags: ['Architecture', 'Data Sync', 'Patterns', 'Design']
  },
  {
    id: '7',
    title: 'AI Model Performance Benchmarking Tool',
    type: 'Tool',
    category: 'Software',
    description: 'Benchmarking suite for evaluating AI model performance across different devices.',
    content: 'Comprehensive testing tools for measuring model performance, speed, and resource usage.',
    downloadUrl: '/downloads/performance-benchmarking-tool.zip',
    size: '8.7 MB',
    pages: null,
    lastUpdated: '2024-01-22',
    featured: false,
    difficulty: 'Intermediate',
    estimatedTime: '1 hour setup',
    tags: ['Benchmarking', 'Performance', 'Testing', 'Tools']
  },
  {
    id: '8',
    title: 'Case Study: Manufacturing AI Implementation',
    type: 'Case Study',
    category: 'Research',
    description: 'Detailed case study of implementing offline AI in manufacturing environments.',
    content: 'Real-world implementation details, challenges, and solutions for manufacturing AI.',
    downloadUrl: '/downloads/manufacturing-case-study.pdf',
    size: '2.8 MB',
    pages: 42,
    lastUpdated: '2024-01-14',
    featured: false,
    difficulty: 'Intermediate',
    estimatedTime: '1.5 hours',
    tags: ['Case Study', 'Manufacturing', 'Implementation', 'Real-world']
  }
]

const categories = ['All', ...Array.from(new Set(resources.map(resource => resource.category)))]
const types = ['All', ...Array.from(new Set(resources.map(resource => resource.type)))]
const difficulties = ['All', ...Array.from(new Set(resources.map(resource => resource.difficulty)))]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Resources
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
              Access comprehensive guides, tools, and documentation to accelerate your offline-first AI development journey.
            </p>
          </div>
        </section>

        {/* Resources Content */}
        <ResourcesClient 
          resources={resources} 
          categories={categories} 
          types={types}
          difficulties={difficulties}
        />
      </div>
    </div>
  )
}