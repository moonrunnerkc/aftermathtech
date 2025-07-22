'use client';

import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, Eye, Calendar, ExternalLink } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  topics: string[];
  private: boolean;
  pushed_at: string;
}

interface CommitData {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  repository?: {
    name: string;
  };
}

const ProjectFeed: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [recentCommits, setRecentCommits] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'ai' | 'web' | 'tools'>('all');

  const GITHUB_USERNAME = 'moonrunnerkc';

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              // Add your GitHub token here if you have rate limiting issues
              // 'Authorization': 'token YOUR_GITHUB_TOKEN'
            }
          }
        );

        if (!reposResponse.ok) {
          throw new Error(`GitHub API responded with status: ${reposResponse.status}`);
        }

        const repos: Repository[] = await reposResponse.json();
        
        // Filter out forks and include only repositories with recent activity
        const filteredRepos = repos
          .filter(repo => !repo.private) // Only public repos
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, 6); // Show top 6 most recently updated

        setRepositories(filteredRepos);

        // Fetch recent commits from the most active repositories
        const commitPromises = filteredRepos
          .slice(0, 3) // Get commits from top 3 repos
          .map(async (repo) => {
            try {
              const commitsResponse = await fetch(
                `https://api.github.com/repos/${repo.full_name}/commits?per_page=2`,
                {
                  headers: {
                    'Accept': 'application/vnd.github.v3+json',
                  }
                }
              );
              
              if (commitsResponse.ok) {
                const commits: CommitData[] = await commitsResponse.json();
                return commits.map(commit => ({
                  ...commit,
                  repository: { name: repo.name }
                }));
              }
              return [];
            } catch (error) {
              console.warn(`Failed to fetch commits for ${repo.name}:`, error);
              return [];
            }
          });

        const commitResults = await Promise.all(commitPromises);
        const allCommits = commitResults
          .flat()
          .sort((a, b) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime())
          .slice(0, 5); // Show 5 most recent commits

        setRecentCommits(allCommits);

      } catch (err) {
        console.error('GitHub API Error:', err);
        setError(`Failed to fetch GitHub data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const filteredRepositories = repositories.filter(repo => {
    if (filter === 'all') return true;
    
    const repoText = `${repo.name} ${repo.description || ''} ${repo.topics.join(' ')}`.toLowerCase();
    
    if (filter === 'ai') {
      return repoText.includes('ai') || 
             repoText.includes('ml') || 
             repoText.includes('neural') || 
             repoText.includes('llm') ||
             repoText.includes('machine learning') ||
             repo.topics.some(topic => ['ai', 'ml', 'neural', 'llm', 'tensorflow', 'pytorch'].includes(topic.toLowerCase()));
    }
    
    if (filter === 'web') {
      return repoText.includes('web') || 
             repoText.includes('react') || 
             repoText.includes('next') ||
             repoText.includes('html') ||
             repoText.includes('css') ||
             repoText.includes('javascript') ||
             repo.language === 'JavaScript' ||
             repo.language === 'TypeScript' ||
             repo.topics.some(topic => ['web', 'react', 'nextjs', 'html', 'css', 'frontend'].includes(topic.toLowerCase()));
    }
    
    if (filter === 'tools') {
      return repoText.includes('tool') || 
             repoText.includes('cli') || 
             repoText.includes('script') ||
             repoText.includes('utility') ||
             repo.topics.some(topic => ['tools', 'cli', 'script', 'utility', 'automation'].includes(topic.toLowerCase()));
    }
    
    return true;
  });

  const getLanguageColor = (language: string | null) => {
    if (!language) return 'bg-gray-500';
    
    const colors: { [key: string]: string } = {
      'Python': 'bg-yellow-500',
      'TypeScript': 'bg-blue-500',
      'JavaScript': 'bg-yellow-400',
      'Rust': 'bg-orange-500',
      'Go': 'bg-cyan-500',
      'C++': 'bg-pink-500',
      'C': 'bg-gray-600',
      'Java': 'bg-red-500',
      'HTML': 'bg-orange-400',
      'CSS': 'bg-blue-400',
      'Shell': 'bg-green-500',
      'Dockerfile': 'bg-blue-600'
    };
    return colors[language] || 'bg-gray-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const truncateCommitMessage = (message: string, maxLength: number = 60) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6">
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <Github className="w-8 h-8 text-cyan-400 animate-pulse mx-auto mb-2" />
              <p className="text-cyan-300">Loading real GitHub projects from @{GITHUB_USERNAME}...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-black/40 backdrop-blur-lg border border-red-500/30 rounded-xl p-6">
          <div className="text-center text-red-400">
            <Github className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold mb-2">Failed to load GitHub data</p>
            <p className="text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Github className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Live from GitHub/@{GITHUB_USERNAME}</h2>
          </div>
          <div className="flex gap-2">
            {(['all', 'ai', 'web', 'tools'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  filter === filterType
                    ? 'bg-cyan-500 text-black'
                    : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30'
                }`}
              >
                {filterType.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        {recentCommits.length > 0 && (
          <div className="bg-black/30 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-white mb-3">Recent Activity</h3>
            <div className="space-y-2">
              {recentCommits.map((commit) => (
                <div key={commit.sha} className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-300 flex-grow">
                    {truncateCommitMessage(commit.commit.message)}
                  </span>
                  {commit.repository && (
                    <>
                      <span className="text-gray-500">•</span>
                      <span className="text-cyan-400 text-xs">{commit.repository.name}</span>
                    </>
                  )}
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 text-xs">{formatDate(commit.commit.author.date)}</span>
                  <a
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Repository Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRepositories.length > 0 ? (
          filteredRepositories.map((repo) => (
            <div
              key={repo.id}
              className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {repo.description || 'No description available'}
                  </p>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex-shrink-0 ml-3"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              {/* Topics */}
              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.topics.slice(0, 4).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > 4 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                      +{repo.topics.length - 4} more
                    </span>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    <span>{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{repo.watchers_count}</span>
                  </div>
                </div>
                {repo.language && (
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
                    <span>{repo.language}</span>
                  </div>
                )}
              </div>

              {/* Last Updated */}
              <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>Updated {formatDate(repo.updated_at)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-400">
            <Github className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No repositories found for the selected filter.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-gray-400 text-sm">
        <p>
          Real-time integration with GitHub API • 
          <a 
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 ml-1"
          >
            View all repositories →
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProjectFeed;