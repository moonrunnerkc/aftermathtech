import React from 'react';
import { Metadata } from 'next';
import { 
  Brain, Target, Rocket, Shield, Code, Calendar, GitBranch, Cpu, Database, 
  Zap, Eye, Globe, Lock, Sparkles, Satellite, Bot, Network, Microscope,
  Terminal, HardDrive, Users, Mail, Github, Linkedin, Twitter
} from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';

// ==================== METADATA CONFIGURATION ====================

export const metadata: Metadata = generatePageMetadata(
  'About Aftermath Technologies - Bradley Ryan Kinnard',
  'Meet the architect behind autonomous AI systems. Aftermath Technologies builds memory-persistent, offline-first AI that thinks locally and evolves independently.',
  '/about'
);

// ==================== MAIN ABOUT PAGE COMPONENT ====================

export default function AboutPage() {
  
  // ==================== CORE VALUES DATA ====================
  
  const coreValues = [
    {
      icon: Brain,
      title: 'Autonomous Intelligence',
      description: 'Agents think & evolve locally without external dependencies. True AI autonomy through recursive self-improvement and independent reasoning.',
      accent: 'cyan'
    },
    {
      icon: Lock,
      title: 'Privacy by Design',
      description: 'Zero external APIs, full data sovereignty. Your intelligence stays yours—complete offline operation with air-gapped security.',
      accent: 'purple'
    },
    {
      icon: Code,
      title: 'Open Innovation',
      description: 'Real code, real research, public repos. Transparent development that advances the entire field through fearless experimentation.',
      accent: 'pink'
    },
    {
      icon: Globe,
      title: 'Universal Access',
      description: 'Runs on everything from cloud GPUs to air-gapped laptops. Advanced AI capabilities everywhere, without compromise.',
      accent: 'green'
    },
    {
      icon: Sparkles,
      title: 'Offensive Originality',
      description: 'We don\'t recycle Big-Tech patterns—we invent. Breakthrough architectures that redefine what AI can become.',
      accent: 'orange'
    }
  ];

  // ==================== FLAGSHIP SYSTEMS DATA ====================
  
  const flagshipSystems = [
    {
      year: '2024-2025',
      title: 'Sentinel OS',
      description: 'Memory-persistent, offline-first AI operating core designed for zero-trust environments. The foundation for truly autonomous agents.',
      icon: Shield,
      status: 'Active Development',
      tech: ['Rust', 'C++', 'CUDA', 'Zero-Trust'],
      accent: 'cyan'
    },
    {
      year: '2025',
      title: 'Blackbox Mind v3',
      subtitle: 'Meta-Cognitive Synthetic Intelligence+ (MCSI+)',
      description: 'Belief-ecology engine with recursive contradiction tracing and goal-mutation logic. AI that questions its own assumptions.',
      icon: Brain,
      status: 'Research Phase',
      tech: ['PyTorch', 'Belief Networks', 'Recursive Logic'],
      accent: 'purple'
    },
    {
      year: '2025',
      title: 'ROGUENIX',
      description: 'Offline coding assistant with browser chat UI and persistent project memory. Your AI pair programmer that never forgets.',
      icon: Terminal,
      status: 'Beta Development',
      tech: ['TypeScript', 'WebAssembly', 'Local LLMs'],
      accent: 'green'
    },
    {
      year: '2024',
      title: 'Orbital Debris KillGrid',
      description: 'Space-threat prioritization AI demonstrating edge-compute autonomy. Real-world validation of our autonomous decision systems.',
      icon: Satellite,
      status: 'Production Demo',
      tech: ['Python', 'Edge AI', 'Real-time Processing'],
      accent: 'orange'
    },
    {
      year: '2025',
      title: 'AI Agent Licensing Network',
      description: 'Marketplace for licensed synthetic workers trained on-premises. Democratizing AI labor through decentralized intelligence.',
      icon: Network,
      status: 'Conceptual Design',
      tech: ['Federated Learning', 'Blockchain', 'P2P Networks'],
      accent: 'pink'
    }
  ];

  // ==================== TECHNOLOGY STACK DATA ====================
  
  const techStacks = [
    {
      category: 'Core AI/ML',
      icon: Brain,
      technologies: ['Python', 'PyTorch', 'TensorFlow', 'ONNX', 'Llama.cpp'],
      accent: 'cyan'
    },
    {
      category: 'Systems',
      icon: Cpu,
      technologies: ['Rust', 'C++', 'CUDA', 'WebAssembly', 'GPU Acceleration'],
      accent: 'purple'
    },
    {
      category: 'Web Platform',
      icon: Globe,
      technologies: ['TypeScript', 'Next.js', 'Three.js', 'WebGL', 'Alpine.js'],
      accent: 'green'
    },
    {
      category: 'Edge Computing',
      icon: HardDrive,
      technologies: ['Local Inference', 'Zero-Trust Sandboxing', 'Offline Processing'],
      accent: 'orange'
    }
  ];

  // ==================== RESEARCH FOCUS DATA ====================
  
  const researchFocus = [
    {
      icon: Microscope,
      title: 'Belief-Ecology Cognitive Architecture',
      description: 'Contradiction engines and recursive belief systems that enable AI to develop and evolve worldviews autonomously.',
      accent: 'cyan'
    },
    {
      icon: Shield,
      title: 'Memory-Persistent Autonomous Agents',
      description: 'Swarm coordination and persistent memory systems for agents that maintain continuity across sessions.',
      accent: 'purple'
    },
    {
      icon: Lock,
      title: 'Offline/Edge AI Security',
      description: 'Encrypted local LLMs, federated synchronization, and air-gapped intelligence systems.',
      accent: 'pink'
    }
  ];

  // ==================== UTILITY FUNCTIONS ====================
  
  /**
   * Get accent color classes based on accent type
   */
  const getAccentClasses = (accent: string) => {
    const accents = {
      cyan: 'border-cyan-500/30 hover:border-cyan-400/50 from-cyan-500 to-cyan-600 text-cyan-400',
      purple: 'border-purple-500/30 hover:border-purple-400/50 from-purple-500 to-purple-600 text-purple-400',
      pink: 'border-pink-500/30 hover:border-pink-400/50 from-pink-500 to-pink-600 text-pink-400',
      green: 'border-green-500/30 hover:border-green-400/50 from-green-500 to-green-600 text-green-400',
      orange: 'border-orange-500/30 hover:border-orange-400/50 from-orange-500 to-orange-600 text-orange-400'
    };
    return accents[accent as keyof typeof accents] || accents.cyan;
  };

  /**
   * Get status indicator styling
   */
  const getStatusStyling = (status: string) => {
    const statusStyles = {
      'Active Development': 'text-green-400 bg-green-500/20 border-green-500/30',
      'Research Phase': 'text-purple-400 bg-purple-500/20 border-purple-500/30',
      'Beta Development': 'text-blue-400 bg-blue-500/20 border-blue-500/30',
      'Production Demo': 'text-orange-400 bg-orange-500/20 border-orange-500/30',
      'Conceptual Design': 'text-pink-400 bg-pink-500/20 border-pink-500/30'
    };
    return statusStyles[status as keyof typeof statusStyles] || 'text-gray-400 bg-gray-500/20 border-gray-500/30';
  };

  // ==================== COMPONENT RENDER ====================
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* ==================== BACKGROUND EFFECTS ==================== */}
      
      {/* Animated grid pattern */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>
      
      {/* Floating geometric shapes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      
      <section className="relative py-24 px-6 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-20">
          {/* Mission badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-8 py-3 border border-cyan-500/40 mb-8 backdrop-blur-sm">
            <Target className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-300 font-semibold">Our Mission</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
          
          {/* Main headline */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-none tracking-tight">
            BUILDING THE
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              FUTURE OF AI
            </span>
          </h1>
          
          {/* Mission statement */}
          <div className="max-w-5xl mx-auto mb-12">
            <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed mb-6 font-light">
              Creating <span className="text-cyan-400 font-semibold">autonomous AI systems</span> that work offline, 
              respect privacy, and put the power of artificial intelligence directly into the hands of users.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              No cloud dependencies. No data harvesting. No compromise.
              <br />
              <span className="text-purple-400">Just pure, autonomous intelligence.</span>
            </p>
          </div>

          {/* Founder attribution */}
          <div className="flex items-center justify-center gap-4 text-gray-400 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500"></div>
            <span className="text-sm">Architected by</span>
            <a 
              href="https://github.com/moonrunnerkc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              Bradley Ryan Kinnard
            </a>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/50 transition-all group">
              <div className="text-4xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">100%</div>
              <div className="text-gray-300">Offline Capable</div>
            </div>
            <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all group">
              <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform">0ms</div>
              <div className="text-gray-300">Network Latency</div>
            </div>
            <div className="bg-black/40 backdrop-blur-lg border border-pink-500/30 rounded-xl p-6 hover:border-pink-400/50 transition-all group">
              <div className="text-4xl font-bold text-pink-400 mb-2 group-hover:scale-110 transition-transform">∞</div>
              <div className="text-gray-300">Privacy Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OUR JOURNEY - FLAGSHIP SYSTEMS ==================== */}
      
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From concept to production—building the infrastructure for truly autonomous AI
            </p>
          </div>
          
          <div className="space-y-8">
            {flagshipSystems.map((system, index) => (
              <div
                key={index}
                className={`bg-black/40 backdrop-blur-lg border rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 group ${getAccentClasses(system.accent)}`}
              >
                <div className="flex flex-col lg:flex-row items-start gap-6">
                  {/* Icon and year */}
                  <div className="flex-shrink-0 flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${getAccentClasses(system.accent)} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <system.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <div className={`text-xl font-bold ${getAccentClasses(system.accent).split(' ')[3]}`}>
                        {system.year}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs border ${getStatusStyling(system.status)}`}>
                        {system.status}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2">{system.title}</h3>
                      {system.subtitle && (
                        <h4 className="text-lg text-gray-300 font-medium mb-2">{system.subtitle}</h4>
                      )}
                      <p className="text-gray-300 leading-relaxed text-lg">{system.description}</p>
                    </div>
                    
                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-2">
                      {system.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-800/60 border border-gray-600/50 rounded-lg text-sm text-gray-300 hover:border-gray-500 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CORE VALUES SECTION ==================== */}
      
      <section className="py-24 px-6 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The principles that drive every line of code, every architectural decision, every breakthrough
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`bg-black/40 backdrop-blur-lg border rounded-2xl p-8 hover:scale-105 transition-all duration-300 group ${getAccentClasses(value.accent)} h-full`}
              >
                <div className="flex flex-col h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getAccentClasses(value.accent)} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed flex-1">{value.description}</p>
                  
                  {/* Decorative accent line */}
                  <div className={`mt-6 h-1 w-full bg-gradient-to-r ${getAccentClasses(value.accent)} rounded-full opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TECHNOLOGY STACK SECTION ==================== */}
      
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Battle-tested tools and cutting-edge innovations working in harmony
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStacks.map((stack, index) => (
              <div
                key={index}
                className={`bg-black/40 backdrop-blur-lg border rounded-xl p-6 hover:scale-105 transition-all duration-300 group ${getAccentClasses(stack.accent)}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 bg-gradient-to-br ${getAccentClasses(stack.accent)} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stack.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold ${getAccentClasses(stack.accent).split(' ')[3]}`}>
                    {stack.category}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {stack.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="text-gray-300 text-sm py-2 px-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== RESEARCH FOCUS SECTION ==================== */}
      
      <section className="py-24 px-6 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5"></div>
        
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Research Focus Areas
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Pushing the boundaries of what artificial intelligence can become
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {researchFocus.map((focus, index) => (
              <div
                key={index}
                className={`bg-black/40 backdrop-blur-lg border rounded-xl p-8 hover:scale-105 transition-all duration-300 text-center group ${getAccentClasses(focus.accent)}`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${getAccentClasses(focus.accent)} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <focus.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">{focus.title}</h3>
                <p className="text-gray-300 leading-relaxed">{focus.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CALL TO ACTION SECTION ==================== */}
      
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-12 border border-cyan-500/30 backdrop-blur-lg relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_70%)]"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8">
                <Rocket className="w-20 h-20 text-cyan-400 animate-pulse" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join the AI Revolution
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Be part of the movement toward truly autonomous, privacy-first artificial intelligence.
                <br />
                <span className="text-cyan-400">The future doesn't wait.</span>
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <a
                  href="/projects"
                  className="group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-cyan-500/25"
                >
                  <span>Explore Our Tech</span>
                  <Code className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </a>
                
                <a
                  href="mailto:bradkinnard@proton.me"
                  className="group border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
                >
                  <span>Get in Touch</span>
                  <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              </div>

              {/* Newsletter CTA */}
              <div className="max-w-md mx-auto">
                <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">Stay Updated</h3>
                  <p className="text-purple-300 text-sm mb-4">
                    Get black-site intel on our latest AI drops.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="flex-1 bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    />
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-4 py-2 rounded-lg font-medium transition-all">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER CONTACT SECTION ==================== */}
      
      <footer className="py-16 px-6 relative z-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                AFTERMATH
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Building the next generation of offline-first, autonomous AI systems. 
                Empowering developers and researchers with tools that work anywhere, anytime.
              </p>
              <p className="text-xs text-gray-500">
                Aftermath Technologies LLC<br />
                Denver, Colorado
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm">
                <a href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors block">About</a>
                <a href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors block">Blog</a>
                <a href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors block">Contact</a>
                <a href="/projects" className="text-gray-400 hover:text-cyan-400 transition-colors block">Projects</a>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm">
                <a href="https://github.com/moonrunnerkc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors block">
                  Documentation
                </a>
                <a href="https://github.com/moonrunnerkc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors block">
                  GitHub
                </a>
                <a href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors block">Research</a>
                <a href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors block">Support</a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/moonrunnerkc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/bradkinnard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://twitter.com/AftermathTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="mailto:bradkinnard@proton.me"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 Aftermath Technologies LLC. All rights reserved. 
              <span className="text-cyan-400 ml-2">Built with autonomous intelligence.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}