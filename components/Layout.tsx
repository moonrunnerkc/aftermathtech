/**
 * Layout Component - Mobile-First Responsive Layout Wrapper
 * 
 * Key Mobile Optimizations:
 * - Proper header spacing and padding
 * - Mobile-safe viewport handling
 * - Touch-friendly navigation
 * - Responsive footer design
 * - Better scroll behavior
 * 
 * File: components/Layout.tsx
 */

'use client';

import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header with proper z-index and spacing */}
      <Header />
      
      {/* Main content area with header offset */}
      <main 
        className={`flex-1 relative ${className}`}
        style={{ 
          paddingTop: '4rem', // Account for fixed header
          minHeight: 'calc(100vh - 4rem)' // Ensure full height minus header
        }}
      >
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;