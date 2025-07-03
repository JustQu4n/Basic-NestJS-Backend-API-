# Deploy script for Render (Windows PowerShell)
Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm ci

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    exit 1
}

# Run tests
Write-Host "🧪 Running tests..." -ForegroundColor Blue
npm test

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Tests failed! Consider fixing them before deploying." -ForegroundColor Yellow
}

# Build the application
Write-Host "🔨 Building application..." -ForegroundColor Blue
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host "📝 Don't forget to:" -ForegroundColor Yellow
    Write-Host "   1. Commit and push your changes to GitHub" -ForegroundColor Yellow
    Write-Host "   2. Check Render dashboard for deployment status" -ForegroundColor Yellow
    Write-Host "   3. Test your deployed API endpoints" -ForegroundColor Yellow
} else {
    Write-Host "❌ Build failed! Please fix the errors before deploying." -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Deployment preparation complete!" -ForegroundColor Green
