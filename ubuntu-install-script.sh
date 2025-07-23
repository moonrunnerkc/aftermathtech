#!/bin/bash

echo "🔧 Fixing AftermathTech.com Dependencies..."

# Install missing CSS dependencies
echo "📦 Installing missing CSS dependencies..."
npm install cssnano postcss autoprefixer

# Fix React Spring version conflicts
echo "🔄 Fixing React Spring version conflicts..."
npm uninstall react-spring
npm install @react-spring/web@latest

# Install compatible Three.js packages
echo "🎨 Installing Three.js dependencies..."
npm install three @types/three

# Install missing UI dependencies
echo "🎯 Installing missing dependencies..."
npm install lucide-react framer-motion

# Clean install to resolve peer dependency issues
echo "🧹 Cleaning and reinstalling dependencies..."
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

echo "✅ Dependencies fixed!"
echo ""
echo "Next steps:"
echo "1. Update page components to remove 'use client' + metadata conflicts"
echo "2. Create missing component files"
echo "3. Test the build again"