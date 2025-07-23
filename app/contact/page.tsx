// app/contact/page.tsx - FIXED CONTACT PAGE WITH WORKING PARTICLES
import { Metadata } from 'next'
import ContactClient from './ContactClient'
import ContactBackground from './ContactBackground'

// ==================== METADATA CONFIGURATION ====================

export const metadata: Metadata = {
  title: 'Contact Aftermath Technologies - Bradley Ryan Kinnard | AI Architect',
  description: 'Get in touch with Bradley Ryan Kinnard, Founder & AI Architect at Aftermath Technologies. Discuss autonomous AI systems, offline-first solutions, and cutting-edge AI research.',
  keywords: 'contact Aftermath Technologies, Bradley Ryan Kinnard, AI consulting, autonomous AI, offline AI solutions, Denver Colorado AI',
  openGraph: {
    title: 'Contact Aftermath Technologies - Bradley Ryan Kinnard',
    description: 'Reach out to discuss autonomous AI systems and offline-first technology solutions.',
    type: 'website',
    url: '/contact',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Aftermath Technologies'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Aftermath Technologies',
    description: 'Discuss autonomous AI systems with Bradley Ryan Kinnard',
    images: ['/og-contact.jpg']
  }
}

// ==================== CONTACT CONFIGURATION ====================

const contactInfo = {
  founder: {
    name: 'Bradley Ryan Kinnard',
    title: 'Founder & AI Architect',
    email: 'bradkinnard@proton.me',
    bio: 'Pioneering autonomous AI systems and offline-first architectures'
  },
  company: {
    name: 'Aftermath Technologies LLC',
    location: 'Denver, Colorado',
    timezone: 'Mountain Time (MT)',
    founded: '2024',
    focus: 'Autonomous AI Systems & Offline-First Solutions'
  },
  contactMethods: [
    {
      method: 'email',
      title: 'Email (Preferred)',
      subtitle: 'Direct line to Bradley',
      value: 'bradkinnard@proton.me',
      description: 'Best way to reach us - expect a response within 24 hours',
      icon: 'mail',
      isPrimary: true,
      responseTime: '< 24 hours'
    },
    {
      method: 'github',
      title: 'GitHub',
      subtitle: 'Open Source & Research',
      value: 'github.com/moonrunnerkc',
      description: 'Explore our cutting-edge AI research and open-source projects',
      icon: 'github',
      isPrimary: false,
      responseTime: null
    },
    {
      method: 'location',
      title: 'Location',
      subtitle: 'Remote-First Operations',
      value: 'Denver, Colorado',
      description: 'Mountain timezone, serving clients globally',
      icon: 'location',
      isPrimary: false,
      responseTime: null
    }
  ],
  socialMedia: {
    linkedin: 'https://www.linkedin.com/in/bradkinnard',
    twitter: 'https://twitter.com/AftermathTech',
    github: 'https://github.com/moonrunnerkc'
  },
  businessInfo: {
    operatingHours: {
      primary: 'Monday - Friday: 9:00 AM - 6:00 PM MT',
      secondary: 'Emergency consultations available 24/7'
    },
    responsePolicy: 'All inquiries receive a response within 24 hours',
    consultationTypes: [
      'AI Architecture Consulting',
      'Autonomous Systems Design',
      'Offline-First AI Implementation',
      'Research Collaboration',
      'Technical Partnership',
      'Custom AI Development'
    ]
  }
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* ==================== BACKGROUND EFFECTS ==================== */}
      
      {/* Enhanced Floating Particles - Client Component */}
      <ContactBackground />
      
      {/* ==================== MAIN CONTENT ==================== */}
      
      <div className="relative z-20">
        
        {/* ==================== HERO HEADER SECTION ==================== */}
        
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            
            {/* Contact badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-8 py-4 border border-cyan-500/40 mb-8 backdrop-blur-sm">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-300 font-semibold text-lg">Available for Consultation</span>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>

            {/* Main headline */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                GET IN
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                TOUCH
              </span>
            </h1>

            {/* Subtitle and description */}
            <div className="max-w-5xl mx-auto mb-12">
              <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed mb-6 font-light">
                Ready to discuss <span className="text-cyan-400 font-semibold">autonomous AI systems</span>, 
                <span className="text-purple-400 font-semibold"> offline-first architectures</span>, or 
                <span className="text-pink-400 font-semibold"> breakthrough AI research</span>?
              </p>
              <div className="space-y-3">
                <p className="text-xl text-gray-300 leading-relaxed">
                  <span className="text-cyan-400 font-medium">Email is our preferred communication method</span> — 
                  you'll be speaking directly with Bradley Ryan Kinnard.
                </p>
                <p className="text-lg text-gray-400">
                  Founder & AI Architect at Aftermath Technologies • Denver, Colorado
                </p>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="mb-16">
              <a
                href="mailto:bradkinnard@proton.me?subject=AI%20Consultation%20Request"
                className="group inline-flex items-center gap-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-cyan-500/25 hover:scale-105"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>bradkinnard@proton.me</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/50 transition-all group">
                <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">24h</div>
                <div className="text-gray-300 text-sm">Response Time</div>
              </div>
              <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all group">
                <div className="text-3xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform">100%</div>
                <div className="text-gray-300 text-sm">Remote-First</div>
              </div>
              <div className="bg-black/40 backdrop-blur-lg border border-green-500/30 rounded-xl p-6 hover:border-green-400/50 transition-all group">
                <div className="text-3xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform">Global</div>
                <div className="text-gray-300 text-sm">Client Reach</div>
              </div>
              <div className="bg-black/40 backdrop-blur-lg border border-orange-500/30 rounded-xl p-6 hover:border-orange-400/50 transition-all group">
                <div className="text-3xl font-bold text-orange-400 mb-2 group-hover:scale-110 transition-transform">24/7</div>
                <div className="text-gray-300 text-sm">Emergency Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== CONTACT METHODS SECTION ==================== */}
        
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                How to Reach Us
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Multiple ways to connect, but email gets the fastest response
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactInfo.contactMethods.map((method, index) => {
                const delay = index * 0.1
                const isEmail = method.method === 'email'
                
                return (
                  <div
                    key={method.method}
                    className={`relative group ${
                      isEmail 
                        ? 'bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-2 border-cyan-500/40 hover:border-cyan-400/60' 
                        : 'bg-black/40 border border-gray-700/50 hover:border-gray-600/50'
                    } backdrop-blur-lg rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      isEmail ? 'hover:shadow-cyan-500/20' : 'hover:shadow-gray-500/10'
                    }`}
                    style={{ animationDelay: `${delay}s` }}
                  >
                    {/* Primary badge for email */}
                    {isEmail && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        PREFERRED
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                      isEmail 
                        ? 'bg-gradient-to-br from-cyan-500 to-purple-500' 
                        : 'bg-gray-700'
                    }`}>
                      {method.icon === 'mail' && (
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      {method.icon === 'github' && (
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      )}
                      {method.icon === 'location' && (
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className={`text-xl font-bold mb-2 ${isEmail ? 'text-cyan-400' : 'text-white'}`}>
                        {method.title}
                      </h3>
                      <p className={`text-sm mb-3 ${isEmail ? 'text-cyan-300' : 'text-gray-400'}`}>
                        {method.subtitle}
                      </p>
                      <div className={`font-mono text-lg mb-4 ${isEmail ? 'text-white' : 'text-gray-300'}`}>
                        {method.value}
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {method.description}
                      </p>
                      {method.responseTime && (
                        <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-xs font-medium">{method.responseTime}</span>
                        </div>
                      )}
                    </div>

                    {/* Action button for email */}
                    {isEmail && (
                      <div className="mt-6">
                        <a
                          href={`mailto:${method.value}?subject=AI%20Consultation%20Request`}
                          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-6 py-3 rounded-lg font-medium transition-all"
                        >
                          <span>Send Email</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ==================== CONTACT FORM AND INFO ==================== */}
        
        <ContactClient contactInfo={contactInfo} />

        {/* ==================== FOOTER SECTION ==================== */}
        
        <section className="py-16 px-6 border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Company info */}
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  AFTERMATH
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Pioneering autonomous AI systems that operate offline-first, 
                  respect privacy, and put the power of artificial intelligence 
                  directly into the hands of users.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>Aftermath Technologies LLC</p>
                  <p>Denver, Colorado • Mountain Time</p>
                  <p>Founded 2024</p>
                </div>
              </div>

              {/* Consultation types */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6">Consultation Areas</h3>
                <div className="space-y-3">
                  {contactInfo.businessInfo.consultationTypes.map((type, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social and additional info */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6">Connect & Follow</h3>
                <div className="flex gap-4 mb-6">
                  <a
                    href={contactInfo.socialMedia.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors group"
                  >
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href={contactInfo.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors group"
                  >
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href={contactInfo.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors group"
                  >
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
                
                <div className="space-y-3 text-sm text-gray-400">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {contactInfo.businessInfo.operatingHours.primary}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {contactInfo.businessInfo.responsePolicy}
                  </p>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800/50 mt-12 pt-8 text-center">
              <p className="text-gray-500 text-sm">
                © 2024 Aftermath Technologies LLC. All rights reserved.
                <span className="text-cyan-400 ml-2">Built with autonomous intelligence.</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}