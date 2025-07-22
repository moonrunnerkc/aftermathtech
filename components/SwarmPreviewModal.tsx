// components/SwarmPreviewModal.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { X, Zap, ZapOff } from 'lucide-react';
import { useSwarmOrchestrator } from '../hooks/useSwarmOrchestrator';
import AgentAvatar from './AgentAvatar';
import SwarmLog from './SwarmLog';
import ResourceHUD from './ResourceHUD';
import styles from '../styles/swarmModal.module.css';

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
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="swarm-modal-title"
    >
      <div 
        ref={modalRef}
        className={styles.card}
        tabIndex={-1}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h2 id="swarm-modal-title" className={styles.title}>
              🧠 Swarm Snapshot
            </h2>
            <div className={styles.subtitle}>
              {currentRound > 0 && (
                <span className={styles.roundIndicator}>
                  Round {currentRound}/3
                </span>
              )}
              <span className={styles.goalText}>
                Goal: {goal || 'AI Agent Collaboration Demo'}
              </span>
            </div>
          </div>
          
          <div className={styles.controls}>
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
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close swarm preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Agent Avatars Row */}
        <div className={styles.agentsRow}>
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
        <div className={styles.statusBar}>
          <div className={styles.statusIndicator}>
            <div className={`${styles.statusDot} ${isRunning ? styles.running : styles.idle}`} />
            <span className={styles.statusText}>
              {isRunning ? 'Agents Active' : 'Standby Mode'}
            </span>
          </div>
          
          <div className={styles.logStats}>
            {log.length} entries • {agents.length} agents
          </div>
        </div>

        {/* Main Content Area */}
        <div className={styles.contentArea}>
          {/* Swarm Log */}
          <div className={styles.logSection}>
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