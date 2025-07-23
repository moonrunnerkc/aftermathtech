// components/ResourceHUD.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Monitor, Cpu, HardDrive } from 'lucide-react';
import { ResourceStats } from '../hooks/useSwarmOrchestrator';

interface ResourceHUDProps {
  stats: ResourceStats;
  isRunning: boolean;
}

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  heapSize: number;
  jsHeapSizeLimit: number;
}

const ResourceHUD: React.FC<ResourceHUDProps> = ({ stats, isRunning }) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    heapSize: 0,
    jsHeapSizeLimit: 0
  });
  
  const [lastFrameTime, setLastFrameTime] = useState(performance.now());
  const [frameCount, setFrameCount] = useState(0);

  // Update performance metrics with better throttling
  useEffect(() => {
    if (!isRunning) return;

    let animationId: number;
    let lastUpdate = performance.now();
    let frameCount = 0;

    const updateMetrics = () => {
      const now = performance.now();
      frameCount++;
      
      // Update FPS every 2 seconds instead of every second
      if (now - lastUpdate >= 2000) {
        const fps = Math.round((frameCount * 1000) / (now - lastUpdate));
        frameCount = 0;
        lastUpdate = now;
        
        // Get memory info if available (Chrome) with error handling
        let memoryInfo = {
          memoryUsage: 0,
          heapSize: 0,
          jsHeapSizeLimit: 0
        };
        
        try {
          if ('memory' in performance) {
            const memory = (performance as any).memory;
            memoryInfo = {
              memoryUsage: memory.usedJSHeapSize || 0,
              heapSize: memory.totalJSHeapSize || 0,
              jsHeapSizeLimit: memory.jsHeapSizeLimit || 0
            };
          }
        } catch (error) {
          console.warn('Memory API unavailable:', error);
        }
        
        setMetrics({
          fps: Math.max(1, Math.min(60, fps)),
          ...memoryInfo
        });
      }
      
      if (isRunning) {
        animationId = requestAnimationFrame(updateMetrics);
      }
    };

    animationId = requestAnimationFrame(updateMetrics);
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isRunning]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    const seconds = ms / 1000;
    if (seconds < 60) return `${seconds.toFixed(1)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getPerformanceColor = (value: number, thresholds: { good: number; warning: number }): string => {
    if (value <= thresholds.good) return '#4ade80'; // green
    if (value <= thresholds.warning) return '#fbbf24'; // yellow
    return '#ef4444'; // red
  };

  const getCpuUsagePercentage = (): number => {
    // Estimate CPU usage based on processing time and frame rate
    const expectedFrameTime = 1000 / 60; // 16.67ms for 60fps
    const actualFrameTime = metrics.fps > 0 ? 1000 / metrics.fps : expectedFrameTime;
    return Math.min(100, (actualFrameTime / expectedFrameTime) * 100);
  };

  const getMemoryUsagePercentage = (): number => {
    if (metrics.jsHeapSizeLimit === 0) return 0;
    return (metrics.memoryUsage / metrics.jsHeapSizeLimit) * 100;
  };

  return (
    <div className={`${styles.resourceHUD} ${isRunning ? styles.active : styles.inactive}`}>
      {/* HUD Header */}
      <div className={styles.hudHeader}>
        <Monitor size={16} />
        <span className={styles.hudTitle}>Performance Monitor</span>
        <div className={`${styles.hudStatus} ${isRunning ? styles.running : styles.stopped}`}>
          {isRunning ? 'LIVE' : 'PAUSED'}
        </div>
      </div>

      {/* Resource Metrics */}
      <div className={styles.hudMetrics}>
        {/* CPU Usage */}
        <div className={styles.metric}>
          <div className={styles.metricHeader}>
            <Cpu size={14} />
            <span className={styles.metricLabel}>CPU Time</span>
          </div>
          <div className={styles.metricValue}>
            <span 
              className={styles.metricNumber}
              style={{ 
                color: getPerformanceColor(stats.cpuTimeMs, { good: 5000, warning: 15000 })
              }}
            >
              {formatTime(stats.cpuTimeMs)}
            </span>
          </div>
          <div className={styles.metricBar}>
            <div 
              className={styles.metricFill}
              style={{
                width: `${Math.min(100, getCpuUsagePercentage())}%`,
                backgroundColor: getPerformanceColor(getCpuUsagePercentage(), { good: 50, warning: 80 })
              }}
            />
          </div>
        </div>

        {/* Memory Usage */}
        <div className={styles.metric}>
          <div className={styles.metricHeader}>
            <HardDrive size={14} />
            <span className={styles.metricLabel}>VRAM</span>
          </div>
          <div className={styles.metricValue}>
            <span 
              className={styles.metricNumber}
              style={{ 
                color: getPerformanceColor(stats.vramMB, { good: 100, warning: 500 })
              }}
            >
              {stats.vramMB} MB
            </span>
          </div>
          <div className={styles.metricBar}>
            <div 
              className={styles.metricFill}
              style={{
                width: `${Math.min(100, getMemoryUsagePercentage())}%`,
                backgroundColor: getPerformanceColor(getMemoryUsagePercentage(), { good: 50, warning: 80 })
              }}
            />
          </div>
        </div>

        {/* FPS */}
        <div className={styles.metric}>
          <div className={styles.metricHeader}>
            <Monitor size={14} />
            <span className={styles.metricLabel}>FPS</span>
          </div>
          <div className={styles.metricValue}>
            <span 
              className={styles.metricNumber}
              style={{ 
                color: getPerformanceColor(60 - metrics.fps, { good: 10, warning: 30 })
              }}
            >
              {metrics.fps}
            </span>
          </div>
          <div className={styles.metricBar}>
            <div 
              className={styles.metricFill}
              style={{
                width: `${(metrics.fps / 60) * 100}%`,
                backgroundColor: getPerformanceColor(60 - metrics.fps, { good: 10, warning: 30 })
              }}
            />
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      {metrics.heapSize > 0 && (
        <div className={styles.hudDetails}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Heap Size:</span>
            <span className={styles.detailValue}>{formatBytes(metrics.heapSize)}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Heap Limit:</span>
            <span className={styles.detailValue}>{formatBytes(metrics.jsHeapSizeLimit)}</span>
          </div>
        </div>
      )}

      {/* Last Update */}
      <div className={styles.hudFooter}>
        <span className={styles.lastUpdate}>
          Updated: {new Date(stats.lastUpdate).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ResourceHUD;