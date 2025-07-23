// components/AgentAvatar.tsx
'use client';

import React from 'react';
import { Agent } from '../hooks/useSwarmOrchestrator';

interface AgentAvatarProps {
  agent: Agent;
  isActive: boolean;
  isRunning: boolean;
}

const AgentAvatar: React.FC<AgentAvatarProps> = ({ agent, isActive, isRunning }) => {
  const getAvatarClasses = () => {
    // CSS modules removed
    const roleClass = styles[agent.id]; // planner, researcher, coder, critic
    const activeClass = isActive ? styles.active : '';
    const runningClass = isRunning ? styles.running : '';
    
    return `${baseClass} ${roleClass} ${activeClass} ${runningClass}`.trim();
  };

  return (
    <div className="flex flex-col items-center space-y-2">
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
        <span className="text-2xl" role="img" aria-label={agent.role}>
          {agent.emoji}
        </span>
        
        {/* Activity Pulse Ring */}
        {isActive && (
          <div 
            className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping"
            style={{ borderColor: agent.color } as React.CSSProperties}
          />
        )}
        
        {/* Processing Indicator */}
        {isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3">
            <div className="flex space-x-1">
              <span style={{ backgroundColor: agent.color }}></span>
              <span style={{ backgroundColor: agent.color }}></span>
              <span style={{ backgroundColor: agent.color }}></span>
            </div>
          </div>
        )}
      </div>
      
      {/* Agent Label */}
      <div className="text-center">
        <div className="text-xs text-green-400 font-mono">{agent.role}</div>
        <div className="text-xs text-gray-500 font-mono">#{agent.id}</div>
      </div>
      
      {/* Connection Lines */}
      {isRunning && (
        <div className="absolute top-0 left-full w-8 h-full">
          <svg className="w-full h-full" viewBox="0 0 100 20">
            <line
              x1="50"
              y1="0"
              x2="50"
              y2="20"
              stroke={agent.color}
              strokeWidth="1"
              className="stroke-green-400 stroke-2"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default AgentAvatar;