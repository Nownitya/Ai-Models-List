#!/usr/bin/env bash
# github-push.sh — Automates Git initialization, repository creation, and GitHub push via gh CLI.

set -e

REPO_NAME="Ai-Models-List"
VISIBILITY="${1:---public}" # Default to public; pass --private for private repo

echo "=== GitHub Publishing Script for $REPO_NAME ==="

# Check for gh executable
if ! command -v gh &> /dev/null; then
    if [ -f "/c/Program Files/GitHub CLI/gh.exe" ]; then
        export PATH="$PATH:/c/Program Files/GitHub CLI"
    elif [ -f "C:/Program Files/GitHub CLI/gh.exe" ]; then
        export PATH="$PATH:C:/Program Files/GitHub CLI"
    else
        echo "Error: GitHub CLI (gh) not found in PATH."
        exit 1
    fi
fi

# Ensure Git credential / GH token is populated
if ! gh auth status &> /dev/null; then
    echo "Resolving GitHub token from Git credential store..."
    TOKEN=$(printf "protocol=https\nhost=github.com\n\n" | git credential fill 2>/dev/null | grep "^password=" | cut -d= -f2)
    if [ -n "$TOKEN" ]; then
        export GH_TOKEN="$TOKEN"
        echo "Authenticated using Git credentials."
    else
        echo "Please login using: gh auth login"
        exit 1
    fi
fi

CURRENT_USER=$(gh api user --jq .login 2>/dev/null || echo "")
echo "Authenticated as GitHub user: $CURRENT_USER"

# Initialize Git if needed
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init -b main
else
    git branch -M main
fi

# Stage and commit files
echo "Staging files..."
git add .
if git diff --staged --quiet; then
    echo "No uncommitted changes."
else
    echo "Committing files..."
    git commit -m "feat: initial commit of AI Coding Skills and Tools Matrix (dual-format md/csv)"
fi

# Check if remote repository exists
echo "Checking remote repository on GitHub ($CURRENT_USER/$REPO_NAME)..."
if gh repo view "$CURRENT_USER/$REPO_NAME" &> /dev/null; then
    echo "Remote repository $CURRENT_USER/$REPO_NAME exists."
    if ! git remote | grep -q "^origin$"; then
        git remote add origin "https://github.com/$CURRENT_USER/$REPO_NAME.git"
    fi
else
    echo "Creating remote repository $CURRENT_USER/$REPO_NAME ($VISIBILITY)..."
    gh repo create "$REPO_NAME" $VISIBILITY --source=. --remote=origin --description "Master catalog and prompt optimization toolkit for AI coding skills, models, and tools"
fi

# Push to GitHub
echo "Pushing main branch to origin..."
git push -u origin main

echo "=== Successfully published to https://github.com/$CURRENT_USER/$REPO_NAME ==="

