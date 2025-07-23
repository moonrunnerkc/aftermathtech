// workers/llmWorker.ts
import { expose } from 'comlink';

// Interface for worker communication
export interface LLMWorkerAPI {
  invokeAgent: (params: InvokeAgentParams) => Promise<string>;
  cleanup: () => void;
}

export interface InvokeAgentParams {
  prompt: string;
  systemPrompt: string;
  agentId: string;
  temperature?: number;
  maxTokens?: number;
}

// Mock LLM responses for offline demo
const MOCK_RESPONSES = {
  planner: [
    "📋 PLANNING: Initiating strategic analysis of the given objective. Breaking down complex requirements into manageable phases: discovery, architecture design, implementation roadmap, and quality validation checkpoints.",
    "📋 PLANNING: Cross-referencing current resources and constraints. Establishing priority matrix based on impact vs effort analysis. Delegating specialized tasks to domain experts for parallel execution.",
    "📋 PLANNING: Reviewing progress indicators and adjusting timeline projections. All systems show green status. Mission parameters are within acceptable ranges. Mission complete - objectives successfully achieved.",
    "📋 PLANNING: Conducting risk assessment and mitigation strategies. Identified potential bottlenecks in data processing pipeline. Recommending additional validation cycles for critical components."
  ],
  researcher: [
    "🔍 RESEARCH: Scanning available data sources and cross-referencing industry benchmarks. Current market trends indicate 87% adoption rate for modern web technologies. TypeScript usage has increased 34% year-over-year.",
    "🔍 RESEARCH: Deep-diving into technical specifications and compatibility matrices. WebAssembly performance benchmarks show 15-20% improvement over JavaScript for computational tasks. Browser support: 94.2% global coverage.",
    "🔍 RESEARCH: Analyzing user behavior patterns and engagement metrics. Real-time processing capabilities show optimal performance with worker thread architecture. Latency reduced by 40% compared to main-thread execution.",
    "🔍 RESEARCH: Investigating competitive landscape and feature parity analysis. Leading solutions implement similar multi-agent architectures. Our approach demonstrates superior resource efficiency and scalability potential."
  ],
  coder: [
    "⚡ CODING: Implementing modular architecture with separation of concerns. Core components: orchestrator hooks, agent abstractions, and worker communication protocols. Estimated development effort: 12-16 hours.",
    "⚡ CODING: Optimizing render performance with React.memo and useMemo implementations. Implementing lazy loading for heavy components. Bundle size reduction target: 25% through code splitting.",
    "⚡ CODING: Establishing error boundaries and graceful degradation patterns. WebWorker fallback mechanisms ensure functionality even without threading support. Accessibility compliance: ARIA labels and keyboard navigation.",
    "⚡ CODING: Building comprehensive test suite with unit tests and integration scenarios. Mock data providers ensure consistent behavior across environments. Performance profiling tools integrated for continuous monitoring."
  ],
  critic: [
    "🎯 REVIEW: Conducting thorough code review and identifying potential improvements. Architecture looks solid, but recommend additional input validation and error handling in the orchestrator logic.",
    "🎯 REVIEW: Performance analysis reveals memory management opportunities. Suggest implementing cleanup routines for inactive agents and garbage collection optimization. Current resource usage is within acceptable limits.",
    "🎯 REVIEW: User experience evaluation shows intuitive interface design. Recommend adding loading states and progress indicators for better user feedback. Consider implementing keyboard shortcuts for power users.",
    "🎯 REVIEW: Security assessment identifies minimal risk vectors. All processing occurs client-side with no external data transmission. Recommend adding Content Security Policy headers for additional protection."
  ]
};

class LLMWorker implements LLMWorkerAPI {
  private isInitialized = false;
  private responseCounters: Record<string, number> = {
    planner: 0,
    researcher: 0,
    coder: 0,
    critic: 0
  };

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    // Simulate worker initialization time
    await new Promise(resolve => setTimeout(resolve, 100));
    this.isInitialized = true;
    console.log('🔧 LLM Worker initialized');
  }

  private async simulateProcessingTime(complexity: number = 1): Promise<void> {
    // Simulate realistic processing time based on complexity
    const baseTime = 800; // Base processing time in ms
    const variability = Math.random() * 600; // Add randomness
    const complexityMultiplier = Math.max(0.5, complexity);
    
    const totalTime = (baseTime + variability) * complexityMultiplier;
    await new Promise(resolve => setTimeout(resolve, totalTime));
  }

  private getContextualResponse(agentId: string, prompt: string): string {
    const responses = MOCK_RESPONSES[agentId as keyof typeof MOCK_RESPONSES] || MOCK_RESPONSES.planner;
    const counter = this.responseCounters[agentId] || 0;
    
    // Cycle through responses with some randomness
    const responseIndex = (counter + Math.floor(Math.random() * 2)) % responses.length;
    this.responseCounters[agentId] = (counter + 1) % responses.length;
    
    let response = responses[responseIndex];
    
    // Add contextual elements based on prompt content
    if (prompt.toLowerCase().includes('complete') || prompt.toLowerCase().includes('finish')) {
      response += ' All objectives have been successfully validated and documented.';
    }
    
    if (prompt.toLowerCase().includes('error') || prompt.toLowerCase().includes('issue')) {
      response += ' Error handling protocols have been implemented and tested.';
    }
    
    if (prompt.toLowerCase().includes('performance') || prompt.toLowerCase().includes('optimize')) {
      response += ' Performance metrics indicate optimal resource utilization and response times.';
    }
    
    return response;
  }

  async invokeAgent(params: InvokeAgentParams): Promise<string> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const { prompt, systemPrompt, agentId, temperature = 0.7, maxTokens = 200 } = params;
    
    try {
      // Log worker activity
      console.log(`🤖 Worker processing ${agentId} request:`, { prompt: prompt.slice(0, 50) + '...' });
      
      // Simulate processing complexity based on prompt length and agent type
      const complexity = Math.min(2, prompt.length / 100);
      await this.simulateProcessingTime(complexity);
      
      // Generate contextual response
      const response = this.getContextualResponse(agentId, prompt);
      
      // Simulate occasional processing variations
      if (Math.random() < 0.1) { // 10% chance
        await new Promise(resolve => setTimeout(resolve, 200)); // Extra processing time
      }
      
      console.log(`✅ Worker completed ${agentId} processing`);
      return response;
      
    } catch (error) {
      console.error(`❌ Worker error for ${agentId}:`, error);
      throw new Error(`Agent ${agentId} processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  cleanup(): void {
    this.isInitialized = false;
    this.responseCounters = { planner: 0, researcher: 0, coder: 0, critic: 0 };
    console.log('🧹 LLM Worker cleaned up');
  }
}

// Expose the worker API using Comlink
const worker = new LLMWorker();
expose(worker);

// Also export for direct usage (non-worker mode)
export default worker;