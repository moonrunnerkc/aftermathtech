// components/SwarmLog.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { Agent, LogEntry } from '../hooks/useSwarmOrchestrator';

interface SwarmLogProps {
  log: LogEntry[];
  agents: Agent[];
  isRunning: boolean;
}

const SwarmLog: React.FC<SwarmLogProps> = ({ log, agents, isRunning }) => {
  const logContainerRef = useRef<HTMLDivElement>(null);
  const lastEntryRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new entries are added
  useEffect(() => {
    if (lastEntryRef.current && logContainerRef.current) {
      lastEntryRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [log.length]);

  const getAgent = (agentId: string): Agent | undefined => {
    return agents.find(agent => agent.id === agentId);
  };

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    const timeString = date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Add milliseconds manually for better browser compatibility
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    return `${timeString}.${milliseconds}`;
  };

  const getEntryClasses = (entry: LogEntry, agent?: Agent): string => {
    const baseClass = styles.logEntry;
    const typeClass = styles[`entry${entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}`]; // entryThinking, entryOutput, entrySystem
    const agentClass = agent ? styles[`agent${agent.id.charAt(0).toUpperCase() + agent.id.slice(1)}`] : '';
    
    return `${baseClass} ${typeClass} ${agentClass}`.trim();
  };

  const renderLogEntry = (entry: LogEntry, index: number): React.ReactNode => {
    const agent = getAgent(entry.agentId);
    const isLastEntry = index === log.length - 1;
    
    return (
      <div
        key={entry.id}
        ref={isLastEntry ? lastEntryRef : undefined}
        className={getEntryClasses(entry, agent)}
        style={{
          '--agent-color': agent?.color || '#888',
          animationDelay: `${index * 0.1}s`
        } as React.CSSProperties}
      >
        {/* Entry Header */}
        <div className={styles.entryHeader}>
          <div className={styles.entryAgent}>
            {agent && (
              <>
                <span className={styles.entryEmoji} role="img" aria-label={agent.role}>
                  {agent.emoji}
                </span>
                <span className={styles.entryRole}>{entry.agentRole}</span>
              </>
            )}
            {entry.type === 'system' && (
              <>
                <span className={styles.entryEmoji} role="img" aria-label="System">
                  ⚙️
                </span>
                <span className={styles.entryRole}>System</span>
              </>
            )}
          </div>
          
          <div className={styles.entryMeta}>
            <span className={styles.entryType}>{entry.type}</span>
            <span className={styles.entryTimestamp}>
              {formatTimestamp(entry.timestamp)}
            </span>
          </div>
        </div>

        {/* Entry Content */}
        <div className={styles.entryContent}>
          <div className={styles.entryText}>
            {entry.text}
          </div>
          
          {/* Processing indicator for thinking entries */}
          {entry.type === 'thinking' && (
            <div className={styles.thinkingIndicator}>
              <div className={styles.thinkingDots}>
                <span style={{ backgroundColor: agent?.color || '#888' }}></span>
                <span style={{ backgroundColor: agent?.color || '#888' }}></span>
                <span style={{ backgroundColor: agent?.color || '#888' }}></span>
              </div>
            </div>
          )}
        </div>

        {/* Agent Connection Line */}
        {agent && entry.type !== 'system' && (
          <div 
            className={styles.entryConnectionLine}
            style={{ backgroundColor: agent.color } as React.CSSProperties}
          />
        )}
      </div>
    );
  };

  return (
    <div className={styles.logContainer}>
      {/* Log Header */}
      <div className={styles.logHeader}>
        <h3 className={styles.logTitle}>Agent Communication Log</h3>
        <div className={styles.logControls}>
          <span className={styles.logStatus}>
            {isRunning ? (
              <>
                <span className={styles.liveDot}></span>
                Live
              </>
            ) : (
              'Archived'
            )}
          </span>
          <span className={styles.logCount}>
            {log.length} entries
          </span>
        </div>
      </div>

      {/* Log Entries */}
      <div 
        ref={logContainerRef}
        className={styles.logEntries}
        role="log"
        aria-live={isRunning ? "polite" : "off"}
        aria-label="Swarm agent communication log"
      >
        {log.length === 0 ? (
          <div className={styles.emptyLog}>
            <div className={styles.emptyLogIcon}>🤖</div>
            <div className={styles.emptyLogText}>
              Waiting for agent communication...
            </div>
          </div>
        ) : (
          log.map((entry, index) => renderLogEntry(entry, index))
        )}
        
        {/* Typing Indicator */}
        {isRunning && (
          <div className={styles.typingIndicator}>
            <div className={styles.typingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className={styles.typingText}>Agents processing...</span>
          </div>
        )}
      </div>

      {/* Log Footer */}
      <div className={styles.logFooter}>
        <div className={styles.logStats}>
          <span>System: {log.filter(e => e.type === 'system').length}</span>
          <span>Outputs: {log.filter(e => e.type === 'output').length}</span>
          <span>Thinking: {log.filter(e => e.type === 'thinking').length}</span>
        </div>
      </div>
    </div>
  );
};

export default SwarmLog;