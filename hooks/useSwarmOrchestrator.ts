// hooks/useSwarmOrchestrator.ts
import { useState, useCallback, useRef } from 'react';

export interface Agent {
  id: string;
  role: string;
  systemPrompt: string;
  color: string;
  emoji: string;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  agentId: string;
  agentRole: string;
  text: string;
  type: 'thinking' | 'output' | 'system';
}

export interface ResourceStats {
  cpuTimeMs: number;
  vramMB: number;
  lastUpdate: number;
}

const AGENTS: Agent[] = [
  {
    id: 'planner',
    role: 'Strategic Planner',
    systemPrompt: `You are the Strategic Planner agent. Analyze goals, break them into actionable steps, and coordinate the team. Always start responses with "📋 PLANNING:" and end critical decisions with "Mission complete" when the goal is fully achieved.`,
    color: '#00ffff',
    emoji: '📋'
  },
  {
    id: 'researcher',
    role: 'Research Analyst',
    systemPrompt: `You are the Research Analyst agent. Gather information, validate facts, and provide detailed analysis. Always start responses with "🔍 RESEARCH:" and focus on data-driven insights.`,
    color: '#ff6b35',
    emoji: '🔍'
  },
  {
    id: 'coder',
    role: 'Code Architect',
    systemPrompt: `You are the Code Architect agent. Design technical solutions, write clean code, and implement features. Always start responses with "⚡ CODING:" and provide practical implementation details.`,
    color: '#4ecdc4',
    emoji: '⚡'
  },
  {
    id: 'critic',
    role: 'Quality Critic',
    systemPrompt: `You are the Quality Critic agent. Review work, identify issues, suggest improvements, and ensure high standards. Always start responses with "🎯 REVIEW:" and provide constructive feedback.`,
    color: '#ffe66d',
    emoji: '🎯'
  }
];

export const useSwarmOrchestrator = () => {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [resourceStats, setResourceStats] = useState<ResourceStats>({
    cpuTimeMs: 0,
    vramMB: 0,
    lastUpdate: Date.now()
  });
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const startTimeRef = useRef<number>(0);
  const resourceIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const addLogEntry = useCallback((agentId: string, text: string, type: LogEntry['type'] = 'output') => {
    const agent = AGENTS.find(a => a.id === agentId);
    const entry: LogEntry = {
      id: `${agentId}-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      agentId,
      agentRole: agent?.role || agentId,
      text,
      type
    };
    setLog(prev => [...prev, entry]);
  }, []);

  const updateResourceStats = useCallback(() => {
    const now = performance.now();
    const cpuDelta = now - startTimeRef.current;
    
    // Estimate VRAM usage (Chrome-specific) with safety checks
    let vramMB = 0;
    try {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        vramMB = Math.round((memory.usedJSHeapSize || 0) / 1024 / 1024);
      } else {
        // Fallback estimation based on log entries and active processing
        vramMB = Math.round(Math.min(log.length * 0.1 + (isRunning ? 50 : 10), 200)); // Cap at 200MB
      }
    } catch (error) {
      // Fallback if memory API fails
      vramMB = Math.round(Math.min(log.length * 0.1 + (isRunning ? 30 : 5), 100));
    }

    setResourceStats({
      cpuTimeMs: Math.round(cpuDelta),
      vramMB: Math.max(0, vramMB), // Ensure non-negative
      lastUpdate: Date.now()
    });
  }, [log.length, isRunning]);

  const simulateAgentThinking = useCallback(async (agent: Agent, context: string): Promise<string> => {
    // Prevent rapid-fire execution with longer, more realistic thinking time
    const thinkingTime = 1200 + Math.random() * 1800; // 1.2-3.0 seconds (increased)
    
    addLogEntry(agent.id, `Analyzing request and formulating response...`, 'thinking');
    
    await new Promise(resolve => setTimeout(resolve, thinkingTime));
    
    // Generate contextual response based on agent role
    let response = '';
    
    switch (agent.id) {
      case 'planner':
        response = `📋 PLANNING: Analyzing goal "${context.slice(0, 50)}...". Breaking down into phases: 1) Research current state, 2) Design architecture, 3) Implement core features, 4) Quality validation. Delegating research phase to analyst team.`;
        // Add mission complete chance only after some rounds
        if (Math.random() > 0.85) {
          response += ' All phases completed successfully. Mission complete - objectives achieved.';
        }
        break;
        
      case 'researcher':
        response = `🔍 RESEARCH: Current web development trends show React 18+ adoption at 78%. Next.js 15 introduces improved caching and edge runtime capabilities. TypeScript usage in enterprise projects: 89%. Recommending modern stack alignment for optimal performance.`;
        break;
        
      case 'coder':
        response = `⚡ CODING: Implementing modular architecture with hooks pattern. Key components: useSwarmOrchestrator for state management, lazy-loaded modal for performance, WebWorker integration for non-blocking execution. Estimated complexity: Medium-High. Code structure optimized.`;
        break;
        
      case 'critic':
        response = `🎯 REVIEW: Code structure analysis complete. Strengths: 1) Modular design, 2) Performance optimization, 3) Error handling. Areas for improvement: 1) Resource cleanup on unmount, 2) Enhanced accessibility, 3) Additional input validation. Overall quality: High.`;
        break;
        
      default:
        response = `${agent.emoji} ${agent.role.toUpperCase()}: Processing context: ${context.slice(0, 100)}...`;
    }
    
    return response;
  }, [addLogEntry]);

  const invokeAgent = useCallback(async (agent: Agent, context: string): Promise<string> => {
    if (abortControllerRef.current?.signal.aborted) {
      throw new Error('Operation aborted');
    }

    setActiveAgentId(agent.id);
    
    try {
      const response = await simulateAgentThinking(agent, context);
      addLogEntry(agent.id, response, 'output');
      return response;
    } catch (error) {
      const errorMsg = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      addLogEntry(agent.id, errorMsg, 'system');
      throw error;
    } finally {
      setActiveAgentId(null);
    }
  }, [simulateAgentThinking, addLogEntry]);

  const start = useCallback(async (goal: string) => {
    if (isRunning) return;
    
    // Reset state
    setLog([]);
    setCurrentRound(0);
    setIsRunning(true);
    setActiveAgentId(null);
    startTimeRef.current = performance.now();
    
    // Create abort controller for cleanup
    abortControllerRef.current = new AbortController();
    
    // Start resource monitoring with longer intervals to reduce load
    resourceIntervalRef.current = setInterval(updateResourceStats, 1000); // Increased from 500ms
    
    addLogEntry('system', `🚀 Swarm Snapshot initiated with goal: "${goal}"`, 'system');
    addLogEntry('system', `🤖 ${AGENTS.length} agents deployed: ${AGENTS.map(a => a.role).join(', ')}`, 'system');
    
    try {
      let context = goal;
      let missionComplete = false;
      
      // Run up to 3 rounds with better error handling
      for (let round = 1; round <= 3 && !missionComplete && !abortControllerRef.current?.signal.aborted; round++) {
        setCurrentRound(round);
        addLogEntry('system', `🔄 Round ${round} - Agent collaboration cycle`, 'system');
        
        // Sequential agent execution with proper delays
        for (const agent of AGENTS) {
          if (abortControllerRef.current?.signal.aborted) break;
          
          try {
            const response = await invokeAgent(agent, context);
            
            // Check if planner declares mission complete
            if (agent.id === 'planner' && response.toLowerCase().includes('mission complete')) {
              missionComplete = true;
              addLogEntry('system', `✅ Mission completed by ${agent.role}`, 'system');
              break;
            }
            
            // Update context for next agent
            context = response;
            
            // Longer delay between agents to prevent performance issues
            await new Promise(resolve => setTimeout(resolve, 800)); // Increased from 300ms
            
          } catch (error) {
            console.error(`Agent ${agent.id} error:`, error);
            if (abortControllerRef.current?.signal.aborted) break;
            
            // Add error entry and continue
            addLogEntry('system', `⚠️ Agent ${agent.role} encountered an error, continuing...`, 'system');
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
        
        // Longer delay between rounds
        if (!missionComplete && round < 3) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }
      
      if (!missionComplete && !abortControllerRef.current?.signal.aborted) {
        addLogEntry('system', `⏰ Swarm completed ${currentRound} rounds - standby mode activated`, 'system');
      }
      
    } catch (error) {
      console.error('Swarm execution error:', error);
      addLogEntry('system', `❌ Swarm error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'system');
    } finally {
      // Always clean up properly
      if (!abortControllerRef.current?.signal.aborted) {
        setIsRunning(false);
        setActiveAgentId(null);
        setCurrentRound(0);
      }
    }
  }, [isRunning, invokeAgent, updateResourceStats, currentRound, addLogEntry]);

  const stop = useCallback(() => {
    // Abort any running operations
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    // Clear resource monitoring
    if (resourceIntervalRef.current) {
      clearInterval(resourceIntervalRef.current);
      resourceIntervalRef.current = null;
    }
    
    // Reset state
    setIsRunning(false);
    setActiveAgentId(null);
    
    addLogEntry('system', '🛑 Swarm operations terminated', 'system');
  }, [addLogEntry]);

  return {
    agents: AGENTS,
    log,
    resourceStats,
    activeAgentId,
    isRunning,
    currentRound,
    start,
    stop,
    updateResourceStats
  };
};