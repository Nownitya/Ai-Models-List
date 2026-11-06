---
name: setup-pre-commit
title: "setup-pre-commit"
description: "Catch formatting and quality issues before commits."
priority: P1
category: 11-code-review
---

# Setup Pre Commit

> **Priority**: `P1` | **Category**: `11-code-review`

Catch formatting and quality issues before commits.

## When to Use
- Activate when executing workflows requiring **setup-pre-commit**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
