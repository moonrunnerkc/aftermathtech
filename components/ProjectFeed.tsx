/**
 * ProjectFeed Component - Mobile-Optimized GitHub Live Feed
 * 
 * Key Mobile Fixes:
 * - Responsive grid layout that works on all screen sizes
 * - Proper container constraints to prevent overflow
 * - Touch-optimized card interactions
 * - Better typography scaling
 * - Improved loading states for mobile
 * - Horizontal scroll for project cards on small screens
 * 
 * File: components/ProjectFeed.tsx
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Star, 
  GitFork, 
  Eye, 
  Calendar, 
  Code, 
  ExternalLink,
  Loader,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  updated_at: string;
  created_at: string;
  topics: string[];
  size: number;
  open_issues_count: number;
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

const ProjectFeed: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Mock data for demonstration (replace with actual GitHub API calls)
  const mockRepos: GitHubRepo[] = [
    {
      id: 1,
      name: "aftermath-ai-core",
      full_name: "aftermathtech/aftermath-ai-core",
      description: "Core AI inference engine with WebAssembly optimization for offline-first processing",
      html_url: "https://github.com/aftermathtech/aftermath-ai-core",
      stargazers_count: 2847,
      forks_count: 342,
      watchers_count: 189,
      language: "Rust",
      updated_at: "2024-01-15T10:30:00Z",
      created_at: "2023-06-01T00:00:00Z",
      topics: ["ai", "webassembly", "rust", "offline", "privacy"],
      size: 15680,
      open_issues_count: 12
    },
    {
      id: 2,
      name: "neural-swarm",
      full_name: "aftermathtech/neural-swarm",
      description: "Distributed AI agent orchestration system for autonomous task completion",
      html_url: "https://github.com/aftermathtech/neural-swarm",
      stargazers_count: 1923,
      forks_count: 267,
      watchers_count: 145,
      language: "TypeScript",
      updated_at: "2024-01-14T15:45:00Z",
      created_at: "2023-08-15T00:00:00Z",
      topics: ["agents", "ai", "typescript", "distributed", "automation"],
      size: 8934,
      open_issues_count: 8
    },
    {
      id: 3,
      name: "wasm-llm-runtime",
      full_name: "aftermathtech/wasm-llm-runtime",
      description: "High-performance WebAssembly runtime for large language models in browsers",
      html_url: "https://github.com/aftermathtech/wasm-llm-runtime",
      stargazers_count: 3156,
      forks_count: 423,
      watchers_count: 234,
      language: "C++",
      updated_at: "2024-01-13T09:20:00Z",
      created_at: "2023-04-20T00:00:00Z",
      topics: ["webassembly", "llm", "browser", "performance", "cpp"],
      size: 12567,
      open_issues_count: 15
    },
    {
      id: 4,
      name: "privacy-first-embeddings",
      full_name: "aftermathtech/privacy-first-embeddings",
      description: "Client-side text and image embeddings with zero data transmission",
      html_url: "https://github.com/aftermathtech/privacy-first-embeddings",
      stargazers_count: 1642,
      forks_count: 198,
      watchers_count: 87,
      language: "Python",
      updated_at: "2024-01-12T14:10:00Z",
      created_at: "2023-09-10T00:00:00Z",
      topics: ["embeddings", "privacy", "ml", "client-side", "python"],
      size: 6789,
      open_issues_count: 6
    }
  ];

  const mockCommits: GitHubCommit[] = [
    {
      sha: "a1b2c3d4",
      commit: {
        message: "Optimize WASM memory allocation for large models",
        author: {
          name: "Brad Kinnard",
          date: "2024-01-15T10:30:00Z"
        }
      },
      html_url: "https://github.com/aftermathtech/aftermath-ai-core/commit/a1b2c3d4"
    },
    {
      sha: "e5f6g7h8",
      commit: {
        message: "Add multi-agent coordination protocols",
        author: {
          name: "AI Researcher",
          date: "2024-01-14T15:45:00Z"
        }
      },
      html_url: "https://github.com/aftermathtech/neural-swarm/commit/e5f6g7h8"
    },
    {
      sha: "i9j0k1l2",
      commit: {
        message: "Implement streaming inference for real-time responses",
        author: {
          name: "Performance Team",
          date: "2024-01-13T09:20:00Z"
        }
      },
      html_url: "https://github.com/aftermathtech/wasm-llm-runtime/commit/i9j0k1l2"
    }
  ];

  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In production, replace with actual GitHub API calls
        setRepos(mockRepos);
        setCommits(mockCommits);
        setLastUpdated(new Date());
      } catch (err) {
        setError('Failed to load GitHub data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f1e05a',
      'Rust': '#dea584',
      'Python': '#3572a5',
      'C++': '#f34b7d',
      'Go': '#00add8',
      'Java': '#b07219',
      'C': '#555555'
    };
    return colors[language] || '#8b5cf6';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const refreshData = () => {
    setRepos([]);
    setCommits([]);
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRepos(mockRepos);
        setCommits(mockCommits);
        setLastUpdated(new Date());
      } catch (err) {
        setError('Failed to refresh data');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Failed to Load Projects</h3>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          onClick={refreshData}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white rounded-lg font-medium transition-all min-h-[44px]"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Header with Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold text-sm sm:text-base">LIVE</span>
          </div>
          <span className="text-gray-400 text-sm sm:text-base">GitHub Activity</span>
        </div>
        
        {lastUpdated && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <button
              onClick={refreshData}
              className="p-1 hover:text-cyan-400 transition-colors"
              aria-label="Refresh data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <Loader className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading GitHub projects...</p>
        </div>
      )}

      {/* Projects Grid - Mobile Responsive */}
      {!isLoading && repos.length > 0 && (
        <div className="space-y-6 sm:space-y-8">
          {/* Repository Cards */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <Github className="w-5 h-5" />
              Active Repositories
            </h4>
            
            {/* Mobile: Horizontal scroll, Desktop: Grid */}
            <div className="sm:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {repos.map((repo, index) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-none w-80 max-w-[90vw] snap-start"
                  >
                    <RepositoryCard repo={repo} getLanguageColor={getLanguageColor} formatDate={formatDate} />
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Desktop Grid */}
            <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-6">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <RepositoryCard repo={repo} getLanguageColor={getLanguageColor} formatDate={formatDate} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Commits - Mobile Optimized */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <Code className="w-5 h-5" />
              Recent Commits
            </h4>
            
            <div className="space-y-3 sm:space-y-4">
              {commits.map((commit, index) => (
                <motion.div
                  key={commit.sha}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-4 sm:p-6 hover:border-cyan-400/40 transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm sm:text-base leading-relaxed mb-2 break-words">
                        {commit.commit.message}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                        <span className="font-medium">{commit.commit.author.name}</span>
                        <span>•</span>
                        <span>{formatDate(commit.commit.author.date)}</span>
                        <span className="hidden sm:inline">•</span>
                        <code className="hidden sm:inline bg-gray-700/50 px-2 py-1 rounded text-xs">
                          {commit.sha.substring(0, 7)}
                        </code>
                      </div>
                    </div>
                    
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium self-start sm:self-center"
                    >
                      <span className="hidden sm:inline">View</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Stats */}
          <div className="text-center py-6 sm:py-8 border-t border-cyan-500/20">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400">
                  {repos.reduce((acc, repo) => acc + repo.stargazers_count, 0).toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Total Stars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400">
                  {repos.reduce((acc, repo) => acc + repo.forks_count, 0).toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Total Forks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-pink-400">{repos.length}</div>
                <div className="text-xs sm:text-sm text-gray-400">Active Repos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-400">
                  {repos.reduce((acc, repo) => acc + repo.open_issues_count, 0)}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Open Issues</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Separate Repository Card Component for better organization
interface RepositoryCardProps {
  repo: GitHubRepo;
  getLanguageColor: (language: string) => string;
  formatDate: (dateString: string) => string;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo, getLanguageColor, formatDate }) => (
  <div className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-4 sm:p-6 hover:border-cyan-400/40 transition-all duration-300 group h-full flex flex-col">
    {/* Header */}
    <div className="flex items-start justify-between mb-3 sm:mb-4">
      <div className="min-w-0 flex-1">
        <h5 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
          {repo.name}
        </h5>
        <p className="text-xs sm:text-sm text-gray-400 truncate">{repo.full_name}</p>
      </div>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 p-2 text-gray-400 hover:text-cyan-400 transition-colors"
        aria-label="View on GitHub"
      >
        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
    </div>

    {/* Description */}
    <p className="text-sm sm:text-base text-gray-300 mb-4 flex-1 leading-relaxed">
      {repo.description}
    </p>

    {/* Topics */}
    {repo.topics.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-4">
        {repo.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/20"
          >
            {topic}
          </span>
        ))}
        {repo.topics.length > 3 && (
          <span className="text-xs px-2 py-1 bg-gray-500/10 text-gray-400 rounded-full border border-gray-500/20">
            +{repo.topics.length - 3}
          </span>
        )}
      </div>
    )}

    {/* Stats */}
    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          <span>{repo.stargazers_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="w-4 h-4" />
          <span>{repo.forks_count.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {repo.language && (
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            <span>{repo.language}</span>
          </div>
        )}
      </div>
    </div>

    {/* Footer */}
    <div className="text-xs text-gray-500 pt-2 border-t border-gray-700/50">
      Updated {formatDate(repo.updated_at)}
    </div>
  </div>
);

export default ProjectFeed;