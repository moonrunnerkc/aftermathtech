// API Client and Utilities for AftermathTech.com

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'partnership' | 'support' | 'demo' | 'careers';
  urgency?: 'low' | 'medium' | 'high';
  budget?: string;
  timeline?: string;
}

export interface NewsletterData {
  email: string;
  interests?: string[];
  source?: string;
}

export interface DemoRequest {
  name: string;
  email: string;
  company: string;
  role: string;
  useCase: string;
  preferredDate?: string;
  preferredTime?: string;
  timezone?: string;
  teamSize?: number;
  currentSolution?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  coverImage?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: 'whitepaper' | 'case-study' | 'tutorial' | 'documentation' | 'tool' | 'demo';
  url: string;
  downloadUrl?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  featured: boolean;
  thumbnail?: string;
  author?: string;
  fileSize?: string;
  format?: string;
}

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
          code: response.status,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  // Contact form submission
  async submitContactForm(formData: ContactFormData): Promise<ApiResponse> {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  // Newsletter subscription
  async subscribeNewsletter(data: NewsletterData): Promise<ApiResponse> {
    return this.request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Demo request
  async requestDemo(data: DemoRequest): Promise<ApiResponse> {
    return this.request('/demo/request', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Blog posts
  async getBlogPosts(
    page: number = 1,
    limit: number = 10,
    category?: string,
    tag?: string
  ): Promise<ApiResponse<{ posts: BlogPost[]; total: number; pages: number }>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (category) params.append('category', category);
    if (tag) params.append('tag', tag);

    return this.request(`/blog?${params.toString()}`);
  }

  async getBlogPost(slug: string): Promise<ApiResponse<BlogPost>> {
    return this.request(`/blog/${slug}`);
  }

  async searchBlogPosts(query: string): Promise<ApiResponse<BlogPost[]>> {
    return this.request(`/blog/search?q=${encodeURIComponent(query)}`);
  }

  // Resources
  async getResources(
    type?: ResourceItem['type'],
    category?: string
  ): Promise<ApiResponse<ResourceItem[]>> {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (category) params.append('category', category);

    return this.request(`/resources?${params.toString()}`);
  }

  async getResource(id: string): Promise<ApiResponse<ResourceItem>> {
    return this.request(`/resources/${id}`);
  }

  // Analytics and metrics
  async trackEvent(event: {
    name: string;
    properties?: Record<string, any>;
    userId?: string;
    sessionId?: string;
  }): Promise<ApiResponse> {
    return this.request('/analytics/track', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string; version: string }>> {
    return this.request('/health');
  }

  // Model APIs
  async getAvailableModels(): Promise<ApiResponse<{ models: any[] }>> {
    return this.request('/models');
  }

  async runInference(modelId: string, input: any): Promise<ApiResponse<any>> {
    return this.request(`/models/${modelId}/inference`, {
      method: 'POST',
      body: JSON.stringify({ input }),
    });
  }
}

// Singleton instance
export const apiClient = new ApiClient();

// Utility functions
export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  // Client-side validation
  const errors = validateContactForm(data);
  if (errors.length > 0) {
    return {
      success: false,
      error: `Validation errors: ${errors.join(', ')}`,
    };
  }

  try {
    const response = await apiClient.submitContactForm(data);
    
    // Track successful form submission
    if (response.success) {
      await trackEvent('contact_form_submitted', {
        inquiryType: data.inquiryType,
        hasCompany: !!data.company,
        urgency: data.urgency,
      });
    }
    
    return response;
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return {
      success: false,
      error: 'Failed to submit contact form. Please try again later.',
    };
  }
}

export async function subscribeToNewsletter(email: string, interests?: string[]): Promise<ApiResponse> {
  if (!isValidEmail(email)) {
    return {
      success: false,
      error: 'Please enter a valid email address',
    };
  }

  try {
    const response = await apiClient.subscribeNewsletter({ email, interests });
    
    if (response.success) {
      await trackEvent('newsletter_subscribed', {
        interests: interests || [],
        source: 'website',
      });
    }
    
    return response;
  } catch (error) {
    console.error('Newsletter subscription failed:', error);
    return {
      success: false,
      error: 'Failed to subscribe to newsletter. Please try again later.',
    };
  }
}

export async function requestDemo(data: DemoRequest): Promise<ApiResponse> {
  const errors = validateDemoRequest(data);
  if (errors.length > 0) {
    return {
      success: false,
      error: `Validation errors: ${errors.join(', ')}`,
    };
  }

  try {
    const response = await apiClient.requestDemo(data);
    
    if (response.success) {
      await trackEvent('demo_requested', {
        company: data.company,
        role: data.role,
        useCase: data.useCase,
        teamSize: data.teamSize,
      });
    }
    
    return response;
  } catch (error) {
    console.error('Demo request failed:', error);
    return {
      success: false,
      error: 'Failed to request demo. Please try again later.',
    };
  }
}

export async function trackEvent(
  eventName: string,
  properties?: Record<string, any>
): Promise<void> {
  try {
    await apiClient.trackEvent({
      name: eventName,
      properties,
      sessionId: getSessionId(),
      userId: getUserId(),
    });
  } catch (error) {
    console.error('Event tracking failed:', error);
    // Don't throw error for analytics failures
  }
}

// Validation functions
function validateContactForm(data: ContactFormData): string[] {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push('Name is required');
  }

  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.subject?.trim()) {
    errors.push('Subject is required');
  }

  if (!data.message?.trim()) {
    errors.push('Message is required');
  } else if (data.message.length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return errors;
}

function validateDemoRequest(data: DemoRequest): string[] {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push('Name is required');
  }

  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.company?.trim()) {
    errors.push('Company is required');
  }

  if (!data.role?.trim()) {
    errors.push('Role is required');
  }

  if (!data.useCase?.trim()) {
    errors.push('Use case description is required');
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Session and user management
function getSessionId(): string {
  let sessionId = '';
  
  if (typeof window !== 'undefined') {
    sessionId = sessionStorage.getItem('sessionId') || '';
    if (!sessionId) {
      sessionId = generateId();
      sessionStorage.setItem('sessionId', sessionId);
    }
  }
  
  return sessionId;
}

function getUserId(): string | undefined {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userId') || undefined;
  }
  return undefined;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Cache management
class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

export const apiCache = new ApiCache();

// Error handling
export class ApiError extends Error {
  public code?: number;
  public details?: any;

  constructor(message: string, code?: number, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
  }
}

// Rate limiting
class RateLimiter {
  private requests = new Map<string, number[]>();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }

  reset(key: string): void {
    this.requests.delete(key);
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, requests] of this.requests.entries()) {
      const validRequests = requests.filter(time => now - time < this.windowMs);
      if (validRequests.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, validRequests);
      }
    }
  }
}

export const rateLimiter = new RateLimiter();

// Periodic cleanup
if (typeof window !== 'undefined') {
  setInterval(() => {
    rateLimiter.cleanup();
  }, 60000); // Cleanup every minute
}