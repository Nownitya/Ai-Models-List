---
name: finishing-a-development-branch
description: "Complete, validate, and integrate feature branches cleanly."
priority: P1
category: 01-core-engineering
---

# Finishing A Development Branch

Complete, validate, and integrate feature branches cleanly.

## When to Use
- Preparing a branch for pull request or merge into `develop`/`main`.

## Core Protocol / Capabilities
1. Rebase on upstream target branch.
2. Run full test suite and linters.
3. Ensure commit messages conform to Conventional Commits.

## Anti-Patterns & Warnings
- Merging broken branches.
- Leaving merge conflicts unresolved.
