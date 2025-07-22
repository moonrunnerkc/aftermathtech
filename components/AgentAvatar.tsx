// components/AgentAvatar.tsx
'use client';

import React from 'react';
import { Agent } from '../hooks/useSwarmOrchestrator';
import styles from '../styles/avatars.module.css';

interface AgentAvatarProps {
  agent: Agent;
  isActive: boolean;
  isRunning: boolean;
}

const AgentAvatar: React.FC<AgentAvatarProps> = ({ agent, isActive, isRunning }) => {
  const getAvatarClasses = () => {
    const baseClass = styles.avatar;
    const roleClass = styles[agent.id]; // planner, researcher, coder, critic
    const activeClass = isActive ? styles.active : '';
    const runningClass = isRunning ? styles.running : '';
    
    return `${baseClass} ${roleClass} ${activeClass} ${runningClass}`.trim();
  };

  return (
    <div className={styles.avatarContainer}>
      {/* Avatar Circle */}
      <div 
        className={getAvatarClasses()}
        style={{
          '--agent-color': agent.color,
          borderColor: agent.color
        } as React.CSSProperties}
        title={`${agent.role} - ${isActive ? 'Active' : 'Standby'}`}
      >
        {/* Agent Emoji */}
        <span className={styles.emoji} role="img" aria-label={agent.role}>
          {agent.emoji}
        </span>
        
        {/* Activity Pulse Ring */}
        {isActive && (
          <div 
            className={styles.pulseRing}
            style={{ borderColor: agent.color } as React.CSSProperties}
          />
        )}
        
        {/* Processing Indicator */}
        {isActive && (
          <div className={styles.processingIndicator}>
            <div className={styles.processingDots}>
              <span style={{ backgroundColor: agent.color }}></span>
              <span style={{ backgroundColor: agent.color }}></span>
              <span style={{ backgroundColor: agent.color }}></span>
            </div>
          </div>
        )}
      </div>
      
      {/* Agent Label */}
      <div className={styles.label}>
        <div className={styles.roleName}>{agent.role}</div>
        <div className={styles.agentId}>#{agent.id}</div>
      </div>
      
      {/* Connection Lines */}
      {isRunning && (
        <div className={styles.connectionLines}>
          <svg className={styles.connectionSvg} viewBox="0 0 100 20">
            <line
              x1="50"
              y1="0"
              x2="50"
              y2="20"
              stroke={agent.color}
              strokeWidth="1"
              className={styles.connectionLine}
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default AgentAvatar;