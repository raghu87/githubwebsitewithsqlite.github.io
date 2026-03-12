#!/bin/bash

# GitHub Pages Setup Script
# This script helps you quickly set up your blog for GitHub Pages

echo "🚀 GitHub Pages Blog Setup"
echo "=========================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

echo "📝 Please answer the following questions:"
echo ""

# Get repository name
read -p "Enter your GitHub username: " username
read -p "Enter repository name (or press enter for ${username}.github.io): " repo_name

if [ -z "$repo_name" ]; then
    repo_name="${username}.github.io"
    site_url="https://${username}.github.io"
else
    site_url="https://${username}.github.io/${repo_name}"
fi

echo ""
echo "📦 Repository will be: https://github.com/${username}/${repo_name}"
echo "🌐 Site will be live at: ${site_url}"
echo ""

read -p "Is this correct? (y/n): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "Setup cancelled."
    exit 0
fi

echo ""
echo "🔧 Setting up repository..."

# Initialize git if not already initialized
if [ ! -d .git ]; then
    git init
    echo "✅ Git initialized"
fi

# Add all files
git add .
echo "✅ Files staged"

# Initial commit
git commit -m "Initial commit: SQLite blog setup"
echo "✅ Initial commit created"

# Add remote
git remote add origin "https://github.com/${username}/${repo_name}.git" 2>/dev/null || \
git remote set-url origin "https://github.com/${username}/${repo_name}.git"
echo "✅ Remote added"

# Rename branch to main if needed
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    git branch -M main
    echo "✅ Branch renamed to main"
fi

echo ""
echo "📤 Ready to push!"
echo ""
echo "Next steps:"
echo "1. Create the repository on GitHub: https://github.com/new"
echo "   - Name: ${repo_name}"
echo "   - Make it Public"
echo "   - Do NOT initialize with README"
echo ""
echo "2. Then run this command to push:"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to repository Settings"
echo "   - Click Pages (left sidebar)"
echo "   - Set Source to 'GitHub Actions'"
echo ""
echo "4. Wait 2-3 minutes, then visit:"
echo "   ${site_url}"
echo ""
echo "🎉 Setup complete! Follow the steps above to deploy."
