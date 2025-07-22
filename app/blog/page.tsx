// app/blog/page.tsx
import { Metadata } from 'next'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Blog - AftermathTech | AI Insights & Technology Updates',
  description: 'Explore the latest insights on offline-first AI technology, machine learning innovations, and the future of artificial intelligence.',
  keywords: 'AI blog, machine learning, offline AI, artificial intelligence, tech insights, AftermathTech',
  openGraph: {
    title: 'Blog - AftermathTech',
    description: 'Explore the latest insights on offline-first AI technology and machine learning innovations.',
    type: 'website',
    url: '/blog'
  }
}

// Mock blog data - in production this would come from a CMS or database
const blogPosts = [
  {
    id: '1',
    title: 'The Future of Offline-First AI',
    excerpt: 'Exploring how AI systems can function independently without constant internet connectivity.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'AftermathTech Team',
    date: '2024-12-15',
    category: 'AI Technology',
    readTime: '5 min read',
    image: '/api/placeholder/600/300'
  },
  {
    id: '2',
    title: 'Machine Learning at the Edge',
    excerpt: 'How edge computing is revolutionizing AI deployment in resource-constrained environments.',
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Dr. Sarah Chen',
    date: '2024-12-10',
    category: 'Edge Computing',
    readTime: '7 min read',
    image: '/api/placeholder/600/300'
  },
  {
    id: '3',
    title: 'Privacy-First AI Solutions',
    excerpt: 'Building AI systems that prioritize user privacy while maintaining high performance.',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    author: 'Mike Rodriguez',
    date: '2024-12-05',
    category: 'Privacy & Security',
    readTime: '6 min read',
    image: '/api/placeholder/600/300'
  }
]

export default function BlogPage() {
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
              AI Insights
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
              Explore the latest insights on offline-first AI technology, machine learning innovations, and the future of artificial intelligence.
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <BlogClient posts={blogPosts} />
      </div>
    </div>
  )
}