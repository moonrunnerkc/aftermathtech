// components/SwarmPreviewModal.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { X, Zap, ZapOff } from 'lucide-react';
import { useSwarmOrchestrator } from '../hooks/useSwarmOrchestrator';
import AgentAvatar from './AgentAvatar';
import SwarmLog from './SwarmLog';
import ResourceHUD from './ResourceHUD';

interface SwarmPreviewModalProps {
  goal: string;
  onClose: () => void;
}

const SwarmPreviewModal: React.FC<SwarmPreviewModalProps> = ({ goal, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const {
    agents,
    log,
    resourceStats,
    activeAgentId,
    isRunning,
    currentRound,
    start,
    stop
  } = useSwarmOrchestrator();

  // Auto-start swarm on mount with the provided goal
  useEffect(() => {
    if (goal) {
      // Add a small delay to ensure modal is fully rendered
      const timeoutId = setTimeout(() => {
        start(goal);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [goal]); // Remove start and stop from dependencies to prevent loops

  // Separate cleanup effect
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Focus management for accessibility
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="swarm-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-gray-900 border border-green-400/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden neon-glow"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-green-400/20">
          <div className="flex items-center gap-4">
            <h2 id="swarm-modal-title" className="text-xl font-mono text-green-400">
              🧠 Swarm Snapshot
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              {currentRound > 0 && (
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse">
                  Round {currentRound}/3
                </span>
              )}
              <span className="font-mono">
                Goal: {goal || 'AI Agent Collaboration Demo'}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3">
            {/* Kill Net Toggle */}
            <button
              className={`${styles.killNetButton} ${!isRunning ? styles.active : ''}`}
              onClick={isRunning ? stop : () => start(goal)}
              title={isRunning ? 'Stop Swarm' : 'Start Swarm'}
              aria-label={isRunning ? 'Stop swarm execution' : 'Start swarm execution'}
            >
              {isRunning ? (
                <>
                  <ZapOff size={16} />
                  <span>Kill Net</span>
                </>
              ) : (
                <>
                  <Zap size={16} />
                  <span>Start Net</span>
                </>
              )}
            </button>
            
            {/* Close Button */}
            <button
              className="text-gray-400 hover:text-red-400 transition-colors text-2xl font-mono"
              onClick={onClose}
              aria-label="Close swarm preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Agent Avatars Row */}
        <div className="flex justify-center gap-6 p-6 border-b border-green-400/10">
          {agents.map((agent) => (
            <AgentAvatar
              key={agent.id}
              agent={agent}
              isActive={activeAgentId === agent.id}
              isRunning={isRunning}
            />
          ))}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between p-4 bg-gray-800/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 font-mono text-sm">
              {isRunning ? 'Agents Active' : 'Standby Mode'}
            </span>
          </div>
          
          <div className="text-gray-400 font-mono text-sm">
            {log.length} entries • {agents.length} agents
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Swarm Log */}
          <div className="space-y-4">
            <SwarmLog 
              log={log} 
              agents={agents}
              isRunning={isRunning}
            />
          </div>
        </div>

        {/* Resource HUD - Fixed Position */}
        <ResourceHUD 
          stats={resourceStats}
          isRunning={isRunning}
        />
      </div>
    </div>
  );
};

export default SwarmPreviewModal;