---
name: open-code-review
title: "Open Code Review"
description: "Explore additional automated code-review workflows; verify exact product/repository before adoption."
priority: P2
category: 11-code-review
---

# Open Code Review

> **Priority**: `P2` | **Category**: `11-code-review`

Explore additional automated code-review workflows; verify exact product/repository before adoption.

## When to Use
- Activate when executing workflows requiring **Open Code Review**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
