// GitHub API Integration for real-time project data

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  size: number;
  updated_at: string;
  created_at: string;
  pushed_at: string;
  topics: string[];
  visibility: string;
  default_branch: string;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
  } | null;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
  html_url: string;
}

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  assets: {
    name: string;
    download_count: number;
    browser_download_url: string;
  }[];
}

class GitHubFeedService {
  private baseUrl = 'https://api.github.com';
  private organization = 'aftermath-tech'; // Your GitHub organization
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  private async fetchWithCache<T>(
    url: string,
    cacheKey: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'AftermathTech-Website',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      console.error(`Failed to fetch from GitHub API: ${url}`, error);
      
      // Return cached data if available, even if expired
      if (cached) {
        console.warn('Using expired cache data due to API error');
        return cached.data;
      }
      
      throw error;
    }
  }

  async getOrganizationRepos(): Promise<GitHubRepo[]> {
    try {
      const repos = await this.fetchWithCache<GitHubRepo[]>(
        `${this.baseUrl}/orgs/${this.organization}/repos?sort=updated&direction=desc&per_page=50`,
        'org-repos'
      );

      return repos.filter(repo => 
        !repo.name.startsWith('.') && 
        repo.visibility === 'public'
      );
    } catch (error) {
      console.error('Failed to fetch organization repos:', error);
      return this.getMockRepos(); // Fallback to mock data
    }
  }

  async getUserRepos(username: string): Promise<GitHubRepo[]> {
    try {
      const repos = await this.fetchWithCache<GitHubRepo[]>(
        `${this.baseUrl}/users/${username}/repos?sort=updated&direction=desc&per_page=30`,
        `user-repos-${username}`
      );

      return repos.filter(repo => 
        !repo.name.startsWith('.') && 
        !repo.name.includes('config')
      );
    } catch (error) {
      console.error(`Failed to fetch repos for user ${username}:`, error);
      return [];
    }
  }

  async getRepoCommits(repoFullName: string, limit: number = 10): Promise<GitHubCommit[]> {
    try {
      return await this.fetchWithCache<GitHubCommit[]>(
        `${this.baseUrl}/repos/${repoFullName}/commits?per_page=${limit}`,
        `commits-${repoFullName}`
      );
    } catch (error) {
      console.error(`Failed to fetch commits for ${repoFullName}:`, error);
      return [];
    }
  }

  async getRepoReleases(repoFullName: string, limit: number = 5): Promise<GitHubRelease[]> {
    try {
      return await this.fetchWithCache<GitHubRelease[]>(
        `${this.baseUrl}/repos/${repoFullName}/releases?per_page=${limit}`,
        `releases-${repoFullName}`
      );
    } catch (error) {
      console.error(`Failed to fetch releases for ${repoFullName}:`, error);
      return [];
    }
  }

  async searchRepos(query: string, sort: 'stars' | 'updated' | 'created' = 'updated'): Promise<GitHubRepo[]> {
    try {
      const searchQuery = `${query} org:${this.organization}`;
      const response = await this.fetchWithCache<{ items: GitHubRepo[] }>(
        `${this.baseUrl}/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=${sort}&order=desc&per_page=20`,
        `search-${query}-${sort}`
      );

      return response.items || [];
    } catch (error) {
      console.error(`Failed to search repos with query "${query}":`, error);
      return [];
    }
  }

  async getRepoLanguages(repoFullName: string): Promise<Record<string, number>> {
    try {
      return await this.fetchWithCache<Record<string, number>>(
        `${this.baseUrl}/repos/${repoFullName}/languages`,
        `languages-${repoFullName}`
      );
    } catch (error) {
      console.error(`Failed to fetch languages for ${repoFullName}:`, error);
      return {};
    }
  }

  async getRepoContributors(repoFullName: string): Promise<any[]> {
    try {
      return await this.fetchWithCache<any[]>(
        `${this.baseUrl}/repos/${repoFullName}/contributors?per_page=10`,
        `contributors-${repoFullName}`
      );
    } catch (error) {
      console.error(`Failed to fetch contributors for ${repoFullName}:`, error);
      return [];
    }
  }

  // Mock data for fallback when GitHub API is unavailable
  private getMockRepos(): GitHubRepo[] {
    return [
      {
        id: 1,
        name: 'edge-ai-runtime',
        full_name: 'aftermath-tech/edge-ai-runtime',
        description: 'Lightweight AI runtime optimized for edge devices and WebAssembly deployment',
        html_url: 'https://github.com/aftermath-tech/edge-ai-runtime',
        homepage: 'https://aftermathtech.com/edge-runtime',
        language: 'Rust',
        stargazers_count: 342,
        watchers_count: 28,
        forks_count: 67,
        size: 15680,
        updated_at: '2024-01-15T10:30:00Z',
        created_at: '2023-06-10T14:20:00Z',
        pushed_at: '2024-01-15T10:30:00Z',
        topics: ['ai', 'edge-computing', 'webassembly', 'runtime', 'offline-ai'],
        visibility: 'public',
        default_branch: 'main',
        open_issues_count: 8,
        license: {
          key: 'apache-2.0',
          name: 'Apache License 2.0'
        }
      },
      {
        id: 2,
        name: 'neural-compress',
        full_name: 'aftermath-tech/neural-compress',
        description: 'Advanced neural network compression and quantization toolkit for mobile deployment',
        html_url: 'https://github.com/aftermath-tech/neural-compress',
        homepage: null,
        language: 'Python',
        stargazers_count: 189,
        watchers_count: 15,
        forks_count: 34,
        size: 8950,
        updated_at: '2024-01-12T16:45:00Z',
        created_at: '2023-08-22T09:15:00Z',
        pushed_at: '2024-01-12T16:45:00Z',
        topics: ['neural-networks', 'compression', 'quantization', 'mobile-ai', 'optimization'],
        visibility: 'public',
        default_branch: 'main',
        open_issues_count: 5,
        license: {
          key: 'mit',
          name: 'MIT License'
        }
      },
      {
        id: 3,
        name: 'wasm-ml-toolkit',
        full_name: 'aftermath-tech/wasm-ml-toolkit',
        description: 'Complete toolkit for running machine learning models in WebAssembly environments',
        html_url: 'https://github.com/aftermath-tech/wasm-ml-toolkit',
        homepage: 'https://aftermathtech.com/wasm-toolkit',
        language: 'TypeScript',
        stargazers_count: 567,
        watchers_count: 42,
        forks_count: 89,
        size: 23450,
        updated_at: '2024-01-14T09:20:00Z',
        created_at: '2023-04-05T11:30:00Z',
        pushed_at: '2024-01-14T09:20:00Z',
        topics: ['webassembly', 'machine-learning', 'browser-ai', 'javascript', 'typescript'],
        visibility: 'public',
        default_branch: 'main',
        open_issues_count: 12,
        license: {
          key: 'apache-2.0',
          name: 'Apache License 2.0'
        }
      },
      {
        id: 4,
        name: 'autonomous-security',
        full_name: 'aftermath-tech/autonomous-security',
        description: 'Self-healing security framework with adaptive threat detection and response',
        html_url: 'https://github.com/aftermath-tech/autonomous-security',
        homepage: null,
        language: 'Go',
        stargazers_count: 234,
        watchers_count: 19,
        forks_count: 41,
        size: 12340,
        updated_at: '2024-01-13T14:10:00Z',
        created_at: '2023-09-18T16:00:00Z',
        pushed_at: '2024-01-13T14:10:00Z',
        topics: ['security', 'autonomous-systems', 'threat-detection', 'adaptive-defense', 'ai-security'],
        visibility: 'public',
        default_branch: 'main',
        open_issues_count: 6,
        license: {
          key: 'apache-2.0',
          name: 'Apache License 2.0'
        }
      },
      {
        id: 5,
        name: 'federated-learning-core',
        full_name: 'aftermath-tech/federated-learning-core',
        description: 'Privacy-preserving federated learning framework for distributed AI training',
        html_url: 'https://github.com/aftermath-tech/federated-learning-core',
        homepage: null,
        language: 'Python',
        stargazers_count: 145,
        watchers_count: 12,
        forks_count: 28,
        size: 9870,
        updated_at: '2024-01-11T12:30:00Z',
        created_at: '2023-11-02T10:45:00Z',
        pushed_at: '2024-01-11T12:30:00Z',
        topics: ['federated-learning', 'privacy', 'distributed-ai', 'machine-learning', 'decentralized'],
        visibility: 'public',
        default_branch: 'main',
        open_issues_count: 4,
        license: {
          key: 'mit',
          name: 'MIT License'
        }
      },
      {
        id: 6,
        name: 'edge-inference-engine',
        full_name: 'aftermath-tech/edge-inference-engine',
        description: 'High-performance inference engine optimized for resource-constrained edge devices',
        html_url: 'https://github.com/aftermath-tech/edge-inference-engine',
        homepage: null,
        language: 'C++',
        stargazers_count: 298,
        watchers_count: 22,
        forks_count: 52,
        size: 18600,
        updated_at: '2024-01-10T08:15:00Z',
        created_at: '2023-07-14T13:20:00Z',
        pushed_at: '2024-01-10T08:15:00Z',
        topics: ['edge-computing', 'inference-engine', 'optimization', 'embedded-systems', 'performance'],
        visibility: 'public',
        default_branch: 'main',
        open_issues_count: 9,
        license: {
          key: 'apache-2.0',
          name: 'Apache License 2.0'
        }
      }
    ];
  }

  // Get aggregated statistics
  async getRepoStats(): Promise<{
    totalRepos: number;
    totalStars: number;
    totalForks: number;
    languages: Record<string, number>;
    topRepos: GitHubRepo[];
  }> {
    try {
      const repos = await this.getOrganizationRepos();
      
      const stats = {
        totalRepos: repos.length,
        totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
        languages: {} as Record<string, number>,
        topRepos: repos
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5)
      };

      // Count languages
      repos.forEach(repo => {
        if (repo.language) {
          stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1;
        }
      });

      return stats;
    } catch (error) {
      console.error('Failed to get repo stats:', error);
      return {
        totalRepos: 0,
        totalStars: 0,
        totalForks: 0,
        languages: {},
        topRepos: []
      };
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache status
  getCacheStatus(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Singleton instance
const githubService = new GitHubFeedService();

// Exported functions
export async function fetchGitHubProjects(): Promise<GitHubRepo[]> {
  return githubService.getOrganizationRepos();
}

export async function fetchUserProjects(username: string): Promise<GitHubRepo[]> {
  return githubService.getUserRepos(username);
}

export async function searchGitHubRepos(
  query: string, 
  sort: 'stars' | 'updated' | 'created' = 'updated'
): Promise<GitHubRepo[]> {
  return githubService.searchRepos(query, sort);
}

export async function fetchRepoCommits(repoFullName: string, limit: number = 10): Promise<GitHubCommit[]> {
  return githubService.getRepoCommits(repoFullName, limit);
}

export async function fetchRepoReleases(repoFullName: string, limit: number = 5): Promise<GitHubRelease[]> {
  return githubService.getRepoReleases(repoFullName, limit);
}

export async function fetchRepoLanguages(repoFullName: string): Promise<Record<string, number>> {
  return githubService.getRepoLanguages(repoFullName);
}

export async function fetchRepoContributors(repoFullName: string): Promise<any[]> {
  return githubService.getRepoContributors(repoFullName);
}

export async function fetchGitHubStats(): Promise<{
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  languages: Record<string, number>;
  topRepos: GitHubRepo[];
}> {
  return githubService.getRepoStats();
}

export function clearGitHubCache(): void {
  githubService.clearCache();
}

export { githubService };