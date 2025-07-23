// app/resources/ResourcesClient.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Resource {
  id: string
  title: string
  type: string
  category: string
  description: string
  content: string
  downloadUrl: string
  size: string
  pages: number | null
  lastUpdated: string
  featured: boolean
  difficulty: string
  estimatedTime: string
  tags: string[]
}

interface ResourcesClientProps {
  resources: Resource[]
  categories: string[]
  types: string[]
  difficulties: string[]
}

export default function ResourcesClient({ resources, categories, types, difficulties }: ResourcesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredResources, setFilteredResources] = useState(resources)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  useEffect(() => {
    let filtered = resources

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(resource => resource.category === selectedCategory)
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(resource => resource.type === selectedType)
    }

    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(resource => resource.difficulty === selectedDifficulty)
    }

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredResources(filtered)
  }, [selectedCategory, selectedType, selectedDifficulty, searchTerm, resources])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'intermediate':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'advanced':
        return 'text-red-400 bg-red-500/20 border-red-500/30'
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'guide': return '📖'
      case 'tutorial': return '🎓'
      case 'tool': return '🔧'
      case 'whitepaper': return '📄'
      case 'framework': return '🏗️'
      case 'case study': return '📊'
      default: return '📋'
    }
  }

  const handleDownload = (resource: Resource) => {
    // In a real application, this would trigger the actual download
    console.log(`Downloading: ${resource.title}`)
    
    // Analytics tracking could be added here
    // trackDownload(resource.id, resource.type)
  }

  const ResourceCard = ({ resource, index }: { resource: Resource; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group ${
        resource.featured ? 'ring-1 ring-cyan-500/20' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getTypeIcon(resource.type)}</span>
          <div>
            <span className="text-cyan-400 text-sm font-medium">{resource.type}</span>
            {resource.featured && (
              <span className="ml-2 inline-block px-2 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-medium rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(resource.difficulty)}`}>
          {resource.difficulty}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
        {resource.title}
      </h3>

      <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
        {resource.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-slate-700/50 text-cyan-300 text-xs rounded border border-slate-600"
          >
            {tag}
          </span>
        ))}
        {resource.tags.length > 3 && (
          <span className="px-2 py-1 bg-slate-700/50 text-gray-400 text-xs rounded border border-slate-600">
            +{resource.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-400">
        <div>
          <span className="block">Size: {resource.size}</span>
          {resource.pages && <span className="block">{resource.pages} pages</span>}
        </div>
        <div>
          <span className="block">Time: {resource.estimatedTime}</span>
          <span className="block">Updated: {new Date(resource.lastUpdated).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <motion.button
          onClick={() => setSelectedResource(resource)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-4 py-2 bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-600 transition-all"
        >
          View Details
        </motion.button>
        <motion.button
          onClick={() => handleDownload(resource)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download
        </motion.button>
      </div>
    </motion.div>
  )

  return (
    <main className="px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-800/50 text-gray-300 hover:text-white hover:bg-slate-700/50 border border-slate-700'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Type</h3>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <motion.button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedType === type
                        ? 'bg-purple-500 text-white'
                        : 'bg-slate-800/50 text-gray-300 hover:text-white hover:bg-slate-700/50 border border-slate-700'
                    }`}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Difficulty</h3>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <motion.button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDifficulty === difficulty
                        ? 'bg-pink-500 text-white'
                        : 'bg-slate-800/50 text-gray-300 hover:text-white hover:bg-slate-700/50 border border-slate-700'
                    }`}
                  >
                    {difficulty}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center text-gray-400">
            <span className="font-medium text-white">{filteredResources.length}</span> resources found
          </div>
        </motion.div>

        {/* Resources Grid */}
        <AnimatePresence mode="wait">
          {filteredResources.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${selectedType}-${selectedDifficulty}-${searchTerm}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-gray-400 text-lg mb-4">No resources found</div>
              <p className="text-gray-500">
                Try adjusting your search terms or filters to see more resources.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resource Detail Modal */}
        <AnimatePresence>
          {selectedResource && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedResource(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getTypeIcon(selectedResource.type)}</span>
                        <span className="text-cyan-400 font-medium">{selectedResource.type}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(selectedResource.difficulty)}`}>
                          {selectedResource.difficulty}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedResource.title}</h2>
                      <p className="text-gray-400">{selectedResource.category}</p>
                    </div>
                    <button
                      onClick={() => setSelectedResource(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Description</h3>
                      <p className="text-gray-300 leading-relaxed">{selectedResource.content}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-white mb-2">Resource Details</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                          <div>Size: {selectedResource.size}</div>
                          {selectedResource.pages && <div>Pages: {selectedResource.pages}</div>}
                          <div>Estimated Time: {selectedResource.estimatedTime}</div>
                          <div>Last Updated: {new Date(selectedResource.lastUpdated).toLocaleDateString()}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedResource.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-slate-700/50 text-cyan-300 text-xs rounded border border-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-slate-700">
                      <motion.button
                        onClick={() => handleDownload(selectedResource)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Resource
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-all"
                      >
                        Share
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Newsletter Signup */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-cyan-500/20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Stay Updated with New Resources
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get notified when we publish new guides, tools, and resources for offline-first AI development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.section>
      </div>
    </main>
  )
}