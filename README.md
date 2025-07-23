# AftermathTech.com - Official Website

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r158-000000?style=flat-square&logo=three.js)](https://threejs.org/)
[![WebAssembly](https://img.shields.io/badge/WebAssembly-654FF0?style=flat-square&logo=webassembly)](https://webassembly.org/)

> The official website for Aftermath Technologies - showcasing cutting-edge offline-first AI systems, autonomous technologies, and edge computing solutions.

## 🚀 Live Demo

Visit the live website: [https://aftermathtech.com](https://aftermathtech.com)

## ✨ Features

### 🤖 **Local AI Chat Interface**
- **WebAssembly-powered LLM** running entirely in your browser
- **Zero server dependencies** - complete privacy and offline capability
- **Real-time inference** with optimized WASM runtime
- **Context-aware conversations** with memory management

### 🎮 **3D Interactive Visualizations**
- **Procedural neural network visualization** using Three.js and shaders
- **Interactive 3D timeline** showcasing company milestones
- **Real-time particle systems** and dynamic lighting effects
- **Responsive WebGL rendering** optimized for all devices

### 📊 **Live GitHub Integration**
- **Real-time project feed** from GitHub API
- **Repository statistics** and activity tracking
- **Automated content updates** with intelligent caching
- **Performance metrics** and contribution analytics

### 🌐 **Progressive Web App (PWA)**
- **Offline-first architecture** with service worker implementation
- **App-like experience** with install prompts and native feel
- **Background sync** for seamless online/offline transitions
- **Push notifications** for important updates

### 🎨 **Modern Design System**
- **Neon-accented dark theme** with cyber aesthetics
- **Smooth animations** powered by Framer Motion
- **Responsive design** optimized for all screen sizes
- **Accessibility-first** approach with WCAG compliance

## 🛠️ Technology Stack

### **Frontend Framework**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript development
- **React 18** - Latest React features including Suspense

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing and optimization
- **Framer Motion** - Production-ready motion library
- **Lucide Icons** - Beautiful & consistent icon set

### **3D Graphics & Visualization**
- **Three.js** - 3D graphics library for WebGL
- **WebGL Shaders** - Custom GLSL shaders for effects
- **Canvas API** - 2D graphics and animations

### **AI & Machine Learning**
- **TensorFlow.js** - Machine learning in JavaScript
- **WebAssembly (WASM)** - High-performance computing
- **ONNX.js** - Open Neural Network Exchange runtime

### **Data & APIs**
- **GitHub API** - Repository data and statistics
- **REST APIs** - Custom backend integration
- **Real-time sync** - WebSocket connections

### **Performance & SEO**
- **Next.js Image Optimization** - Automatic image optimization
- **Static Site Generation (SSG)** - Pre-rendered pages
- **Server-Side Rendering (SSR)** - Dynamic content rendering
- **Comprehensive meta tags** - SEO optimization

## 📁 Project Structure

```
aftermathtech-site/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx          # Home page
│   ├── about/            # About page
│   ├── blog/             # Blog section
│   ├── projects/         # Projects showcase
│   ├── resources/        # Resources & documentation
│   └── contact/          # Contact & demo requests
├── components/           # Reusable React components
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Site footer
│   ├── Layout.tsx       # Main layout wrapper
│   ├── AgentVisualizer.tsx    # 3D neural network background
│   ├── Timeline3D.tsx         # Interactive 3D timeline
│   ├── ProjectFeed.tsx        # GitHub projects feed
│   ├── LLMChat.tsx           # Local AI chat interface
│   └── AIContactBot.tsx      # AI-powered contact assistant
├── lib/                  # Shared libraries
│   ├── metadata.ts      # SEO metadata configuration
│   └── api.ts           # API client and utilities
├── utils/               # Utility functions
│   ├── llm.ts          # Local LLM integration
│   ├── wasmLoader.ts   # WebAssembly module loader
│   └── githubFeed.ts   # GitHub API integration
├── styles/             # Global styles
│   └── globals.css     # Tailwind and custom CSS
├── public/             # Static assets
├── scripts/           # Build and deployment scripts
├── wasm/             # WebAssembly modules
├── llm_models/       # Local AI model files
├── next.config.js    # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── postcss.config.js  # PostCSS configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm, yarn, or pnpm** - Package manager
- **Git** - Version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aftermath-tech/aftermathtech-site.git
   cd aftermathtech-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   GITHUB_TOKEN=your_github_token_here
   NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to see the result.

### Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Type checking
npm run type-check

# Format code
npm run format
```

## 🤖 AI Features Setup

### Local LLM Configuration

The website includes a fully functional local AI chat interface that runs entirely in the browser using WebAssembly.

1. **Model Setup**
   ```bash
   # Download pre-trained models (automated during build)
   npm run download-models
   ```

2. **WebAssembly Compilation**
   ```bash
   # Compile WASM modules for optimal performance
   npm run build-wasm
   ```

3. **Testing Local AI**
   ```bash
   # Test AI functionality
   npm run test-ai
   ```

### Supported Model Formats
- **ONNX** - Cross-platform neural network format
- **TensorFlow.js** - JavaScript-optimized models
- **Custom WASM** - Hand-optimized WebAssembly modules

## 🎨 Customization

### Theming
Modify the theme in `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#00b8d4', // Cyan
        },
        secondary: {
          500: '#9d4edd', // Purple
        },
        accent: {
          500: '#f72585', // Pink
        },
      },
    },
  },
};
```

### 3D Visualizations
Customize 3D effects in `components/AgentVisualizer.tsx`:
```typescript
// Modify particle count, colors, and animations
const nodeCount = 50;        // Number of neural nodes
const particleCount = 200;   // Background particles
const maxDistance = 150;     // Connection distance
```

### AI Model Configuration
Configure local AI in `utils/llm.ts`:
```typescript
const LLM_CONFIG = {
  modelName: 'AftermathAI-Chat-7B',
  maxTokens: 512,
  temperature: 0.7,
  // Add custom model configurations
};
```

## 📦 Deployment

### Vercel (Recommended)
1. **Connect your repository** to Vercel
2. **Configure environment variables** in the Vercel dashboard
3. **Deploy** - Automatic deployments on every push

### Manual Deployment
```bash
# Build for production
npm run build

# Export static files (optional)
npm run export

# Deploy to your preferred hosting platform
```

### Docker Deployment
```bash
# Build Docker image
docker build -t aftermathtech-site .

# Run container
docker run -p 3000:3000 aftermathtech-site
```

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# AI functionality tests
npm run test:ai

# Performance tests
npm run test:performance
```

### Testing Local AI
```bash
# Test WebAssembly modules
npm run test:wasm

# Test model inference
npm run test:inference

# Test browser compatibility
npm run test:browsers
```

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **Conventional Commits** - Commit message format

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Hosting and deployment platform
- **Three.js Community** - 3D graphics library
- **TensorFlow.js Team** - Machine learning in JavaScript
- **WebAssembly Community** - High-performance web computing

## 📞 Support

- **Documentation**: [https://docs.aftermathtech.com](https://docs.aftermathtech.com)
- **Issues**: [GitHub Issues](https://github.com/aftermath-tech/aftermathtech-site/issues)
- **Discussions**: [GitHub Discussions](https://github.com/aftermath-tech/aftermathtech-site/discussions)
- **Email**: [hello@aftermathtech.com](mailto:hello@aftermathtech.com)

## 🔗 Links

- **Website**: [https://aftermathtech.com](https://aftermathtech.com)
- **GitHub**: [https://github.com/aftermath-tech](https://github.com/aftermath-tech)
- **Twitter**: [@aftermath_tech](https://twitter.com/aftermath_tech)
- **LinkedIn**: [Aftermath Technologies](https://linkedin.com/company/aftermath-tech)

---

**Built with ❤️ by the Aftermath Technologies team**

*Empowering the future of AI through offline-first, autonomous systems.*