/**
 * ProjectFeed Component - Mobile-Optimized GitHub Live Feed with Real Data
 * 
 * Key Features:
 * - Real GitHub API integration for moonrunnerkc account
 * - Responsive grid layout that works on all screen sizes
 * - Proper container constraints to prevent overflow
 * - Touch-optimized card interactions
 * - Better typography scaling
 * - Improved loading states for mobile
 * - Horizontal scroll for project cards on small screens
 * - Graceful fallback to demo data if API fails
 * - Rate limiting protection and error handling
 * 
 * Updated: Now fetches real data from moonrunnerkc GitHub account
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
  RefreshCw,
  Info
} from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  topics: string[];
  size: number;
  open_issues_count: number;
  private: boolean;
  fork: boolean;
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

/**
 * Main ProjectFeed Component
 * Fetches and displays real GitHub data from moonrunnerkc account
 */
const ProjectFeed: React.FC = () => {
  // State management for real GitHub data
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isUsingRealData, setIsUsingRealData] = useState(false);

  // GitHub API configuration
  const GITHUB_USERNAME = 'moonrunnerkc';
  const GITHUB_API_BASE = 'https://api.github.com';

  /**
   * Fallback demo data in case GitHub API fails
   * This maintains the interface functionality during development
   */
  const fallbackRepos: GitHubRepo[] = [
    {
      id: 1,
      name: "aftermathtech-site",
      full_name: "moonrunnerkc/aftermathtech-site",
      description: "Aftermath Technologies website showcasing autonomous AI systems and privacy-first technology",
      html_url: "https://github.com/moonrunnerkc/aftermathtech-site",
      stargazers_count: 5,
      forks_count: 1,
      watchers_count: 2,
      language: "TypeScript",
      updated_at: "2024-01-15T10:30:00Z",
      created_at: "2023-12-01T00:00:00Z",
      topics: ["nextjs", "react", "typescript", "ai", "portfolio"],
      size: 2560,
      open_issues_count: 2,
      private: false,
      fork: false
    },
    {
      id: 2,
      name: "ai-research-demos",
      full_name: "moonrunnerkc/ai-research-demos",
      description: "Collection of AI research demonstrations and proof-of-concept implementations",
      html_url: "https://github.com/moonrunnerkc/ai-research-demos",
      stargazers_count: 8,
      forks_count: 2,
      watchers_count: 3,
      language: "Python",
      updated_at: "2024-01-10T15:45:00Z",
      created_at: "2023-10-15T00:00:00Z",
      topics: ["ai", "machine-learning", "research", "python", "demos"],
      size: 1890,
      open_issues_count: 1,
      private: false,
      fork: false
    }
  ];

  const fallbackCommits: GitHubCommit[] = [
    {
      sha: "a1b2c3d4",
      commit: {
        message: "Update mobile responsiveness for AI chat modal",
        author: {
          name: "Brad Kinnard",
          date: "2024-01-15T10:30:00Z"
        }
      },
      html_url: "https://github.com/moonrunnerkc/aftermathtech-site/commit/a1b2c3d4"
    },
    {
      sha: "e5f6g7h8",
      commit: {
        message: "Add real GitHub API integration to project feed",
        author: {
          name: "Brad Kinnard",
          date: "2024-01-14T15:45:00Z"
        }
      },
      html_url: "https://github.com/moonrunnerkc/aftermathtech-site/commit/e5f6g7h8"
    }
  ];

  /**
   * Fetch real repositories from GitHub API
   * Includes error handling and rate limiting considerations
   */
  const fetchRepositories = async (): Promise<GitHubRepo[]> => {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'aftermathtech-site'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const repos: GitHubRepo[] = await response.json();
      
      // Filter out private repos and forks, sort by update date
      return repos
        .filter(repo => !repo.private && !repo.fork)
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 6); // Limit to 6 most recent repos
        
    } catch (error) {
      console.error('Failed to fetch repositories:', error);
      throw error;
    }
  };

  /**
   * Fetch recent commits from user's repositories
   * Gets latest commits across all public repos
   */
  const fetchRecentCommits = async (repositories: GitHubRepo[]): Promise<GitHubCommit[]> => {
    try {
      const allCommits: GitHubCommit[] = [];
      
      // Fetch commits from up to 3 most active repos to avoid rate limiting
      const activeRepos = repositories.slice(0, 3);
      
      for (const repo of activeRepos) {
        try {
          const response = await fetch(`${GITHUB_API_BASE}/repos/${repo.full_name}/commits`, {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'aftermathtech-site'
            }
          });

          if (response.ok) {
            const commits: GitHubCommit[] = await response.json();
            allCommits.push(...commits.slice(0, 2)); // Take 2 most recent from each repo
          }
        } catch (error) {
          console.warn(`Failed to fetch commits for ${repo.name}:`, error);
        }
      }

      // Sort by date and return most recent
      return allCommits
        .sort((a, b) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime())
        .slice(0, 5);
        
    } catch (error) {
      console.error('Failed to fetch commits:', error);
      throw error;
    }
  };

  /**
   * Main data loading function
   * Attempts to fetch real GitHub data, falls back to demo data on failure
   */
  useEffect(() => {
    const loadGitHubData = async () => {
      setIsLoading(true);
      setError(null);
      setIsUsingRealData(false);
      
      try {
        // Add realistic loading delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Attempt to fetch real GitHub data
        const repositories = await fetchRepositories();
        const recentCommits = await fetchRecentCommits(repositories);
        
        // Success - use real data
        setRepos(repositories);
        setCommits(recentCommits);
        setIsUsingRealData(true);
        setLastUpdated(new Date());
        
        console.log(`✅ Successfully loaded ${repositories.length} repos and ${recentCommits.length} commits from GitHub`);
        
      } catch (error) {
        console.warn('⚠️ GitHub API failed, using fallback data:', error);
        
        // Fallback to demo data
        setRepos(fallbackRepos);
        setCommits(fallbackCommits);
        setIsUsingRealData(false);
        setLastUpdated(new Date());
        
        // Don't show error to user, just use fallback
        // setError('Unable to load live GitHub data. Showing demo content.');
      } finally {
        setIsLoading(false);
      }
    };

    loadGitHubData();
  }, []);

  /**
   * Get programming language color for visual indicators
   * Based on GitHub's official language colors
   */
  const getLanguageColor = (language: string | null): string => {
    if (!language) return '#8b5cf6';
    
    const colors: { [key: string]: string } = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f1e05a',
      'Rust': '#dea584',
      'Python': '#3572a5',
      'C++': '#f34b7d',
      'Go': '#00add8',
      'Java': '#b07219',
      'C': '#555555',
      'HTML': '#e34c26',
      'CSS': '#1572b6',
      'Vue': '#4fc08d',
      'React': '#61dafb',
      'Swift': '#fa7343',
      'Kotlin': '#f18e33'
    };
    return colors[language] || '#8b5cf6';
  };

  /**
   * Format dates to human-readable relative time
   * Shows "just now", "2h ago", "3d ago", etc.
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    if (diffInHours < 720) return `${Math.floor(diffInHours / 168)}w ago`;
    return date.toLocaleDateString();
  };

  /**
   * Manual refresh function for user-triggered updates
   */
  const refreshData = async () => {
    setRepos([]);
    setCommits([]);
    
    // Re-run the data loading process
    const loadGitHubData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const repositories = await fetchRepositories();
        const recentCommits = await fetchRecentCommits(repositories);
        
        setRepos(repositories);
        setCommits(recentCommits);
        setIsUsingRealData(true);
        setLastUpdated(new Date());
        
      } catch (error) {
        console.warn('Refresh failed, using fallback data:', error);
        setRepos(fallbackRepos);
        setCommits(fallbackCommits);
        setIsUsingRealData(false);
        setLastUpdated(new Date());
      } finally {
        setIsLoading(false);
      }
    };

    await loadGitHubData();
  };

  /**
   * Error state component
   */
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

  /**
   * Main component render
   */
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Header with Live Status and Data Source Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full animate-pulse ${isUsingRealData ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
            <span className={`font-semibold text-sm sm:text-base ${isUsingRealData ? 'text-green-400' : 'text-yellow-400'}`}>
              {isUsingRealData ? 'LIVE' : 'DEMO'}
            </span>
          </div>
          <span className="text-gray-400 text-sm sm:text-base">GitHub Activity</span>
          {!isUsingRealData && (
            <div className="flex items-center gap-1 text-yellow-400 text-xs">
              <Info className="w-3 h-3" />
              <span className="hidden sm:inline">Fallback Data</span>
            </div>
          )}
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

      {/* Data Source Information Banner */}
      {!isLoading && (
        <div className={`rounded-lg p-3 border text-sm ${
          isUsingRealData 
            ? 'bg-green-500/10 border-green-500/30 text-green-300' 
            : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
        }`}>
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            <span>
              {isUsingRealData 
                ? `📡 Live data from @${GITHUB_USERNAME} • Showing ${repos.length} public repositories`
                : '🔄 Demo mode • GitHub API unavailable, showing example projects'
              }
            </span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <Loader className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading GitHub projects...</p>
          <p className="text-gray-500 text-sm mt-2">Fetching data from @{GITHUB_USERNAME}</p>
        </div>
      )}

      {/* Projects Grid - Mobile Responsive */}
      {!isLoading && repos.length > 0 && (
        <div className="space-y-6 sm:space-y-8">
          {/* Repository Cards */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <Github className="w-5 h-5" />
              {isUsingRealData ? 'Live Repositories' : 'Example Repositories'}
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
          {commits.length > 0 && (
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <Code className="w-5 h-5" />
                {isUsingRealData ? 'Recent Commits' : 'Example Commits'}
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
          )}

          {/* Footer Stats - Now shows real data */}
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
                <div className="text-xs sm:text-sm text-gray-400">
                  {isUsingRealData ? 'Public Repos' : 'Demo Repos'}
                </div>
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

      {/* Empty State - Rare case where no repos are found */}
      {!isLoading && repos.length === 0 && (
        <div className="text-center py-12">
          <Github className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Repositories Found</h3>
          <p className="text-gray-400 mb-6">
            No public repositories found for @{GITHUB_USERNAME}
          </p>
          <button
            onClick={refreshData}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white rounded-lg font-medium transition-all min-h-[44px]"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Separate Repository Card Component for better organization
 * Displays individual repository information with proper mobile optimization
 */
interface RepositoryCardProps {
  repo: GitHubRepo;
  getLanguageColor: (language: string | null) => string;
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
      {repo.description || 'No description available'}
    </p>

    {/* Topics */}
    {repo.topics && repo.topics.length > 0 && (
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