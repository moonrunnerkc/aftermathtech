#!/bin/bash
# Production deployment script
echo "🚀 Deploying to production..."
cd ~/aftermathtech-site
git pull origin main
npm ci
npm run build
pm2 restart aftermathtech-site
echo "✅ Deployment complete!"
