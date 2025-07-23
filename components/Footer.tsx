'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { href: '/about', label: 'About', external: false },
      { href: '/contact', label: 'Contact', external: false },
    ],
    products: [
      { href: '/projects', label: 'AI Systems', external: false },
      { href: 'https://github.com/moonrunnerkc', label: 'GitHub', external: true },
    ],
    edgeTech: [
      { href: '/blackbox-mind', label: 'Blackbox Mind', external: false },
      { href: '/sentient-os', label: 'Sentient OS', external: false },
      { href: '/belief-ecology', label: 'Belief Ecology', external: false },
      { href: '/local-agents', label: 'Offline Chatbots', external: false },
    ],
  };

  const socialLinks = [
    { href: 'https://github.com/moonrunnerkc', icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com/company/106763636/', icon: Linkedin, label: 'Company LinkedIn' },
    { href: 'mailto:bradkinnard@proton.me', icon: Mail, label: 'Email' },
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="relative">
                <Brain className="w-8 h-8 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
                <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                AFTERMATH
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              Architecting offline-first, autonomous AI systems that don't phone home. You own it. You run it. You win.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:bg-gray-800 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm cursor-pointer"
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm cursor-pointer"
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Edge Tech Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Edge Tech</h3>
            <ul className="space-y-2">
              {footerLinks.edgeTech.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm cursor-pointer"
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Aftermath Technologies Ltd. Built by humans. Powered by offline AI.
          </div>
          <div className="flex space-x-6">
            <a
              href="/cookies"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}