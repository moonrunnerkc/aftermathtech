#!/bin/bash

echo "🔧 Fixing AgentAvatar.tsx..."
sed -i 's/const baseClass = styles\.avatar;/\/\/ CSS modules removed/' components/AgentAvatar.tsx
sed -i 's/const activeClass = isActive ? styles\.active : "";/\/\/ CSS modules removed/' components/AgentAvatar.tsx
sed -i 's/const runningClass = isRunning ? styles\.running : "";/\/\/ CSS modules removed/' components/AgentAvatar.tsx
sed -i 's/className={styles\.emoji}/className="text-2xl"/' components/AgentAvatar.tsx
sed -i 's/className={styles\.pulseRing}/className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping"/' components/AgentAvatar.tsx
sed -i 's/className={styles\.processingIndicator}/className="absolute -top-1 -right-1 w-3 h-3"/' components/AgentAvatar.tsx
sed -i 's/className={styles\.processingDots}/className="flex space-x-1"/' components/AgentAvatar.tsx
sed -i 's/className={styles\.label}/className="text-center"/' components/AgentAvatar.tsx
sed -i 's/className={styles\.roleName}/className="text-xs text-green-400 font-mono"/' components/AgentAvatar.tsx
sed -i 's/className={styles\.agentId}/className="text-xs text-gray-500 font-mono"/' components/AgentAvatar.tsx
sed -i 's/className={styles\.connectionLines}/className="absolute top-0 left-full w-8 h-full"/' components/AgentAvatar.tsx
sed -i 's/className={styles\.connectionSvg}/className="w-full h-full"/' components/AgentAvatar.tsx
sed -i 's/className={styles\.connectionLine}/className="stroke-green-400 stroke-2"/' components/AgentAvatar.tsx

echo "🔧 Fixing SwarmPreviewModal.tsx..."
sed -i 's/className={styles\.backdrop}/className="fixed inset-0 bg-black\/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.card}/className="bg-gray-900 border border-green-400\/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden neon-glow"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.header}/className="flex items-center justify-between p-6 border-b border-green-400\/20"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.titleSection}/className="flex items-center gap-4"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.title}/className="text-xl font-mono text-green-400"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.subtitle}/className="flex items-center gap-2 text-sm text-gray-400"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.roundIndicator}/className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.goalText}/className="font-mono"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.controls}/className="flex gap-3"/' components/SwarmPreviewModal.tsx
sed -i 's/className={`\${styles\.killNetButton} \${!isRunning ? styles\.active : ""}`}/className="bg-red-400\/10 hover:bg-red-400\/20 border border-red-400 text-red-400 px-4 py-2 rounded font-mono transition-all duration-200"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.closeButton}/className="text-gray-400 hover:text-red-400 transition-colors text-2xl font-mono"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.agentsRow}/className="flex justify-center gap-6 p-6 border-b border-green-400\/10"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.statusBar}/className="flex items-center justify-between p-4 bg-gray-800\/50"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.statusIndicator}/className="flex items-center gap-2"/' components/SwarmPreviewModal.tsx
sed -i 's/className={`\${styles\.statusDot} \${isRunning ? styles\.running : styles\.idle}`}/className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.statusText}/className="text-green-400 font-mono text-sm"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.logStats}/className="text-gray-400 font-mono text-sm"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.contentArea}/className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]"/' components/SwarmPreviewModal.tsx
sed -i 's/className={styles\.logSection}/className="space-y-4"/' components/SwarmPreviewModal.tsx

echo "✅ Components fixed!"
