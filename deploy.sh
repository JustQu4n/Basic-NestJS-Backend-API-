#!/bin/bash

# Deploy script for Render
echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests
echo "🧪 Running tests..."
npm test

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📝 Don't forget to:"
    echo "   1. Commit and push your changes to GitHub"
    echo "   2. Check Render dashboard for deployment status"
    echo "   3. Test your deployed API endpoints"
else
    echo "❌ Build failed! Please fix the errors before deploying."
    exit 1
fi

echo "🎉 Deployment preparation complete!"
