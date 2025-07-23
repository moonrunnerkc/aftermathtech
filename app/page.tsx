/**
 * Homepage Component - Mobile-Optimized with Fixed Layout Issues
 * 
 * Key Mobile Fixes:
 * - Fixed "Live from GitHub" section layout for mobile
 * - Improved modal positioning and sizing
 * - Better responsive spacing and typography
 * - Enhanced touch targets for mobile interaction
 * - Proper container constraints to prevent overflow
 * - Full-screen modal for LLMChat on mobile
 * 
 * File: app/page.tsx
 */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Shield, Zap, Terminal, X } from 'lucide-react';
import Link from 'next/link';
import AgentVisualizer from '@/components/AgentVisualizer';
import LLMChat from '@/components/LLMChat';
import ProjectFeed from '@/components/ProjectFeed';

// Enhanced Three.js Particle System Component
import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'

interface FloatingParticlesProps {
  particleCount?: number
  speed?: number
  size?: number
  colors?: string[]
  className?: string
}

// Enhanced CSS-based Particle System Component (fallback)
const EnhancedFloatingParticles: React.FC<FloatingParticlesProps> = ({
  particleCount = 150,
  speed = 0.8,
  size = 3,
  colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0080', '#8000ff', '#00ff80'],
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const createParticle = () => {
      if (!mountRef.current) return
      
      const particle = document.createElement('div')
      particle.className = 'enhanced-particle'
      
      // Random properties
      const randomSize = Math.random() * size + 1
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      const randomX = Math.random() * 100
      const randomDuration = Math.random() * 20 + 15
      const randomDelay = Math.random() * 5
      
      // Style the particle
      particle.style.cssText = `
        position: absolute;
        left: ${randomX}%;
        bottom: -10px;
        width: ${randomSize}px;
        height: ${randomSize}px;
        background: ${randomColor};
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 ${randomSize * 3}px ${randomColor};
        animation: floatUp ${randomDuration}s linear infinite;
        animation-delay: ${randomDelay}s;
        z-index: 10;
      `
      
      mountRef.current.appendChild(particle)
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      }, (randomDuration + randomDelay) * 1000)
    }

    // Create initial particles
    for (let i = 0; i < particleCount * 0.3; i++) {
      setTimeout(() => createParticle(), i * 100)
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 800)

    return () => {
      clearInterval(interval)
      if (mountRef.current) {
        mountRef.current.innerHTML = ''
      }
    }
  }, [particleCount, speed, size, colors])

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 pointer-events-none z-5 ${className}`}
      style={{
        background: 'transparent',
        overflow: 'hidden'
      }}
    />
  )
}

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Prevent body scroll when chat modal is open (mobile optimization)
  useEffect(() => {
    if (showChat) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
    };
  }, [showChat]);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Offline AI Models",
      description: "Run advanced LLMs entirely in your browser with WebAssembly. No server dependencies, complete privacy.",
      color: "cyan"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Autonomous Security",
      description: "Self-healing systems that adapt and protect without human intervention. AI that thinks ahead.",
      color: "purple"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Processing",
      description: "Zero-latency inference with optimized WASM runtimes. Faster than cloud solutions.",
      color: "pink"
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Developer First",
      description: "Open source tools and APIs designed by researchers, for researchers and engineers.",
      color: "cyan"
    }
  ];

  return (
    <div className="min-h-screen cyber-bg text-white overflow-x-hidden relative">
      {/* Enhanced Three.js Particles - Reduced on mobile */}
      <div className="hidden sm:block">
        <EnhancedFloatingParticles 
          particleCount={200}
          speed={1.0}
          size={3.5}
          colors={['#00ffff', '#ff00ff', '#ffff00', '#ff0080', '#8000ff', '#00ff80']}
          className="particles-wrapper"
        />
      </div>
      
      {/* Mobile-optimized particles */}
      <div className="block sm:hidden">
        <EnhancedFloatingParticles 
          particleCount={50}
          speed={0.7}
          size={2}
          colors={['#00ffff', '#ff00ff', '#8000ff']}
          className="particles-wrapper opacity-30"
        />
      </div>
      
      {/* Reduced opacity grid pattern */}
      <div className="fixed inset-0 z-0 grid-pattern opacity-10"></div>

      {/* 3D Background Visualizer - Mobile optimized */}
      <div className="fixed inset-0 z-5 opacity-15 hidden lg:block">
        <div className="w-full h-full max-h-screen overflow-hidden">
          <AgentVisualizer />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20">
        {/* Hero Section - Mobile optimized spacing */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative">
          {/* Better mobile spacing container */}
          <div className="max-w-6xl mx-auto text-center w-full" style={{ paddingTop: 'clamp(4rem, 15vh, 8rem)' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              {/* Mobile-optimized title */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-slide-in-up neon-text-reduced leading-tight">
                AFTERMATH TECHNOLOGIES
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light mb-6 sm:mb-8 text-gray-300 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                Autonomous AI Systems
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed animate-slide-in-up px-4" style={{ animationDelay: '0.4s' }}>
                Building the next generation of offline-first, autonomous AI that runs everywhere.<br></br> 
                <span className="text-cyan-400">Complete Privacy / Your data stays with you.</span>
              </p>
            </motion.div>

            {/* Mobile-optimized CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4"
            >
              <Link
                href="/projects"
                className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-3 text-white border-2 border-purple-500/50 hover:border-purple-400 hover:bg-purple-400/10 backdrop-blur-sm min-h-[50px]"
              >
                <span>View Projects</span>
                <Terminal className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-6 transition-transform duration-300" />
              </Link>
            </motion.div>

            {/* Hero Stats - Mobile responsive grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4"
            >
              <div className="cyber-card p-4 sm:p-6 rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">100%</div>
                <div className="text-sm sm:text-base text-gray-400">Offline Capable</div>
              </div>
              <div className="cyber-card p-4 sm:p-6 rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">0ms</div>
                <div className="text-sm sm:text-base text-gray-400">Network Latency</div>
              </div>
              <div className="cyber-card p-4 sm:p-6 rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-pink-400 mb-2">∞</div>
                <div className="text-sm sm:text-base text-gray-400">Privacy Guaranteed</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section - Mobile optimized */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-20 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent px-4"
            >
              Why Aftermath?
            </motion.h3>
            
            {/* Mobile-responsive features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="cyber-card group p-6 sm:p-8 rounded-xl transition-all duration-500 hover:transform hover:scale-105 animate-pulse-glow"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <div className={`mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    feature.color === 'cyan' ? 'text-cyan-400' :
                    feature.color === 'purple' ? 'text-purple-400' :
                    feature.color === 'pink' ? 'text-pink-400' : 'text-cyan-400'
                  }`}>
                    {feature.icon}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                  
                  {/* Feature decoration */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Projects Feed - FIXED MOBILE LAYOUT */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-12 sm:mb-20 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent neon-text-purple px-4"
            >
              Live from GitHub
            </motion.h3>
            
            {/* FIXED: Mobile-optimized container with proper constraints */}
            <div className="w-full max-w-full">
              <div className="cyber-card p-4 sm:p-6 lg:p-8 rounded-2xl mx-auto overflow-hidden">
                {/* Mobile-aware ProjectFeed container */}
                <div className="w-full overflow-x-auto">
                  <ProjectFeed />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action - Mobile optimized */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="cyber-card p-8 sm:p-12 rounded-2xl"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-white neon-text">
                Ready to build the future?
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed px-4">
                Join us in creating AI systems that work <span className="text-cyan-400">anywhere</span>, 
                <span className="text-purple-400"> anytime</span>, 
                <span className="text-pink-400"> without compromise</span>.
              </p>
              
              {/* Mobile-responsive CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg hover:shadow-purple-500/25 min-h-[50px] flex items-center justify-center"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 text-white border-2 border-purple-400/50 hover:border-purple-400 hover:bg-purple-400/10 min-h-[50px] flex items-center justify-center"
                >
                  Our Story
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* FIXED: Mobile-optimized LLM Chat Modal */}
      {showChat && (
        <>
          {/* Full-screen backdrop for mobile */}
          <div className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-lg" />
          
          {/* Modal container - Full screen on mobile, centered on desktop */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            
            {/* Chat modal - Mobile responsive */}
            <div className="w-full h-full sm:w-full sm:max-w-6xl sm:h-[90vh] bg-gray-900/95 backdrop-blur-md border-0 sm:border-2 sm:border-cyan-400/50 rounded-none sm:rounded-2xl shadow-2xl shadow-cyan-500/20 flex flex-col overflow-hidden">
              
              {/* Modal header - Mobile optimized */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-cyan-400/30 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 flex-shrink-0">
                <h3 className="text-xl sm:text-2xl font-bold text-white neon-text">Local AI Assistant</h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                </button>
              </div>
              
              {/* Chat content - Full height with proper overflow */}
              <div className="flex-1 min-h-0 overflow-hidden">
                <LLMChat />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Ambient lighting effects - Reduced on mobile */}
      <div className="fixed inset-0 pointer-events-none z-1">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-pink-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Performance indicator - Hidden on mobile */}
      <div className="hidden lg:block fixed bottom-4 right-4 z-50 opacity-30 text-xs text-cyan-400">
        <div className="bg-black/50 px-2 py-1 rounded backdrop-blur">
          Enhanced Particles Active
        </div>
      </div>
    </div>
  );
}