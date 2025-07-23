/**
 * Header Component - Fully Mobile-Responsive Navigation
 * 
 * Key Mobile Optimizations:
 * - Collapsible mobile menu with proper z-index
 * - Touch-optimized button sizes (44px minimum)
 * - Improved dropdown handling for mobile
 * - Better backdrop and overlay management
 * - Scroll-aware header styling
 * - Proper accessibility features
 * 
 * File: components/Header.tsx
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Brain, 
  Code, 
  BookOpen, 
  MessageSquare, 
  Users, 
  Github,
  ExternalLink,
  ChevronDown,
  Zap
} from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsResourcesOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setIsResourcesOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsResourcesOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: <Brain className="w-4 h-4" /> },
    { href: '/about', label: 'About', icon: <Users className="w-4 h-4" /> },
    { href: '/projects', label: 'Projects', icon: <Code className="w-4 h-4" /> },
    { href: '/blog', label: 'Blog', icon: <BookOpen className="w-4 h-4" /> },
    { 
      href: '/resources', 
      label: 'Resources',
      icon: <BookOpen className="w-4 h-4" />,
      hasDropdown: true,
      dropdownItems: [
        { href: '/resources', label: 'All Resources', icon: <BookOpen className="w-4 h-4" /> },
        { href: '/resources/docs', label: 'Documentation', icon: <BookOpen className="w-4 h-4" /> },
        { href: '/resources/tutorials', label: 'Tutorials', icon: <Code className="w-4 h-4" /> },
        { href: '/resources/api', label: 'API Reference', icon: <Code className="w-4 h-4" /> },
        { href: '/resources/examples', label: 'Code Examples', icon: <Github className="w-4 h-4" /> }
      ]
    },
    { href: '/contact', label: 'Contact', icon: <MessageSquare className="w-4 h-4" /> }
  ];

  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsResourcesOpen(false); // Close resources dropdown when toggling main menu
  };

  const toggleResourcesDropdown = () => {
    setIsResourcesOpen(!isResourcesOpen);
  };

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10' 
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo - Mobile optimized */}
            <Link 
              href="/" 
              className="flex items-center gap-2 sm:gap-3 group"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 blur transition-all" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Aftermath
                </span>
                <div className="text-xs text-gray-400 -mt-1">Technologies</div>
              </div>
              {/* Mobile logo text */}
              <div className="block sm:hidden">
                <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Aftermath
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <div key={link.href} className="relative">
                  {link.hasDropdown ? (
                    <div className="relative">
                      <button
                        onClick={toggleResourcesDropdown}
                        className={`flex items-center gap-1 px-3 xl:px-4 py-2 rounded-lg font-medium transition-all min-h-[44px] ${
                          isActivePath(link.href)
                            ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                            : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5'
                        }`}
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Desktop Dropdown Menu */}
                      {isResourcesOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/10 py-2 z-50">
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsResourcesOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                            >
                              {item.icon}
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg font-medium transition-all min-h-[44px] ${
                        isActivePath(link.href)
                          ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                          : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5'
                      }`}
                    >
                      <span className="hidden xl:inline">{link.icon}</span>
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <a
                href="https://github.com/aftermathtech"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-cyan-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              
              <Link
                href="/contact"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-lg font-medium transition-all hover:scale-105 min-h-[44px] flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span className="hidden xl:inline">Get Started</span>
                <span className="xl:hidden">Start</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-30"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className="lg:hidden fixed top-0 right-0 h-full w-full max-w-sm bg-gray-900/95 backdrop-blur-xl border-l border-cyan-500/30 shadow-2xl z-40 overflow-y-auto"
          >
            {/* Mobile menu header */}
            <div className="flex items-center justify-between p-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Aftermath
                </span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-300 hover:text-cyan-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile navigation links */}
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={toggleResourcesDropdown}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all min-h-[50px] ${
                          isActivePath(link.href)
                            ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                            : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {link.icon}
                          {link.label}
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Mobile dropdown items */}
                      {isResourcesOpen && (
                        <div className="mt-2 ml-4 space-y-1">
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all min-h-[44px]"
                            >
                              {item.icon}
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all min-h-[50px] ${
                        isActivePath(link.href)
                          ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                          : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5'
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Section */}
              <div className="pt-6 mt-6 border-t border-cyan-500/20 space-y-3">
                <a
                  href="https://github.com/aftermathtech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all min-h-[50px]"
                >
                  <Github className="w-5 h-5" />
                  GitHub Repository
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>
                
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-4 py-3 rounded-lg font-medium transition-all min-h-[50px] shadow-lg shadow-cyan-500/20"
                >
                  <Zap className="w-4 h-4" />
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;