---
name: using-git-worktrees
description: "Safely isolate parallel development tasks and subagent workspaces using git worktrees."
priority: P1
category: 01-core-engineering
---

# Using Git Worktrees

Safely isolate parallel development tasks and subagent workspaces using git worktrees.

## When to Use
- Working on multiple features concurrently or running parallel subagents.

## Core Protocol / Capabilities
1. Create a clean worktree: `git worktree add ../feature-branch feature-branch`.
2. Execute changes in isolation.
3. Remove worktree when merged: `git worktree remove ../feature-branch`.

## Anti-Patterns & Warnings
- Switching branches in a dirty workspace.
- Leaving orphaned worktrees.
