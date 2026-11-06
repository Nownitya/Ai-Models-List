<#
.SYNOPSIS
    Automates Git initialization, repository creation, and GitHub push via gh CLI on Windows.
.PARAMETER Visibility
    Public or Private (Default: public).
#>
param (
    [string]$Visibility = "public"
)

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

# Resolve Token from Git Credential Store
if (-not $env:GH_TOKEN) {
    Write-Host "Resolving GitHub token from Git credential store..." -ForegroundColor Yellow
    $prompt = "protocol=https`nhost=github.com`n`n"
    $cred = $prompt | git credential fill 2>$null
    $token = ($cred | Select-String "^password=").Line.Replace("password=", "").Trim()
    if ($token) {
        $env:GH_TOKEN = $token
        Write-Host "Token resolved successfully." -ForegroundColor Green
    } else {
        Write-Host "Could not resolve GitHub token. Please login via: gh auth login" -ForegroundColor Red
        exit 1
    }
}

$currentUser = (& $ghPath api user --jq .login 2>$null).Trim()
if (-not $currentUser) {
    Write-Host "Authentication failed with provided credentials." -ForegroundColor Red
    exit 1
}
Write-Host "Authenticated as GitHub user: $currentUser" -ForegroundColor Green

# Ensure on main branch
git branch -M main

# Commit unstaged changes if any
git add .
$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "feat: initial commit of AI Coding Skills and Tools Matrix (dual-format md/csv)"
} else {
    Write-Host "Working tree clean." -ForegroundColor Gray
}

# Check or Create Remote
$repoExists = $false
try {
    $check = & $ghPath repo view "$currentUser/$RepoName" --json name 2>$null
    if ($LASTEXITCODE -eq 0 -and $check) { $repoExists = $true }
} catch {
    $repoExists = $false
}

if ($repoExists) {
    Write-Host "Remote repository $currentUser/$RepoName already exists." -ForegroundColor Green
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
