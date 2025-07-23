// app/contact/ContactBackground.tsx - CLIENT COMPONENT FOR PARTICLE EFFECTS
'use client'

import React, { useRef, useEffect } from 'react'

// ==================== ENHANCED PARTICLE SYSTEM ====================

interface FloatingParticlesProps {
  particleCount?: number
  speed?: number
  size?: number
  colors?: string[]
  className?: string
}

const EnhancedFloatingParticles: React.FC<FloatingParticlesProps> = ({
  particleCount = 80,
  speed = 0.8,
  size = 2,
  colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0080', '#8000ff', '#00ff80'],
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Create CSS keyframes for floating animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes floatUp {
        from {
          transform: translateY(100vh) translateX(0px);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        to {
          transform: translateY(-100px) translateX(var(--random-x));
          opacity: 0;
        }
      }
      
      @keyframes floatSide {
        0%, 100% {
          transform: translateX(0px);
        }
        50% {
          transform: translateX(var(--drift-x));
        }
      }
      
      .enhanced-particle {
        position: absolute;
        pointer-events: none;
        border-radius: 50%;
        z-index: 5;
        animation: floatUp var(--duration) linear infinite;
        animation-delay: var(--delay);
      }
    `
    document.head.appendChild(style)

    const createParticle = () => {
      if (!mountRef.current) return
      
      const particle = document.createElement('div')
      particle.className = 'enhanced-particle'
      
      // Random properties
      const randomSize = Math.random() * size + 0.5
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      const randomX = Math.random() * 100
      const randomDuration = Math.random() * 15 + 10
      const randomDelay = Math.random() * 5
      const driftX = (Math.random() - 0.5) * 100 // Side drift
      
      // Style the particle with CSS custom properties
      particle.style.cssText = `
        left: ${randomX}%;
        bottom: -10px;
        width: ${randomSize}px;
        height: ${randomSize}px;
        background: ${randomColor};
        box-shadow: 0 0 ${randomSize * 4}px ${randomColor}40;
        --duration: ${randomDuration}s;
        --delay: ${randomDelay}s;
        --drift-x: ${driftX}px;
        --random-x: ${(Math.random() - 0.5) * 200}px;
      `
      
      mountRef.current.appendChild(particle)
      
      // Remove particle after animation completes
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      }, (randomDuration + randomDelay) * 1000)
    }

    // Create initial burst of particles
    for (let i = 0; i < particleCount * 0.2; i++) {
      setTimeout(() => createParticle(), i * 50)
    }

    // Continue creating particles at intervals
    const interval = setInterval(createParticle, 600)

    // Cleanup function
    return () => {
      clearInterval(interval)
      if (mountRef.current) {
        mountRef.current.innerHTML = ''
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [particleCount, speed, size, colors])

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{
        background: 'transparent',
        zIndex: 5
      }}
    />
  )
}

// ==================== MAIN BACKGROUND COMPONENT ====================

export default function ContactBackground() {
  return (
    <>
      {/* Enhanced Floating Particles - Same as HomePage */}
      <EnhancedFloatingParticles 
        particleCount={120}
        speed={1.0}
        size={3}
        colors={['#00ffff', '#ff00ff', '#ffff00', '#ff0080', '#8000ff', '#00ff80']}
        className="particles-wrapper"
      />
      
      {/* Reduced opacity grid pattern - Same as HomePage */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>
      
      {/* Ambient lighting effects - Same as HomePage */}
      <div className="fixed inset-0 pointer-events-none z-1">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </>
  )
}