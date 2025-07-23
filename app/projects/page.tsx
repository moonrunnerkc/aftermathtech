// app/projects/page.tsx
import { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'
import { Project } from './types'

export const metadata: Metadata = {
  title: 'Projects - Aftermath Technologies | Real AI Solutions & Research',
  description: 'Explore Aftermath Technologies\' portfolio of cutting-edge AI research projects from moonrunnerkc including autonomous systems, belief ecology, and memory-persistent architectures.',
  keywords: 'AI research, autonomous systems, belief ecology, sentiment analysis, offline AI, memory persistence, cognitive architecture, moonrunnerkc, Aftermath Technologies',
  openGraph: {
    title: 'Projects - Aftermath Technologies',
    description: 'Discover our cutting-edge AI research and autonomous systems development.',
    type: 'website',
    url: '/projects'
  }
}

// Real project data from moonrunnerkc GitHub repositories
const projects: Project[] = [
  {
    id: '1',
    title: 'Sentinel OS Core',
    category: 'AI Operating Systems',
    description: 'Core module of Sentinel OS - an offline-first, memory-persistent AI operating core for autonomous secure agents in zero-trust environments.',
    longDescription: 'Sentinel OS Core represents a breakthrough in autonomous AI architecture. This system provides a foundational operating core that enables AI agents to operate completely offline while maintaining persistent memory and security in zero-trust environments. The architecture is designed for autonomous decision-making without requiring external connectivity or human intervention.',
    technologies: ['Python', 'AI Architecture', 'Memory Systems', 'Security', 'Autonomous Agents'],
    status: 'In Development',
    client: 'Aftermath Technologies Research',
    duration: 'Ongoing',
    year: '2024',
    impact: {
      'autonomy': '100% offline',
      'security': 'Zero-trust',
      'memory': 'Persistent'
    },
    image: '/api/placeholder/800/600',
    gallery: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
    link: 'https://github.com/moonrunnerkc/sentinel-os-core',
    featured: true
  },
  {
    id: '2',
    title: 'Belief Ecology',
    category: 'Cognitive Architecture',
    description: 'Proprietary cognitive architecture featuring belief mutation, contradiction tracing, and memory ecology for advanced AI reasoning systems.',
    longDescription: 'Belief Ecology is a groundbreaking cognitive architecture that enables AI systems to develop, maintain, and evolve belief systems over time. The system implements sophisticated mechanisms for belief mutation, contradiction detection and resolution, and maintains a dynamic memory ecology that allows for complex reasoning and decision-making processes.',
    technologies: ['Python', 'Cognitive Science', 'Machine Learning', 'Knowledge Representation', 'Reasoning Systems'],
    status: 'Active Research',
    client: 'Aftermath Technologies Research',
    duration: '18 months',
    year: '2024',
    impact: {
      'reasoning': 'Advanced logic',
      'contradictions': 'Auto-resolved',
      'beliefs': 'Self-evolving'
    },
    image: '/api/placeholder/800/600',
    gallery: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
    link: 'https://github.com/moonrunnerkc/belief-ecology',
    featured: true
  },
  {
    id: '3',
    title: 'ChronoCodex',
    category: 'Developer Tools',
    description: 'AI-powered semantic changelog generator and commit explorer that creates intelligent documentation from code evolution.',
    longDescription: 'ChronoCodex revolutionizes how developers understand and document code evolution. Using advanced AI analysis, it generates semantic changelogs that capture not just what changed, but why and how those changes impact the broader system. The commit explorer provides deep insights into development patterns and code evolution over time.',
    technologies: ['Python', 'Natural Language Processing', 'Git Analysis', 'Semantic Analysis', 'Developer Tools'],
    status: 'Beta',
    client: 'Open Source Community',
    duration: '8 months',
    year: '2024',
    impact: {
      'documentation': '+300% quality',
      'insights': 'Semantic analysis',
      'productivity': '+40% dev speed'
    },
    image: '/api/placeholder/800/600',
    gallery: ['/api/placeholder/800/600'],
    link: 'https://github.com/moonrunnerkc/chronocodex',
    featured: false
  },
  {
    id: '4',
    title: 'Recursive Ideology Systems',
    category: 'AI Research',
    description: 'Research on recursive ideological systems and emergent belief ecology within algorithmic platforms and AI decision-making frameworks.',
    longDescription: 'This research project explores how recursive ideological systems emerge and evolve within algorithmic platforms. The study examines how AI systems develop and propagate belief structures, the feedback loops that reinforce or challenge these beliefs, and the emergent properties that arise from complex belief ecologies in artificial intelligence systems.',
    technologies: ['Research', 'Algorithm Analysis', 'Behavioral Science', 'Complex Systems', 'AI Ethics'],
    status: 'Research Phase',
    client: 'Academic Research',
    duration: '24 months',
    year: '2023-2024',
    impact: {
      'insights': 'Novel theories',
      'applications': 'AI safety',
      'publications': 'In progress'
    },
    image: '/api/placeholder/800/600',
    gallery: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
    link: 'https://github.com/moonrunnerkc/recursive-ideology-systems',
    featured: true
  },
  {
    id: '5',
    title: 'Aftermath Technologies Platform',
    category: 'Platform Development',
    description: 'Core platform and infrastructure for Aftermath Technologies\' AI research and development initiatives.',
    longDescription: 'The Aftermath Technologies platform serves as the foundational infrastructure for our AI research and development work. This platform integrates multiple research projects, provides common services for AI development, and serves as a testbed for experimental AI architectures and autonomous systems.',
    technologies: ['Python', 'Platform Architecture', 'Microservices', 'AI Infrastructure', 'Research Tools'],
    status: 'Production',
    client: 'Aftermath Technologies',
    duration: '12 months',
    year: '2024',
    impact: {
      'integration': 'Unified platform',
      'research': 'Accelerated',
      'scalability': 'Enterprise-ready'
    },
    image: '/api/placeholder/800/600',
    gallery: ['/api/placeholder/800/600'],
    link: 'https://github.com/moonrunnerkc/aftermathtech',
    featured: false
  }
]

const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))]
const statuses = ['All', ...Array.from(new Set(projects.map(project => project.status)))]

export default function ProjectsPage() {
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
              Our Projects
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-4">
              Discover our cutting-edge AI research and autonomous systems development from moonrunnerkc.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Real projects building the future of offline-first AI, cognitive architectures, and autonomous reasoning systems.
            </p>
          </div>
        </section>

        {/* GitHub Link Section */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <h3 className="text-xl font-bold text-white">Live from GitHub</h3>
              </div>
              <p className="text-gray-300 mb-4">
                All projects are actively developed and available on GitHub
              </p>
              <a
                href="https://github.com/moonrunnerkc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <span>View All Repositories</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Projects Content */}
        <ProjectsClient 
          projects={projects} 
          categories={categories} 
          statuses={statuses} 
        />
      </div>
    </div>
  )
}