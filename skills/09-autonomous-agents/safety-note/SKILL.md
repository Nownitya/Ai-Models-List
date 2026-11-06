---
name: safety-note
title: "Safety note"
description: "Use isolated branches/worktrees, iteration limits, build/test gates and human approval before merges or deployments."
priority: P0
category: 09-autonomous-agents
---

# Safety Note

> **Priority**: `P0` | **Category**: `09-autonomous-agents`

Use isolated branches/worktrees, iteration limits, build/test gates and human approval before merges or deployments.

## When to Use
- Activate when executing workflows requiring **Safety note**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
