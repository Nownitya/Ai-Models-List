<#
.SYNOPSIS
    Automates Git initialization, repository creation, and GitHub push via gh CLI on Windows.
.PARAMETER Visibility
    Public or Private (Default: public).
#>
param (
    [string]$Visibility = "public"
)

$ErrorActionPreference = "Stop"
$RepoName = "Ai-Models-List"

Write-Host "=== GitHub Publishing Script for $RepoName ===" -ForegroundColor Cyan

# Locate gh CLI
$ghPath = "C:\Program Files\GitHub CLI\gh.exe"
if (-not (Test-Path $ghPath)) {
    $cmd = Get-Command gh -ErrorAction SilentlyContinue
    if ($cmd) {
        $ghPath = $cmd.Source
    } else {
        Write-Error "GitHub CLI (gh.exe) could not be located."
        exit 1
    }
}

# Resolve Token
$authCheck = & $ghPath auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Resolving GitHub token from Git credential store..." -ForegroundColor Yellow
    $prompt = "protocol=https`nhost=github.com`n`n"
    $cred = $prompt | git credential fill 2>$null
    $token = ($cred | Select-String "^password=").Line.Replace("password=", "").Trim()
    if ($token) {
        $env:GH_TOKEN = $token
        Write-Host "Token resolved successfully." -ForegroundColor Green
    } else {
        Write-Error "Could not resolve GitHub token. Please run 'gh auth login'."
        exit 1
    }
}

$currentUser = (& $ghPath api user --jq .login 2>$null).Trim()
Write-Host "Authenticated as GitHub user: $currentUser" -ForegroundColor Green

# Initialize Git
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init -b main
} else {
    git branch -M main
}

# Commit
git add .
$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "feat: initial commit of AI Coding Skills and Tools Matrix (dual-format md/csv)"
} else {
    Write-Host "No unstaged changes." -ForegroundColor Gray
}

# Check or Create Remote
$repoExists = $false
try {
    & $ghPath repo view "$currentUser/$RepoName" --json name 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) { $repoExists = $true }
} catch {
    $repoExists = $false
}

if ($repoExists) {
    Write-Host "Remote repository $currentUser/$RepoName exists." -ForegroundColor Green
    $remotes = git remote
    if ($remotes -notcontains "origin") {
        git remote add origin "https://github.com/$currentUser/$RepoName.git"
    }
} else {
    Write-Host "Creating remote repository $currentUser/$RepoName (--$Visibility)..." -ForegroundColor Yellow
    & $ghPath repo create "$RepoName" "--$Visibility" --source=. --remote=origin --description "Master catalog and prompt optimization toolkit for AI coding skills, models, and tools"
}

# Push
Write-Host "Pushing main branch to origin..." -ForegroundColor Cyan
git push -u origin main

Write-Host "=== Successfully published to https://github.com/$currentUser/$RepoName ===" -ForegroundColor Green
