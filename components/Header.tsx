'use client';

import React, { useState, useEffect } from 'react';
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
  ChevronDown
} from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsResourcesOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { 
      href: '/resources', 
      label: 'Resources',
      hasDropdown: true,
      dropdownItems: [
        { href: '/resources', label: 'All Resources' },
        { href: '/resources/docs', label: 'Documentation' },
        { href: '/resources/tutorials', label: 'Tutorials' },
        { href: '/resources/api', label: 'API Reference' },
        { href: '/resources/examples', label: 'Code Examples' }
      ]
    },
    { href: '/contact', label: 'Contact' }
  ];

  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleResourcesDropdown = () => {
    setIsResourcesOpen(!isResourcesOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 blur transition-all" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Aftermath
              </span>
              <div className="text-xs text-gray-400 -mt-1">Technologies</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.hasDropdown ? (
                  <div className="relative">
                    <button
                      onClick={toggleResourcesDropdown}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        isActivePath(link.href)
                          ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                          : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isResourcesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/10 py-2">
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      isActivePath(link.href)
                        ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://github.com/aftermathtech"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            
            <Link
              href="/contact"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-all hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-4 space-y-3">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={toggleResourcesDropdown}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${
                          isActivePath(link.href)
                            ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                            : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5'
                        }`}
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isResourcesOpen && (
                        <div className="mt-2 ml-4 space-y-2">
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block px-4 py-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                        isActivePath(link.href)
                          ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                          : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 border-t border-cyan-500/20 space-y-3">
                <a
                  href="https://github.com/aftermathtech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>
                
                <Link
                  href="/contact"
                  className="block bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-4 py-3 rounded-lg font-medium transition-all text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;